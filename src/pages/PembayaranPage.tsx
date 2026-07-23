import React from 'react';
import { CreditCard, Plus, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import { useSantri } from '../contexts/SantriContext';

export const PembayaranPage: React.FC = () => {
  const { santriList } = useSantri();

  return (
    <div className="space-y-6 text-xs">
      <div className="p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl shadow-xl border border-emerald-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Modul Keuangan & Pembayaran SPP</h2>
          <p className="text-xs text-emerald-200/80 mt-1">
            Pengelolaan SPP bulanan, Syahriyah, Infaq Pembangunan, dan Cetak Kwitansi
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-emerald-400 shrink-0">
          <Plus className="w-4 h-4" /> Catat Pembayaran Baru
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-400 font-medium">Total Penerimaan Juli 2026</p>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">Rp 48.500.000</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-400 font-medium">Santri Lunas SPP</p>
          <p className="text-xl font-extrabold text-teal-600 dark:text-teal-400 mt-1">94.2%</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-400 font-medium">Tunggakan SPP</p>
          <p className="text-xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">Rp 2.800.000</p>
        </div>
      </div>

      {/* Payment Transactions Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Transaksi Pembayaran Terbaru</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 uppercase font-bold text-slate-600">
              <tr>
                <th className="p-3">Kwitansi No.</th>
                <th className="p-3">Santri</th>
                <th className="p-3">Jenis Pembayaran</th>
                <th className="p-3">Nominal</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {santriList.slice(0, 4).map((s, idx) => (
                <tr key={s.id}>
                  <td className="p-3 font-mono font-bold text-slate-500">KW-2026-00{idx + 1}</td>
                  <td className="p-3 font-bold">{s.nama}</td>
                  <td className="p-3 font-semibold text-teal-600">SPP & Syahriyah Juli 2026</td>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-slate-100">Rp 500.000</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-md">Lunas</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
