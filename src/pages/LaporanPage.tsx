import React from 'react';
import { FileText, Download, Printer, Filter } from 'lucide-react';
import { useSantri } from '../contexts/SantriContext';

export const LaporanPage: React.FC = () => {
  const { santriList, settings } = useSantri();

  return (
    <div className="space-y-6 text-xs">
      <div className="p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl shadow-xl border border-emerald-800/50">
        <h2 className="text-xl font-bold">Laporan Rekapitulasi Enterprise</h2>
        <p className="text-xs text-emerald-200/80 mt-1">
          Cetak dan ekspor laporan rekapitulasi data santri, perkembangan hafalan, dan keuangan
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Laporan Rekap Data Induk Santri', desc: 'Daftar seluruh santri aktif beserta NIS, NIK, dan wilayah', format: 'PDF & Excel' },
          { title: 'Laporan Progress Tahfidz & Setoran', desc: 'Capaian juz hafalan per halaqah dan musyrif', format: 'PDF & Excel' },
          { title: 'Laporan Rekap Kehadiran Santri', desc: 'Persentase presensi harian dan bulanan', format: 'Excel' },
          { title: 'Laporan Penerimaan Keuangan & SPP', desc: 'Rincian transaksi masuk dan daftar tunggakan', format: 'PDF & Excel' },
          { title: 'Laporan Distribusi Santri per Nagari', desc: 'Pemetaan demografi santri berbasis wilayah', format: 'PDF' },
        ].map((report, idx) => (
          <div key={idx} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{report.title}</h3>
              <p className="text-slate-500 text-[11px] mt-0.5">{report.desc}</p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono">Format: {report.format}</span>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700">
                <Download className="w-3.5 h-3.5" /> Unduh
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
