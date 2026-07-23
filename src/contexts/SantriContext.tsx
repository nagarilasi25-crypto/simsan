import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Santri, StatusSantri, JenjangPendidikan, InstitutionSettings, AuditLog } from '../types';
import { getLocalSantri, createSantri, updateSantri, deleteSantri, generateAutoNIS } from '../services/santriService';
import { INITIAL_SETTINGS, INITIAL_AUDIT_LOGS } from '../utils/mockData';

interface SantriFilterState {
  search: string;
  status: string;
  jenjang: string;
  halaqah: string;
  kecamatan: string;
  nagari: string;
  sortBy: 'nama' | 'nis' | 'createdAt' | 'status';
  sortOrder: 'asc' | 'desc';
}

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface SantriContextType {
  santriList: Santri[];
  filteredSantri: Santri[];
  isLoading: boolean;
  filters: SantriFilterState;
  setFilters: React.Dispatch<React.SetStateAction<SantriFilterState>>;
  resetFilters: () => void;
  
  settings: InstitutionSettings;
  updateSettings: (newSettings: Partial<InstitutionSettings>) => void;
  
  auditLogs: AuditLog[];
  addAuditLog: (action: string, target: string, details?: string) => void;
  
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  
  handleAddSantri: (data: Omit<Santri, 'id' | 'createdAt' | 'updatedAt' | 'qrCodeData'>) => Promise<Santri>;
  handleEditSantri: (id: string, data: Partial<Santri>) => Promise<Santri>;
  handleDeleteSantri: (id: string) => Promise<boolean>;
  getGeneratedNIS: () => string;
  
  selectedSantriForDetail: Santri | null;
  setSelectedSantriForDetail: (s: Santri | null) => void;
  
  selectedSantriForCard: Santri | null;
  setSelectedSantriForCard: (s: Santri | null) => void;
  
  selectedSantriForQR: Santri | null;
  setSelectedSantriForQR: (s: Santri | null) => void;
}

const SETTINGS_STORAGE_KEY = 'simsan_settings';
const AUDIT_STORAGE_KEY = 'simsan_audit_logs';

const SantriContext = createContext<SantriContextType | undefined>(undefined);

export const SantriProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [santriList, setSantriList] = useState<Santri[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const [selectedSantriForDetail, setSelectedSantriForDetail] = useState<Santri | null>(null);
  const [selectedSantriForCard, setSelectedSantriForCard] = useState<Santri | null>(null);
  const [selectedSantriForQR, setSelectedSantriForQR] = useState<Santri | null>(null);

  const [settings, setSettings] = useState<InstitutionSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem(AUDIT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [filters, setFilters] = useState<SantriFilterState>({
    search: '',
    status: '',
    jenjang: '',
    halaqah: '',
    kecamatan: '',
    nagari: '',
    sortBy: 'nama',
    sortOrder: 'asc'
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const loadData = () => {
    setIsLoading(true);
    try {
      const data = getLocalSantri();
      setSantriList(data);
    } catch (e) {
      console.error('Error loading santri:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetFilters = () => {
    setFilters({
      search: '',
      status: '',
      jenjang: '',
      halaqah: '',
      kecamatan: '',
      nagari: '',
      sortBy: 'nama',
      sortOrder: 'asc'
    });
  };

  const updateSettings = (newSettings: Partial<InstitutionSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
    showToast('Pengaturan lembaga berhasil diperbarui', 'success');
  };

  const addAuditLog = (action: string, target: string, details?: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      userId: 'u-user',
      userName: 'Administrator SIMSAN',
      role: 'super_admin',
      action,
      target,
      timestamp: new Date().toISOString(),
      details
    };
    const updated = [newLog, ...auditLogs];
    setAuditLogs(updated);
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleAddSantri = async (data: Omit<Santri, 'id' | 'createdAt' | 'updatedAt' | 'qrCodeData'>): Promise<Santri> => {
    try {
      const newSantri = await createSantri(data, settings.prefixNis);
      setSantriList(prev => [newSantri, ...prev]);
      addAuditLog('Penerbitan NIS Santri Baru', `${newSantri.nis} - ${newSantri.nama}`, `Jenjang: ${newSantri.jenjang}`);
      showToast(`Santri ${newSantri.nama} dengan NIS ${newSantri.nis} berhasil ditambahkan`, 'success');
      return newSantri;
    } catch (err: any) {
      showToast(err.message || 'Gagal menambah santri', 'error');
      throw err;
    }
  };

  const handleEditSantri = async (id: string, data: Partial<Santri>): Promise<Santri> => {
    try {
      const updated = await updateSantri(id, data);
      setSantriList(prev => prev.map(s => s.id === id ? updated : s));
      addAuditLog('Pembaruan Data Santri', `${updated.nis} - ${updated.nama}`);
      showToast(`Data santri ${updated.nama} berhasil diperbarui`, 'success');
      return updated;
    } catch (err: any) {
      showToast(err.message || 'Gagal mengubah data santri', 'error');
      throw err;
    }
  };

  const handleDeleteSantri = async (id: string): Promise<boolean> => {
    try {
      const target = santriList.find(s => s.id === id);
      const res = await deleteSantri(id);
      if (res) {
        setSantriList(prev => prev.filter(s => s.id !== id));
        if (target) {
          addAuditLog('Penghapusan Santri', `${target.nis} - ${target.nama}`);
        }
        showToast('Data santri berhasil dihapus', 'info');
      }
      return res;
    } catch (err: any) {
      showToast('Gagal menghapus santri', 'error');
      return false;
    }
  };

  const getGeneratedNIS = () => {
    return generateAutoNIS(settings.prefixNis, new Date().getFullYear(), santriList);
  };

  const filteredSantri = useMemo(() => {
    return santriList.filter(s => {
      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchSearch = 
          s.nama.toLowerCase().includes(query) ||
          s.nis.toLowerCase().includes(query) ||
          s.nik.includes(query) ||
          (s.namaPanggilan && s.namaPanggilan.toLowerCase().includes(query)) ||
          s.halaqah.toLowerCase().includes(query) ||
          s.nagari.toLowerCase().includes(query);
        if (!matchSearch) return false;
      }

      // Status
      if (filters.status && s.status !== filters.status) return false;

      // Jenjang
      if (filters.jenjang && s.jenjang !== filters.jenjang) return false;

      // Halaqah
      if (filters.halaqah && s.halaqah !== filters.halaqah) return false;

      // Kecamatan
      if (filters.kecamatan && s.kecamatan !== filters.kecamatan) return false;

      // Nagari
      if (filters.nagari && s.nagari !== filters.nagari) return false;

      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (filters.sortBy === 'nama') {
        comparison = a.nama.localeCompare(b.nama);
      } else if (filters.sortBy === 'nis') {
        comparison = a.nis.localeCompare(b.nis);
      } else if (filters.sortBy === 'createdAt') {
        comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (filters.sortBy === 'status') {
        comparison = a.status.localeCompare(b.status);
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [santriList, filters]);

  return (
    <SantriContext.Provider
      value={{
        santriList,
        filteredSantri,
        isLoading,
        filters,
        setFilters,
        resetFilters,
        settings,
        updateSettings,
        auditLogs,
        addAuditLog,
        toast,
        showToast,
        handleAddSantri,
        handleEditSantri,
        handleDeleteSantri,
        getGeneratedNIS,
        selectedSantriForDetail,
        setSelectedSantriForDetail,
        selectedSantriForCard,
        setSelectedSantriForCard,
        selectedSantriForQR,
        setSelectedSantriForQR,
      }}
    >
      {children}
    </SantriContext.Provider>
  );
};

export const useSantri = () => {
  const context = useContext(SantriContext);
  if (!context) {
    throw new Error('useSantri must be used within a SantriProvider');
  }
  return context;
};
