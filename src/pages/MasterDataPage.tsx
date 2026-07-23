import React, { useState } from 'react';
import { Building2, Users, BookOpen, School, MapPin, Calendar, Plus, Edit2, Trash2, CheckCircle2, X } from 'lucide-react';
import { WILAYAH_DATA } from '../utils/mockData';
import { useSantri } from '../contexts/SantriContext';

interface GuruItem {
  id: string;
  nip: string;
  nama: string;
  email: string;
  hp: string;
  jabatan: string;
}

interface HalaqahItem {
  id: string;
  nama: string;
  guru: string;
  santriCount: number;
  tingkat: string;
}

interface KelasItem {
  id: string;
  namaKelas: string;
  jenjang: string;
  waliKelas: string;
  jumlahSantri: number;
}

interface TahunItem {
  id: string;
  tahun: string;
  semester: string;
  status: 'Aktif' | 'Selesai' | 'Mendatang';
}

export const MasterDataPage: React.FC = () => {
  const { showToast } = useSantri();
  const [activeTab, setActiveTab] = useState<'guru' | 'halaqah' | 'kelas' | 'wilayah' | 'tahun'>('guru');

  // Master Data States
  const [guruList, setGuruList] = useState<GuruItem[]>([
    { id: 'g-1', nip: 'G-2024-001', nama: 'Ustadz Abdullah Al-Hafidz', email: 'abdullah@simsan.id', hp: '085211223344', jabatan: 'Musyrif Utama Tahfidz' },
    { id: 'g-2', nip: 'G-2024-002', nama: 'Ustadzah Siti Maryam', email: 'maryam@simsan.id', hp: '085277889900', jabatan: 'Guru Bahasa Arab' },
    { id: 'g-3', nip: 'G-2024-003', nama: 'Ustadz Hamzah Al-Bukhari', email: 'hamzah@simsan.id', hp: '081311223344', jabatan: 'Guru Fiqih & Hadits' },
  ]);

  const [halaqahList, setHalaqahList] = useState<HalaqahItem[]>([
    { id: 'h-1', nama: 'Halaqah Al-Jazari', guru: 'Ustadz Abdullah Al-Hafidz', santriCount: 15, tingkat: 'Ula' },
    { id: 'h-2', nama: 'Halaqah Khadijah', guru: 'Ustadzah Siti Maryam', santriCount: 12, tingkat: 'Wustha' },
    { id: 'h-3', nama: 'Halaqah Al-Shatibi', guru: 'Ustadz Hamzah Al-Bukhari', santriCount: 18, tingkat: 'Ulya' },
  ]);

  const [kelasList, setKelasList] = useState<KelasItem[]>([
    { id: 'k-1', namaKelas: 'Kelas X IPA 1', jenjang: 'Pondok Pesantren', waliKelas: 'Ustadz Abdullah Al-Hafidz', jumlahSantri: 28 },
    { id: 'k-2', namaKelas: 'Kelas Ula A', jenjang: 'Rumah Tahfidz', waliKelas: 'Ustadzah Siti Maryam', jumlahSantri: 20 },
    { id: 'k-3', namaKelas: 'Kelas Wustha 1', jenjang: 'Madrasah Diniyah', waliKelas: 'Ustadz Hamzah Al-Bukhari', jumlahSantri: 25 },
  ]);

  const [tahunList, setTahunList] = useState<TahunItem[]>([
    { id: 't-1', tahun: '2025/2026', semester: 'Ganjil', status: 'Aktif' },
    { id: 't-2', tahun: '2024/2025', semester: 'Genap', status: 'Selesai' },
    { id: 't-3', tahun: '2026/2027', semester: 'Ganjil', status: 'Mendatang' },
  ]);

  // Modals
  const [isGuruModalOpen, setIsGuruModalOpen] = useState(false);
  const [editingGuru, setEditingGuru] = useState<GuruItem | null>(null);
  const [guruForm, setGuruForm] = useState({ nip: '', nama: '', email: '', hp: '', jabatan: 'Guru Pengajar' });

  const [isHalaqahModalOpen, setIsHalaqahModalOpen] = useState(false);
  const [editingHalaqah, setEditingHalaqah] = useState<HalaqahItem | null>(null);
  const [halaqahForm, setHalaqahForm] = useState({ nama: '', guru: '', santriCount: 10, tingkat: 'Ula' });

  const [isKelasModalOpen, setIsKelasModalOpen] = useState(false);
  const [editingKelas, setEditingKelas] = useState<KelasItem | null>(null);
  const [kelasForm, setKelasForm] = useState({ namaKelas: '', jenjang: 'Pondok Pesantren', waliKelas: '', jumlahSantri: 20 });

  const [isTahunModalOpen, setIsTahunModalOpen] = useState(false);
  const [tahunForm, setTahunForm] = useState({ tahun: '2026/2027', semester: 'Ganjil', status: 'Mendatang' as 'Aktif' | 'Selesai' | 'Mendatang' });

  // Handlers Guru
  const handleOpenGuruModal = (g?: GuruItem) => {
    if (g) {
      setEditingGuru(g);
      setGuruForm({ nip: g.nip, nama: g.nama, email: g.email, hp: g.hp, jabatan: g.jabatan });
    } else {
      setEditingGuru(null);
      setGuruForm({ nip: `G-${new Date().getFullYear()}-00${guruList.length + 1}`, nama: '', email: '', hp: '', jabatan: 'Guru Pengajar' });
    }
    setIsGuruModalOpen(true);
  };

  const handleSaveGuru = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guruForm.nama.trim()) return;
    if (editingGuru) {
      setGuruList(prev => prev.map(g => g.id === editingGuru.id ? { ...g, ...guruForm } : g));
      showToast('Data Guru berhasil diperbarui', 'success');
    } else {
      const newG: GuruItem = { id: `g-${Date.now()}`, ...guruForm };
      setGuruList(prev => [...prev, newG]);
      showToast(`Guru ${guruForm.nama} berhasil ditambahkan`, 'success');
    }
    setIsGuruModalOpen(false);
  };

  const handleDeleteGuru = (id: string) => {
    if (confirm('Hapus data guru ini?')) {
      setGuruList(prev => prev.filter(g => g.id !== id));
      showToast('Data guru berhasil dihapus', 'info');
    }
  };

  // Handlers Halaqah
  const handleOpenHalaqahModal = (h?: HalaqahItem) => {
    if (h) {
      setEditingHalaqah(h);
      setHalaqahForm({ nama: h.nama, guru: h.guru, santriCount: h.santriCount, tingkat: h.tingkat });
    } else {
      setEditingHalaqah(null);
      setHalaqahForm({ nama: '', guru: guruList[0]?.nama || 'Ustadz Abdullah', santriCount: 10, tingkat: 'Ula' });
    }
    setIsHalaqahModalOpen(true);
  };

  const handleSaveHalaqah = (e: React.FormEvent) => {
    e.preventDefault();
    if (!halaqahForm.nama.trim()) return;
    if (editingHalaqah) {
      setHalaqahList(prev => prev.map(h => h.id === editingHalaqah.id ? { ...h, ...halaqahForm } : h));
      showToast('Halaqah berhasil diperbarui', 'success');
    } else {
      const newH: HalaqahItem = { id: `h-${Date.now()}`, ...halaqahForm };
      setHalaqahList(prev => [...prev, newH]);
      showToast(`Halaqah ${halaqahForm.nama} berhasil ditambahkan`, 'success');
    }
    setIsHalaqahModalOpen(false);
  };

  const handleDeleteHalaqah = (id: string) => {
    if (confirm('Hapus halaqah ini?')) {
      setHalaqahList(prev => prev.filter(h => h.id !== id));
      showToast('Halaqah berhasil dihapus', 'info');
    }
  };

  // Handlers Kelas
  const handleOpenKelasModal = (k?: KelasItem) => {
    if (k) {
      setEditingKelas(k);
      setKelasForm({ namaKelas: k.namaKelas, jenjang: k.jenjang, waliKelas: k.waliKelas, jumlahSantri: k.jumlahSantri });
    } else {
      setEditingKelas(null);
      setKelasForm({ namaKelas: '', jenjang: 'Pondok Pesantren', waliKelas: guruList[0]?.nama || 'Ustadz Abdullah', jumlahSantri: 20 });
    }
    setIsKelasModalOpen(true);
  };

  const handleSaveKelas = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kelasForm.namaKelas.trim()) return;
    if (editingKelas) {
      setKelasList(prev => prev.map(k => k.id === editingKelas.id ? { ...k, ...kelasForm } : k));
      showToast('Data kelas diperbarui', 'success');
    } else {
      setKelasList(prev => [...prev, { id: `k-${Date.now()}`, ...kelasForm }]);
      showToast(`Kelas ${kelasForm.namaKelas} ditambahkan`, 'success');
    }
    setIsKelasModalOpen(false);
  };

  const handleDeleteKelas = (id: string) => {
    if (confirm('Hapus kelas ini?')) {
      setKelasList(prev => prev.filter(k => k.id !== id));
      showToast('Kelas dihapus', 'info');
    }
  };

  // Handlers Tahun Ajaran
  const handleSaveTahun = (e: React.FormEvent) => {
    e.preventDefault();
    setTahunList(prev => [...prev, { id: `t-${Date.now()}`, ...tahunForm }]);
    showToast('Tahun Ajaran ditambahkan', 'success');
    setIsTahunModalOpen(false);
  };

  return (
    <div className="space-y-6 text-xs">
      <div className="p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl shadow-xl border border-emerald-800/50">
        <h2 className="text-xl font-bold">Master Data & Kelembagaan</h2>
        <p className="text-xs text-emerald-200/80 mt-1">
          Pengelolaan master data Guru, Halaqah Al-Qur'an, Kelas, Tahun Ajaran, serta Wilayah (Kecamatan, Nagari, Jorong)
        </p>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 overflow-x-auto">
        {[
          { id: 'guru', label: 'Data Guru', icon: <Users className="w-4 h-4" /> },
          { id: 'halaqah', label: 'Data Halaqah', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'kelas', label: 'Data Kelas', icon: <School className="w-4 h-4" /> },
          { id: 'wilayah', label: 'Data Wilayah (Nagari)', icon: <MapPin className="w-4 h-4" /> },
          { id: 'tahun', label: 'Tahun Ajaran & Semester', icon: <Calendar className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Guru */}
      {activeTab === 'guru' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Daftar Guru / Asatidz ({guruList.length})</h3>
            <button
              onClick={() => handleOpenGuruModal()}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Tambah Guru Baru
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase font-bold">
                <tr>
                  <th className="p-3">NIP / ID</th>
                  <th className="p-3">Nama Guru</th>
                  <th className="p-3">Jabatan</th>
                  <th className="p-3">Kontak / Email</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {guruList.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-mono font-bold text-emerald-600">{g.nip}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{g.nama}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{g.jabatan}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{g.hp} ({g.email})</td>
                    <td className="p-3 text-right space-x-1">
                      <button onClick={() => handleOpenGuruModal(g)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteGuru(g.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Halaqah */}
      {activeTab === 'halaqah' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Daftar Halaqah Al-Qur'an ({halaqahList.length})</h3>
            <button
              onClick={() => handleOpenHalaqahModal()}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Tambah Halaqah Baru
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase font-bold">
                <tr>
                  <th className="p-3">Nama Halaqah</th>
                  <th className="p-3">Guru Pembimbing</th>
                  <th className="p-3">Jumlah Santri</th>
                  <th className="p-3">Tingkat</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {halaqahList.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-teal-600 dark:text-teal-400">{h.nama}</td>
                    <td className="p-3 text-slate-900 dark:text-slate-100">{h.guru}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{h.santriCount} Santri</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">{h.tingkat}</span></td>
                    <td className="p-3 text-right space-x-1">
                      <button onClick={() => handleOpenHalaqahModal(h)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteHalaqah(h.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Kelas */}
      {activeTab === 'kelas' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Daftar Kelas Pembelajaran ({kelasList.length})</h3>
            <button
              onClick={() => handleOpenKelasModal()}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Tambah Kelas Baru
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase font-bold">
                <tr>
                  <th className="p-3">Nama Kelas</th>
                  <th className="p-3">Jenjang</th>
                  <th className="p-3">Wali Kelas</th>
                  <th className="p-3">Kapasitas Santri</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {kelasList.map((k) => (
                  <tr key={k.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{k.namaKelas}</td>
                    <td className="p-3 text-slate-600 font-semibold">{k.jenjang}</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">{k.waliKelas}</td>
                    <td className="p-3 text-slate-600">{k.jumlahSantri} Santri</td>
                    <td className="p-3 text-right space-x-1">
                      <button onClick={() => handleOpenKelasModal(k)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteKelas(k.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Wilayah */}
      {activeTab === 'wilayah' && (
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Master Wilayah Pemetaan Santri (Sumatera Barat)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-emerald-600">Daftar Kecamatan</h4>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {WILAYAH_DATA.kecamatan.map(k => <li key={k} className="p-1 bg-white dark:bg-slate-800 rounded shadow-xs">• Kecamatan {k}</li>)}
              </ul>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-teal-600">Daftar Nagari (Canduang)</h4>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {WILAYAH_DATA.nagari['Canduang'].map(n => <li key={n} className="p-1 bg-white dark:bg-slate-800 rounded shadow-xs">• Nagari {n}</li>)}
              </ul>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-blue-600">Daftar Jorong (Nagari Lasi)</h4>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {WILAYAH_DATA.jorong['Lasi'].map(j => <li key={j} className="p-1 bg-white dark:bg-slate-800 rounded shadow-xs">• Jorong {j}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab Tahun Ajaran */}
      {activeTab === 'tahun' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tahun Ajaran & Semester</h3>
            <button
              onClick={() => setIsTahunModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Tambah Tahun Ajaran
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase font-bold">
                <tr>
                  <th className="p-3">Tahun Ajaran</th>
                  <th className="p-3">Semester</th>
                  <th className="p-3">Status Periodik</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {tahunList.map((t) => (
                  <tr key={t.id}>
                    <td className="p-3 font-bold font-mono text-slate-900 dark:text-slate-100">{t.tahun}</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">Semester {t.semester}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        t.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Guru Modal */}
      {isGuruModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-md space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm">{editingGuru ? 'Edit Data Guru' : 'Tambah Guru Baru'}</h3>
              <button onClick={() => setIsGuruModalOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveGuru} className="space-y-3">
              <div>
                <label className="block mb-1 font-semibold">NIP / ID Guru</label>
                <input
                  type="text"
                  value={guruForm.nip}
                  onChange={e => setGuruForm({ ...guruForm, nip: e.target.value })}
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Nama Lengkap Guru</label>
                <input
                  type="text"
                  value={guruForm.nama}
                  onChange={e => setGuruForm({ ...guruForm, nama: e.target.value })}
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Jabatan / Tugasa</label>
                <input
                  type="text"
                  value={guruForm.jabatan}
                  onChange={e => setGuruForm({ ...guruForm, jabatan: e.target.value })}
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Nomor WhatsApp / HP</label>
                <input
                  type="text"
                  value={guruForm.hp}
                  onChange={e => setGuruForm({ ...guruForm, hp: e.target.value })}
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsGuruModalOpen(false)} className="px-3 py-1.5 border rounded">Batal</button>
                <button type="submit" className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded">Simpan Guru</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Halaqah Modal */}
      {isHalaqahModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-md space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm">{editingHalaqah ? 'Edit Halaqah' : 'Tambah Halaqah Baru'}</h3>
              <button onClick={() => setIsHalaqahModalOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveHalaqah} className="space-y-3">
              <div>
                <label className="block mb-1 font-semibold">Nama Halaqah</label>
                <input
                  type="text"
                  value={halaqahForm.nama}
                  onChange={e => setHalaqahForm({ ...halaqahForm, nama: e.target.value })}
                  placeholder="Contoh: Halaqah Al-Fatih"
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Guru Pembimbing</label>
                <select
                  value={halaqahForm.guru}
                  onChange={e => setHalaqahForm({ ...halaqahForm, guru: e.target.value })}
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                >
                  {guruList.map(g => <option key={g.id} value={g.nama}>{g.nama}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Tingkat</label>
                <select
                  value={halaqahForm.tingkat}
                  onChange={e => setHalaqahForm({ ...halaqahForm, tingkat: e.target.value })}
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                >
                  <option value="Ula">Ula (Dasar)</option>
                  <option value="Wustha">Wustha (Menengah)</option>
                  <option value="Ulya">Ulya (Lanjutan/Takhassus)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsHalaqahModalOpen(false)} className="px-3 py-1.5 border rounded">Batal</button>
                <button type="submit" className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded">Simpan Halaqah</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Kelas Modal */}
      {isKelasModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-md space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm">{editingKelas ? 'Edit Kelas' : 'Tambah Kelas Baru'}</h3>
              <button onClick={() => setIsKelasModalOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveKelas} className="space-y-3">
              <div>
                <label className="block mb-1 font-semibold">Nama Kelas</label>
                <input
                  type="text"
                  value={kelasForm.namaKelas}
                  onChange={e => setKelasForm({ ...kelasForm, namaKelas: e.target.value })}
                  placeholder="Contoh: Kelas XI IPA 2"
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Jenjang Pendidikan</label>
                <select
                  value={kelasForm.jenjang}
                  onChange={e => setKelasForm({ ...kelasForm, jenjang: e.target.value })}
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                >
                  <option value="Pondok Pesantren">Pondok Pesantren</option>
                  <option value="Rumah Tahfidz">Rumah Tahfidz</option>
                  <option value="Madrasah Diniyah">Madrasah Diniyah</option>
                  <option value="TPQ">TPQ</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Wali Kelas</label>
                <select
                  value={kelasForm.waliKelas}
                  onChange={e => setKelasForm({ ...kelasForm, waliKelas: e.target.value })}
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                >
                  {guruList.map(g => <option key={g.id} value={g.nama}>{g.nama}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsKelasModalOpen(false)} className="px-3 py-1.5 border rounded">Batal</button>
                <button type="submit" className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded">Simpan Kelas</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tahun Modal */}
      {isTahunModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-md space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm">Tambah Tahun Ajaran</h3>
              <button onClick={() => setIsTahunModalOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveTahun} className="space-y-3">
              <div>
                <label className="block mb-1 font-semibold">Tahun Ajaran</label>
                <input
                  type="text"
                  value={tahunForm.tahun}
                  onChange={e => setTahunForm({ ...tahunForm, tahun: e.target.value })}
                  placeholder="2026/2027"
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Semester</label>
                <select
                  value={tahunForm.semester}
                  onChange={e => setTahunForm({ ...tahunForm, semester: e.target.value })}
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                >
                  <option value="Ganjil">Ganjil</option>
                  <option value="Genap">Genap</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsTahunModalOpen(false)} className="px-3 py-1.5 border rounded">Batal</button>
                <button type="submit" className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded">Simpan Tahun</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
