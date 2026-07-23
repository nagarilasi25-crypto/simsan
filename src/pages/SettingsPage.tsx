import React, { useState } from 'react';
import { Settings, Save, Shield, FileText, Database, CheckCircle, RefreshCw } from 'lucide-react';
import { useSantri } from '../contexts/SantriContext';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, auditLogs } = useSantri();

  const [form, setForm] = useState({
    namaLembaga: settings.namaLembaga,
    alamat: settings.alamat,
    prefixNis: settings.prefixNis,
    tahunAjaranAktif: settings.tahunAjaranAktif,
    email: settings.email,
    telepon: settings.telepon,
    kota: settings.kota,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
  };

  return (
    <div className="space-y-6 text-xs">
      <div className="p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl shadow-xl border border-emerald-800/50">
        <h2 className="text-xl font-bold">Pengaturan System & Prefix NIS</h2>
        <p className="text-xs text-emerald-200/80 mt-1">
          Konfigurasi identitas lembaga, format penomoran NIS, dan pengaturan keamanan database SIMSAN.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Form */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Identitas Lembaga & Prefix NIS
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="font-extrabold text-emerald-950 dark:text-emerald-300 block">
                  Prefix NIS (Nomor Induk Santri) *
                </label>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-400">
                  Digunakan untuk mengenerate NIS otomatis, contoh: <span className="font-mono font-bold">{form.prefixNis || 'ARR'}-2026-000001</span>
                </p>
              </div>
              <input
                type="text"
                name="prefixNis"
                value={form.prefixNis}
                onChange={handleChange}
                maxLength={8}
                required
                className="px-3 py-2 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 rounded-xl font-mono font-bold text-sm text-emerald-950 dark:text-emerald-200 w-32 uppercase"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Nama Lembaga / Pesantren *</label>
              <input
                type="text"
                name="namaLembaga"
                value={form.namaLembaga}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Tahun Ajaran Aktif</label>
                <input
                  type="text"
                  name="tahunAjaranAktif"
                  value={form.tahunAjaranAktif}
                  onChange={handleChange}
                  placeholder="2025/2026"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Kota / Kabupaten</label>
                <input
                  type="text"
                  name="kota"
                  value={form.kota}
                  onChange={handleChange}
                  placeholder="Agam"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Alamat Lengkap Lembaga</label>
              <input
                type="text"
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Email Resm</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Nomor Telepon / Kontak</label>
                <input
                  type="text"
                  name="telepon"
                  value={form.telepon}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold rounded-xl shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Pengaturan</span>
              </button>
            </div>
          </form>
        </div>

        {/* Database Status & Audit Trail */}
        <div className="space-y-6">
          <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Database className="w-4 h-4 text-emerald-600" />
              Status Firebase Firestore
            </h3>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-emerald-950 dark:text-emerald-200">Koneksi Database Aktif</div>
                <div className="text-[10px] text-emerald-800 dark:text-emerald-400">Firebase Auth & Cloud Firestore Engine Enabled</div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              Audit Log Terakhir
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {auditLogs.slice(0, 5).map(log => (
                <div key={log.id} className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 dark:text-slate-100">{log.action}</div>
                  <div className="text-slate-500 text-[11px]">{log.target}</div>
                  <div className="text-[10px] text-slate-400">{new Date(log.timestamp).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
