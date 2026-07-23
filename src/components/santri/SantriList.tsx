import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  RotateCcw, 
  QrCode, 
  CreditCard, 
  Eye, 
  Edit3, 
  Trash2, 
  Download, 
  UserCheck, 
  Building2, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { useSantri } from '../../contexts/SantriContext';
import { useAuth } from '../../contexts/AuthContext';
import { Santri, StatusSantri } from '../../types';
import { WILAYAH_DATA } from '../../utils/mockData';

interface SantriListProps {
  onOpenAddModal: () => void;
  onEditSantri: (s: Santri) => void;
  onViewDetail: (s: Santri) => void;
  onViewCard: (s: Santri) => void;
  onViewQR: (s: Santri) => void;
}

export const SantriList: React.FC<SantriListProps> = ({
  onOpenAddModal,
  onEditSantri,
  onViewDetail,
  onViewCard,
  onViewQR
}) => {
  const { filteredSantri, santriList, filters, setFilters, resetFilters, handleDeleteSantri, isLoading } = useSantri();
  const { hasPermission } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(filteredSantri.length / itemsPerPage) || 1;
  const paginatedSantri = filteredSantri.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const statusColors: Record<StatusSantri, string> = {
    'Aktif': 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    'Non-Aktif': 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300',
    'Alumni': 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    'Cuti': 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    'Mutasi': 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
  };

  const handleExportCSV = () => {
    const headers = ['NIS', 'NIK', 'Nama', 'Jenis Kelamin', 'Jenjang', 'Kelas', 'Halaqah', 'Nagari', 'Kecamatan', 'Status'];
    const rows = filteredSantri.map(s => [
      s.nis,
      s.nik,
      `"${s.nama}"`,
      s.jenisKelamin,
      s.jenjang,
      s.kelas,
      s.halaqah,
      s.nagari,
      s.kecamatan,
      s.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SIMSAN_Data_Santri_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const availableNagari = filters.kecamatan 
    ? WILAYAH_DATA.nagari[filters.kecamatan as keyof typeof WILAYAH_DATA.nagari] || [] 
    : [];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-emerald-900 text-white rounded-xl shadow-sm border border-emerald-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight">Data Induk Santri (NISN Pesantren)</h2>
            <span className="px-2.5 py-0.5 rounded bg-emerald-800 text-emerald-200 text-xs font-bold border border-emerald-700">
              {santriList.length} Santri
            </span>
          </div>
          <p className="text-xs text-emerald-100 mt-1">
            Pengelolaan database terpusat, pencatatan biodata, dan penerbitan Nomor Induk Santri otomatis.
          </p>
        </div>

        {hasPermission(['super_admin', 'admin']) && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition-colors border border-emerald-700"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Excel</span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Santri Baru</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter Toolbar Card */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          
          {/* Search Box */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari Nama, NIS, NIK, Halaqah..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-800"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-medium text-slate-800"
            >
              <option value="">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Non-Aktif">Non-Aktif</option>
              <option value="Alumni">Alumni</option>
              <option value="Cuti">Cuti</option>
              <option value="Mutasi">Mutasi</option>
            </select>
          </div>

          {/* Jenjang Filter */}
          <div>
            <select
              value={filters.jenjang}
              onChange={(e) => setFilters(prev => ({ ...prev, jenjang: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-medium text-slate-800"
            >
              <option value="">Semua Jenjang</option>
              <option value="Pondok Pesantren">Pondok Pesantren</option>
              <option value="Rumah Tahfidz">Rumah Tahfidz</option>
              <option value="TPQ">TPQ</option>
              <option value="Madrasah Diniyah">Madrasah Diniyah</option>
            </select>
          </div>

          {/* Kecamatan Filter */}
          <div>
            <select
              value={filters.kecamatan}
              onChange={(e) => setFilters(prev => ({ ...prev, kecamatan: e.target.value, nagari: '' }))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-medium text-slate-800"
            >
              <option value="">Semua Kecamatan</option>
              {WILAYAH_DATA.kecamatan.map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          {/* Sort By Selector */}
          <div>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-medium text-slate-800"
            >
              <option value="nama">Urut Nama (A-Z)</option>
              <option value="nis">Urut NIS</option>
              <option value="createdAt">Urut Terbaru</option>
              <option value="status">Urut Status</option>
            </select>
          </div>

        </div>

        {(filters.search || filters.status || filters.jenjang || filters.kecamatan || filters.nagari) && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">
              Menampilkan <strong>{filteredSantri.length}</strong> hasil pencarian
            </span>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-emerald-600 hover:underline font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          </div>
        )}
      </div>

      {/* Santri Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-bold tracking-widest border-b border-slate-100">
              <tr>
                <th className="p-4">Santri & NIS</th>
                <th className="p-4">Jenjang / Kelas</th>
                <th className="p-4">Halaqah Al-Qur'an</th>
                <th className="p-4">Wilayah (Nagari)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi & Integrasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedSantri.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Tidak ada data santri yang sesuai dengan kriteria filter.
                  </td>
                </tr>
              ) : (
                paginatedSantri.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                          {s.nama.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{s.nama}</div>
                          <div className="font-mono text-xs text-emerald-700 font-medium">{s.nis}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-semibold text-slate-800">{s.jenjang}</div>
                      <div className="text-[11px] text-slate-500">{s.kelas || '-'}</div>
                    </td>

                    <td className="p-4">
                      <div className="font-medium text-emerald-800">{s.halaqah}</div>
                      <div className="text-[11px] text-slate-400">{s.guruPembimbing || '-'}</div>
                    </td>

                    <td className="p-4">
                      <div className="font-medium text-slate-700">{s.nagari}</div>
                      <div className="text-[11px] text-slate-400">{s.kecamatan}</div>
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[11px] font-bold uppercase">
                        {s.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewDetail(s)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 dark:text-slate-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-950/50 transition-colors"
                          title="Lihat Detail Biodata"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onViewCard(s)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-teal-600 hover:bg-teal-50 dark:text-slate-400 dark:hover:text-teal-400 dark:hover:bg-teal-950/50 transition-colors"
                          title="Kartu Santri PVC"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onViewQR(s)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-950/50 transition-colors"
                          title="QR Code Absensi"
                        >
                          <QrCode className="w-4 h-4" />
                        </button>

                        {hasPermission(['super_admin', 'admin']) && (
                          <>
                            <button
                              onClick={() => onEditSantri(s)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-amber-50 dark:text-slate-400 dark:hover:text-amber-400 dark:hover:bg-amber-950/50 transition-colors"
                              title="Edit Data"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Hapus data santri ${s.nama} (${s.nis})?`)) {
                                  handleDeleteSantri(s.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 dark:text-slate-400 dark:hover:text-rose-400 dark:hover:bg-rose-950/50 transition-colors"
                              title="Hapus Data"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-500">
            Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong>
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-white dark:hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-white dark:hover:bg-slate-800"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
