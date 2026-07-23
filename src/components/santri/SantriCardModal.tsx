import React from 'react';
import { X, Printer, Shield, School, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Santri } from '../../types';
import { useSantri } from '../../contexts/SantriContext';

interface SantriCardModalProps {
  santri: Santri | null;
  onClose: () => void;
}

export const SantriCardModal: React.FC<SantriCardModalProps> = ({ santri, onClose }) => {
  const { settings } = useSantri();

  if (!santri) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 space-y-6 my-8 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Cetak Kartu Santri PVC (NISN Santri)</h2>
              <p className="text-xs text-slate-500">Kartu identitas resmi terdaftar dengan QR Code Validasi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card PVC Graphic Render Preview */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-4">
          
          {/* PVC CARD FRONT */}
          <div className="w-80 h-48 rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-4 shadow-2xl border border-emerald-500/40 relative overflow-hidden flex flex-col justify-between shrink-0">
            {/* Background Decorative Ripples */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400/10 rounded-full blur-xl pointer-events-none"></div>

            {/* Institution Header */}
            <div className="flex items-center gap-2 border-b border-emerald-500/30 pb-2 z-10">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                <School className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-emerald-300 truncate">
                  KARTU INDUK SANTRI
                </span>
                <span className="text-[9px] text-slate-300 truncate font-semibold">
                  {settings.namaLembaga}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="flex items-center gap-3 z-10 my-auto">
              <div className="w-14 h-16 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md border border-white/20 shrink-0">
                {santri.nama.charAt(0)}
              </div>
              <div className="flex flex-col min-w-0 space-y-0.5">
                <h3 className="text-xs font-bold text-white truncate leading-tight">{santri.nama}</h3>
                <p className="text-[10px] font-mono font-extrabold text-emerald-300">NIS: {santri.nis}</p>
                <p className="text-[9px] text-slate-300 font-medium">{santri.jenjang} • {santri.kelas}</p>
                <p className="text-[9px] text-teal-200 font-medium truncate">{santri.halaqah}</p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between border-t border-emerald-500/30 pt-1.5 z-10">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span className="text-[8px] font-bold text-emerald-300 uppercase">Resmi & Aktif</span>
              </div>
              <div className="bg-white p-1 rounded-md shadow-sm">
                <QRCodeSVG value={santri.qrCodeData} size={28} />
              </div>
            </div>
          </div>

          {/* PVC CARD BACK */}
          <div className="w-80 h-48 rounded-2xl bg-slate-900 text-white p-4 shadow-2xl border border-slate-700/80 relative overflow-hidden flex flex-col justify-between shrink-0">
            <div className="border-b border-slate-800 pb-1.5">
              <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">KETENTUAN KARTU NISN SANTRI</p>
            </div>
            
            <div className="text-[8px] text-slate-300 space-y-1 my-auto">
              <p>1. Kartu ini merupakan bukti fisik keanggotaan santri terdaftar di {settings.namaLembaga}.</p>
              <p>2. Gunakan QR Code untuk absensi harian, perpustakaan, dan presensi halaqah.</p>
              <p>3. Jika kartu hilang, segera laporkan ke Sekretariat Kesantrian SIMSAN.</p>
            </div>

            <div className="flex items-end justify-between border-t border-slate-800 pt-1.5">
              <div className="text-[8px] text-slate-400">
                <p className="font-semibold text-slate-300">{settings.kota}, {new Date().getFullYear()}</p>
                <p>Kepala Pesantren</p>
              </div>
              <div className="text-right text-[8px] text-emerald-400 font-bold">
                <p>Tanda Tangan Digital</p>
                <p className="text-slate-300 font-normal">SIMSAN Verified</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500">
            Ukuran standar PVC CR80 (85.60 x 53.98 mm)
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Kartu PVC</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
