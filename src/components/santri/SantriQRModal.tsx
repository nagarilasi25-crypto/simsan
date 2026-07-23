import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, Download, Copy, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Santri } from '../../types';

interface SantriQRModalProps {
  santri: Santri | null;
  onClose: () => void;
}

export const SantriQRModal: React.FC<SantriQRModalProps> = ({ santri, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!santri) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(santri.qrCodeData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 space-y-5 my-8 text-center animate-in fade-in zoom-in-95">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto font-bold border border-emerald-300 dark:border-emerald-800">
          <QrCode className="w-6 h-6" />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">{santri.nama}</h2>
          <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">NIS: {santri.nis}</p>
          <p className="text-xs text-slate-500 mt-1">{santri.jenjang} • {santri.halaqah}</p>
        </div>

        {/* QR Code Container */}
        <div className="p-6 bg-white border-2 border-emerald-500/30 rounded-2xl shadow-inner inline-block">
          <QRCodeSVG value={santri.qrCodeData} size={180} level="H" includeMargin={true} />
        </div>

        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-emerald-900 dark:text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Status Validasi: TERDENGAR SAMA & RESMI</span>
        </div>

        {/* Copy QR Code Payload */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-all"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin!' : 'Salin Kode QR'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
