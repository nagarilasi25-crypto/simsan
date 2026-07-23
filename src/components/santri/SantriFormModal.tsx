import React, { useState, useEffect } from 'react';
import { X, Sparkles, Save, User, MapPin, School, Users, RefreshCw } from 'lucide-react';
import { Santri, JenisKelamin, StatusSantri, JenjangPendidikan } from '../../types';
import { useSantri } from '../../contexts/SantriContext';
import { WILAYAH_DATA } from '../../utils/mockData';

interface SantriFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  santriToEdit?: Santri | null;
}

export const SantriFormModal: React.FC<SantriFormModalProps> = ({ isOpen, onClose, santriToEdit }) => {
  const { handleAddSantri, handleEditSantri, getGeneratedNIS, settings } = useSantri();
  const [activeTab, setActiveTab] = useState<'pribadi' | 'alamat' | 'akademik' | 'orangtua'>('pribadi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!santriToEdit;

  const [formData, setFormData] = useState({
    nis: '',
    nik: '',
    noKK: '',
    nama: '',
    namaPanggilan: '',
    jenisKelamin: 'L' as JenisKelamin,
    tempatLahir: 'Bukittinggi',
    tanggalLahir: '2010-01-01',
    alamat: 'Jl. Raya Lasi',
    jorong: 'Lasi Tuo',
    nagari: 'Lasi',
    kecamatan: 'Canduang',
    kabupaten: 'Agam',
    provinsi: 'Sumatera Barat',
    kodePos: '26192',
    status: 'Aktif' as StatusSantri,
    tanggalMasuk: new Date().toISOString().split('T')[0],
    asalSekolah: 'SMP IT',
    jenjang: 'Pondok Pesantren' as JenjangPendidikan,
    kelas: 'X IPA 1',
    halaqah: 'Halaqah Al-Jazari',
    guruPembimbing: 'Ustadz Abdullah Al-Hafidz',
    catatan: '',
    namaAyah: '',
    nikAyah: '',
    pendidikanAyah: '',
    pekerjaanAyah: '',
    hpAyah: '',
    namaIbu: '',
    nikIbu: '',
    pendidikanIbu: '',
    pekerjaanIbu: '',
    hpIbu: '',
    namaWali: '',
    hubunganWali: '',
    hpWali: ''
  });

  useEffect(() => {
    if (santriToEdit) {
      setFormData({
        nis: santriToEdit.nis,
        nik: santriToEdit.nik || '',
        noKK: santriToEdit.noKK || '',
        nama: santriToEdit.nama || '',
        namaPanggilan: santriToEdit.namaPanggilan || '',
        jenisKelamin: santriToEdit.jenisKelamin || 'L',
        tempatLahir: santriToEdit.tempatLahir || '',
        tanggalLahir: santriToEdit.tanggalLahir || '',
        alamat: santriToEdit.alamat || '',
        jorong: santriToEdit.jorong || '',
        nagari: santriToEdit.nagari || '',
        kecamatan: santriToEdit.kecamatan || 'Canduang',
        kabupaten: santriToEdit.kabupaten || 'Agam',
        provinsi: santriToEdit.provinsi || 'Sumatera Barat',
        kodePos: santriToEdit.kodePos || '',
        status: santriToEdit.status || 'Aktif',
        tanggalMasuk: santriToEdit.tanggalMasuk || '',
        asalSekolah: santriToEdit.asalSekolah || '',
        jenjang: santriToEdit.jenjang || 'Pondok Pesantren',
        kelas: santriToEdit.kelas || '',
        halaqah: santriToEdit.halaqah || '',
        guruPembimbing: santriToEdit.guruPembimbing || '',
        catatan: santriToEdit.catatan || '',
        namaAyah: santriToEdit.namaAyah || '',
        nikAyah: santriToEdit.nikAyah || '',
        pendidikanAyah: santriToEdit.pendidikanAyah || '',
        pekerjaanAyah: santriToEdit.pekerjaanAyah || '',
        hpAyah: santriToEdit.hpAyah || '',
        namaIbu: santriToEdit.namaIbu || '',
        nikIbu: santriToEdit.nikIbu || '',
        pendidikanIbu: santriToEdit.pendidikanIbu || '',
        pekerjaanIbu: santriToEdit.pekerjaanIbu || '',
        hpIbu: santriToEdit.hpIbu || '',
        namaWali: santriToEdit.namaWali || '',
        hubunganWali: santriToEdit.hubunganWali || '',
        hpWali: santriToEdit.hpWali || ''
      });
    } else {
      // Auto generate NIS for new Santri
      const autoNIS = getGeneratedNIS();
      setFormData(prev => ({
        ...prev,
        nis: autoNIS
      }));
    }
  }, [santriToEdit, isOpen]);

  if (!isOpen) return null;

  const handleGenerateNIS = () => {
    const nextNIS = getGeneratedNIS();
    setFormData(prev => ({ ...prev, nis: nextNIS }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim()) {
      alert('Nama Santri Wajib Diisi');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing && santriToEdit) {
        await handleEditSantri(santriToEdit.id, formData);
      } else {
        await handleAddSantri(formData);
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableNagari = WILAYAH_DATA.nagari[formData.kecamatan as keyof typeof WILAYAH_DATA.nagari] || ['Lasi', 'Canduang Koto Laweh'];
  const availableJorong = WILAYAH_DATA.jorong[formData.nagari as keyof typeof WILAYAH_DATA.jorong] || ['Lasi Tuo', 'Lasi Mudo', 'Pasanehan'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-900 to-teal-950 text-white border-b border-emerald-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30 font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {isEditing ? 'Edit Data Induk Santri' : 'Pendaftaran & Penerbitan NIS Santri'}
              </h2>
              <p className="text-xs text-emerald-200/80">
                Format NIS Otomatis: <span className="font-mono font-bold text-emerald-300">{formData.nis || 'ARR-2026-XXXXXX'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-200/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-6 pt-3 gap-2 overflow-x-auto">
          {[
            { id: 'pribadi', label: '1. Data Pribadi', icon: <User className="w-4 h-4" /> },
            { id: 'alamat', label: '2. Alamat & Wilayah', icon: <MapPin className="w-4 h-4" /> },
            { id: 'akademik', label: '3. Akademik & Halaqah', icon: <School className="w-4 h-4" /> },
            { id: 'orangtua', label: '4. Orang Tua / Wali', icon: <Users className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-emerald-600 dark:border-emerald-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 border-transparent'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {activeTab === 'pribadi' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* NIS Auto-Generator & Redeem Code */}
              <div className="col-span-1 md:col-span-2 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label className="font-extrabold text-emerald-950 dark:text-emerald-300 block">
                    Nomor Induk Santri (NIS) / Kode Redeem *
                  </label>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-400">
                    Format otomatis: <span className="font-mono font-bold">[PREFIX]-[TAHUN]-[URUT]-[ANGKA_ACAK]</span>. Admin dapat mengetik kode redeem custom.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="text"
                    name="nis"
                    value={formData.nis}
                    onChange={handleChange}
                    className="px-3 py-2 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 rounded-xl font-mono font-bold text-xs text-emerald-950 dark:text-emerald-200 w-48 uppercase"
                    placeholder="PREFIX-YEAR-0001-9921"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateNIS}
                    className="flex items-center gap-1 px-3 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors shrink-0 shadow-sm"
                    title="Generate NIS Acak / Baru"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Generate Acak</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Nama Lengkap Santri *</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: Muhammad Rayhan Al-Fatih"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Nama Panggilan</label>
                <input
                  type="text"
                  name="namaPanggilan"
                  value={formData.namaPanggilan}
                  onChange={handleChange}
                  placeholder="Contoh: Rayhan"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">NIK (16 Digit)</label>
                <input
                  type="text"
                  name="nik"
                  maxLength={16}
                  value={formData.nik}
                  onChange={handleChange}
                  placeholder="130601..."
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Nomor KK (16 Digit)</label>
                <input
                  type="text"
                  name="noKK"
                  maxLength={16}
                  value={formData.noKK}
                  onChange={handleChange}
                  placeholder="130601..."
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Jenis Kelamin *</label>
                <select
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="L">Laki-Laki (Ikhwan)</option>
                  <option value="P">Perempuan (Akhwat)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Tempat Lahir</label>
                <input
                  type="text"
                  name="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={handleChange}
                  placeholder="Contoh: Bukittinggi"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Status Santri *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-emerald-600"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Non-Aktif">Non-Aktif</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Cuti">Cuti</option>
                  <option value="Mutasi">Mutasi</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'alamat' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="col-span-1 md:col-span-2">
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Alamat Jalan / No. Rumah</label>
                <input
                  type="text"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  placeholder="Jl. Raya Canduang - Lasi"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Kecamatan</label>
                <select
                  name="kecamatan"
                  value={formData.kecamatan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {WILAYAH_DATA.kecamatan.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Nagari</label>
                <select
                  name="nagari"
                  value={formData.nagari}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {availableNagari.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Jorong</label>
                <select
                  name="jorong"
                  value={formData.jorong}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {availableJorong.map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Kabupaten / Kota</label>
                <input
                  type="text"
                  name="kabupaten"
                  value={formData.kabupaten}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Provinsi</label>
                <input
                  type="text"
                  name="provinsi"
                  value={formData.provinsi}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Kode Pos</label>
                <input
                  type="text"
                  name="kodePos"
                  value={formData.kodePos}
                  onChange={handleChange}
                  placeholder="26192"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>
          )}

          {activeTab === 'akademik' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Jenjang Pendidikan *</label>
                <select
                  name="jenjang"
                  value={formData.jenjang}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="Pondok Pesantren">Pondok Pesantren</option>
                  <option value="Rumah Tahfidz">Rumah Tahfidz</option>
                  <option value="TPQ">TPQ</option>
                  <option value="Madrasah Diniyah">Madrasah Diniyah</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Kelas</label>
                <input
                  type="text"
                  name="kelas"
                  value={formData.kelas}
                  onChange={handleChange}
                  placeholder="X IPA 1"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Halaqah Al-Qur'an</label>
                <input
                  type="text"
                  name="halaqah"
                  value={formData.halaqah}
                  onChange={handleChange}
                  placeholder="Halaqah Al-Jazari"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Guru Pembimbing / Musyrif</label>
                <input
                  type="text"
                  name="guruPembimbing"
                  value={formData.guruPembimbing}
                  onChange={handleChange}
                  placeholder="Ustadz Abdullah Al-Hafidz"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Tanggal Masuk</label>
                <input
                  type="date"
                  name="tanggalMasuk"
                  value={formData.tanggalMasuk}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Asal Sekolah</label>
                <input
                  type="text"
                  name="asalSekolah"
                  value={formData.asalSekolah}
                  onChange={handleChange}
                  placeholder="SMP IT Al-Islami"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Catatan Khusus</label>
                <textarea
                  name="catatan"
                  rows={2}
                  value={formData.catatan}
                  onChange={handleChange}
                  placeholder="Catatan prestasi, kesehatan, atau riwayat hafalan..."
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'orangtua' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  Data Ayah Kandung
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Nama Ayah</label>
                    <input
                      type="text"
                      name="namaAyah"
                      value={formData.namaAyah}
                      onChange={handleChange}
                      placeholder="Nama lengkap ayah"
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">No. HP / WhatsApp Ayah</label>
                    <input
                      type="text"
                      name="hpAyah"
                      value={formData.hpAyah}
                      onChange={handleChange}
                      placeholder="0812..."
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Pekerjaan Ayah</label>
                    <input
                      type="text"
                      name="pekerjaanAyah"
                      value={formData.pekerjaanAyah}
                      onChange={handleChange}
                      placeholder="Wiraswasta / PNS"
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Pendidikan Terakhir</label>
                    <input
                      type="text"
                      name="pendidikanAyah"
                      value={formData.pendidikanAyah}
                      onChange={handleChange}
                      placeholder="S1 / SMA"
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  Data Ibu Kandung
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Nama Ibu</label>
                    <input
                      type="text"
                      name="namaIbu"
                      value={formData.namaIbu}
                      onChange={handleChange}
                      placeholder="Nama lengkap ibu"
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">No. HP / WhatsApp Ibu</label>
                    <input
                      type="text"
                      name="hpIbu"
                      value={formData.hpIbu}
                      onChange={handleChange}
                      placeholder="0813..."
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/20 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Simpan Perubahan' : 'Terbitkan NIS & Simpan Santri'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
