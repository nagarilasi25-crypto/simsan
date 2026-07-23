import React, { useState } from 'react';
import { BookOpen, Plus, Award, CheckCircle2, Search, FileText, Calendar, Edit2, Trash2, X, Printer } from 'lucide-react';
import { useSantri } from '../contexts/SantriContext';

interface SetoranItem {
  id: string;
  santriId: string;
  santri: string;
  nis: string;
  juz: string;
  surah: string;
  nilai: string;
  tanggal: string;
  musyrif: string;
  catatan?: string;
}

export const TahfidzPage: React.FC = () => {
  const { santriList, showToast } = useSantri();
  const [search, setSearch] = useState('');
  const [selectedJuzFilter, setSelectedJuzFilter] = useState('');

  const [setoranList, setSetoranList] = useState<SetoranItem[]>([
    { id: '1', santriId: 'santri-1', santri: 'Muhammad Rayhan Al-Fatih', nis: 'ARR-2026-000001', juz: 'Juz 10', surah: 'Al-Anfal : 1 - 40', nilai: 'A (Mumtaz)', tanggal: '2026-07-22', musyrif: 'Ustadz Abdullah Al-Hafidz', catatan: 'Sangat lancar, tajwid makhraj bagus' },
    { id: '2', santriId: 'santri-2', santri: 'Aisyah Humaira Az-Zahra', nis: 'ARR-2026-000002', juz: 'Juz 5', surah: 'An-Nisa : 1 - 80', nilai: 'A (Mumtaz)', tanggal: '2026-07-22', musyrif: 'Ustadzah Siti Maryam', catatan: 'Lancar murni tanpa salah' },
    { id: '3', santriId: 'santri-3', santri: 'Fathan Al-Ghazali', nis: 'ARR-2026-000003', juz: 'Juz 2', surah: 'Al-Baqarah : 142 - 200', nilai: 'B+ (Jayyid Jiddan)', tanggal: '2026-07-21', musyrif: 'Ustadz Hamzah', catatan: 'Perlu pengulangan di bagian waqaf' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SetoranItem | null>(null);

  const [form, setForm] = useState({
    santriId: '',
    juz: 'Juz 1',
    surah: 'Al-Baqarah : 1 - 50',
    nilai: 'A (Mumtaz)',
    tanggal: new Date().toISOString().split('T')[0],
    musyrif: 'Ustadz Abdullah Al-Hafidz',
    catatan: ''
  });

  const handleOpenModal = (item?: SetoranItem) => {
    if (item) {
      setEditingItem(item);
      setForm({
        santriId: item.santriId,
        juz: item.juz,
        surah: item.surah,
        nilai: item.nilai,
        tanggal: item.tanggal,
        musyrif: item.musyrif,
        catatan: item.catatan || ''
      });
    } else {
      setEditingItem(null);
      const defaultSantri = santriList[0];
      setForm({
        santriId: defaultSantri ? defaultSantri.id : '',
        juz: 'Juz 1',
        surah: 'Al-Baqarah : 1 - 50',
        nilai: 'A (Mumtaz)',
        tanggal: new Date().toISOString().split('T')[0],
        musyrif: 'Ustadz Abdullah Al-Hafidz',
        catatan: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveSetoran = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedSantri = santriList.find(s => s.id === form.santriId) || santriList[0];
    if (!selectedSantri) {
      alert('Pilih santri terlebih dahulu');
      return;
    }

    if (editingItem) {
      setSetoranList(prev => prev.map(s => s.id === editingItem.id ? {
        ...s,
        santriId: selectedSantri.id,
        santri: selectedSantri.nama,
        nis: selectedSantri.nis,
        juz: form.juz,
        surah: form.surah,
        nilai: form.nilai,
        tanggal: form.tanggal,
        musyrif: form.musyrif,
        catatan: form.catatan
      } : s));
      showToast('Data setoran hafalan berhasil diperbarui', 'success');
    } else {
      const newSetoran: SetoranItem = {
        id: `setoran-${Date.now()}`,
        santriId: selectedSantri.id,
        santri: selectedSantri.nama,
        nis: selectedSantri.nis,
        juz: form.juz,
        surah: form.surah,
        nilai: form.nilai,
        tanggal: form.tanggal,
        musyrif: form.musyrif,
        catatan: form.catatan
      };
      setSetoranList(prev => [newSetoran, ...prev]);
      showToast(`Setoran hafalan ${selectedSantri.nama} berhasil dicatat`, 'success');
    }
    setIsModalOpen(false);
  };

  const handleDeleteSetoran = (id: string) => {
    if (confirm('Hapus catat setoran hafalan ini?')) {
      setSetoranList(prev => prev.filter(s => s.id !== id));
      showToast('Setoran hafalan berhasil dihapus', 'info');
    }
  };

  const filteredList = setoranList.filter(s => {
    const matchSearch = s.santri.toLowerCase().includes(search.toLowerCase()) || s.nis.toLowerCase().includes(search.toLowerCase()) || s.surah.toLowerCase().includes(search.toLowerCase());
    const matchJuz = selectedJuzFilter ? s.juz === selectedJuzFilter : true;
    return matchSearch && matchJuz;
  });

  return (
    <div className="space-y-6 text-xs">
      {/* Banner */}
      <div className="p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl shadow-xl border border-emerald-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Modul Tahfidz & Setoran Al-Qur'an</h2>
          <p className="text-xs text-emerald-200/80 mt-1">
            Pencatatan setoran hafalan baru, murajaah, ujian juz, dan jurnal perkembangan santri
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10"
          >
            <Printer className="w-4 h-4" /> Cetak Jurnal
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold rounded-xl text-xs hover:from-emerald-400 shrink-0 shadow-lg"
          >
            <Plus className="w-4 h-4" /> Input Setoran Hafalan
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">340 Juz</div>
            <div className="text-[11px] text-slate-500">Total Hafalan Santri Bulan Ini</div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 bg-teal-100 text-teal-600 rounded-xl font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">12 Santri</div>
            <div className="text-[11px] text-slate-500">Khatam 30 Juz Al-Qur'an</div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">98.5%</div>
            <div className="text-[11px] text-slate-500">Tingkat Kelancaran Murajaah</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari Nama Santri, NIS, atau Surah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800"
          />
        </div>
        <select
          value={selectedJuzFilter}
          onChange={(e) => setSelectedJuzFilter(e.target.value)}
          className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 font-medium"
        >
          <option value="">Semua Juz (Juz 1 - 30)</option>
          {Array.from({ length: 30 }, (_, i) => `Juz ${i + 1}`).map(j => (
            <option key={j} value={j}>{j}</option>
          ))}
        </select>
      </div>

      {/* Setoran Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Riwayat Setoran Hafalan ({filteredList.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase font-bold">
              <tr>
                <th className="p-3">Santri & NIS</th>
                <th className="p-3">Hafalan Juz & Surah</th>
                <th className="p-3">Nilai</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Musyrif</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredList.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{s.santri}</div>
                    <div className="font-mono text-[10px] text-emerald-600 font-bold">{s.nis}</div>
                  </td>
                  <td className="p-3 font-semibold text-teal-600 dark:text-teal-400">
                    <div>{s.juz}</div>
                    <div className="text-[11px] text-slate-500">{s.surah}</div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 rounded-md font-bold">
                      {s.nilai}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{s.tanggal}</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">{s.musyrif}</td>
                  <td className="p-3 text-right space-x-1">
                    <button onClick={() => handleOpenModal(s)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg" title="Edit Setoran">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteSetoran(s.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg" title="Hapus Setoran">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Input / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-md space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm">{editingItem ? 'Edit Setoran Hafalan' : 'Input Setoran Hafalan Baru'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveSetoran} className="space-y-3">
              <div>
                <label className="block mb-1 font-semibold">Pilih Santri *</label>
                <select
                  value={form.santriId}
                  onChange={(e) => setForm({ ...form, santriId: e.target.value })}
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800 font-semibold"
                  required
                >
                  {santriList.map(s => (
                    <option key={s.id} value={s.id}>{s.nama} ({s.nis})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-1 font-semibold">Juz *</label>
                  <select
                    value={form.juz}
                    onChange={(e) => setForm({ ...form, juz: e.target.value })}
                    className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                  >
                    {Array.from({ length: 30 }, (_, i) => `Juz ${i + 1}`).map(j => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Nilai Kelancaran</label>
                  <select
                    value={form.nilai}
                    onChange={(e) => setForm({ ...form, nilai: e.target.value })}
                    className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="A (Mumtaz)">A (Mumtaz)</option>
                    <option value="B+ (Jayyid Jiddan)">B+ (Jayyid Jiddan)</option>
                    <option value="B (Jayyid)">B (Jayyid)</option>
                    <option value="C (Maqbul)">C (Maqbul)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-semibold">Surah & Ayat *</label>
                <input
                  type="text"
                  value={form.surah}
                  onChange={(e) => setForm({ ...form, surah: e.target.value })}
                  placeholder="Contoh: Al-Baqarah : 1 - 50"
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Musyrif / Penguji</label>
                <input
                  type="text"
                  value={form.musyrif}
                  onChange={(e) => setForm({ ...form, musyrif: e.target.value })}
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Catatan Bimbingan</label>
                <textarea
                  value={form.catatan}
                  onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                  placeholder="Catatan kelancaran, makhraj, tajwid..."
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800 h-20"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 border rounded">Batal</button>
                <button type="submit" className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded">Simpan Setoran</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
