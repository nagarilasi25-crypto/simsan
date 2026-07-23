import React, { useState } from 'react';
import { QrCode, CheckCircle, Clock, AlertTriangle, Search, Camera } from 'lucide-react';
import { useSantri } from '../contexts/SantriContext';

export const AbsensiPage: React.FC = () => {
  const { santriList, showToast } = useSantri();
  const [scanInput, setScanInput] = useState('');

  const handleSimulateScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput.trim()) return;
    showToast(`Presensi Berhasil: ${scanInput} Tervalidasi Hadir`, 'success');
    setScanInput('');
  };

  return (
    <div className="space-y-6 text-xs">
      <div className="p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl shadow-xl border border-emerald-800/50">
        <h2 className="text-xl font-bold">Modul Presensi & QR Code Scanner</h2>
        <p className="text-xs text-emerald-200/80 mt-1">
          Scan QR Code Kartu Santri untuk absensi otomatis, presensi halaqah, dan rekap harian
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* QR Scanner Simulation Card */}
        <div className="md:col-span-1 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Camera className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Simulasi Reader QR Code</h3>
            <p className="text-slate-500 text-[11px]">Tempelkan Kartu Santri atau masukkan kode QR payload</p>
          </div>

          <form onSubmit={handleSimulateScan} className="space-y-3">
            <input
              type="text"
              placeholder="Scan/Ketik Kode QR..."
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-center"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors"
            >
              Proses Absensi Hadir
            </button>
          </form>
        </div>

        {/* Live Attendance List */}
        <div className="md:col-span-2 p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Rekapitulasi Kehadiran Hari Ini</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 uppercase font-bold text-slate-600">
                <tr>
                  <th className="p-3">Santri</th>
                  <th className="p-3">Waktu Tiba</th>
                  <th className="p-3">Metode</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {santriList.slice(0, 5).map((s, idx) => (
                  <tr key={s.id}>
                    <td className="p-3">
                      <div className="font-bold">{s.nama}</div>
                      <div className="font-mono text-[10px] text-emerald-600">{s.nis}</div>
                    </td>
                    <td className="p-3 font-mono text-slate-500">07:15:{10 + idx} WIB</td>
                    <td className="p-3 font-semibold text-teal-600">Scan QR Code</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-md">Hadir</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
