import React from 'react';
import { X, QrCode, CreditCard, Edit3, Phone, MapPin, School, User, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { Santri } from '../../types';
import { useSantri } from '../../contexts/SantriContext';

interface SantriDetailModalProps {
  santri: Santri | null;
  onClose: () => void;
  onEdit: (s: Santri) => void;
  onViewCard: (s: Santri) => void;
  onViewQR: (s: Santri) => void;
}

export const SantriDetailModal: React.FC<SantriDetailModalProps> = ({
  santri,
  onClose,
  onEdit,
  onViewCard,
  onViewQR
}) => {
  if (!santri) return null;

  const statusColors = {
    'Aktif': 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    'Non-Aktif': 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300',
    'Alumni': 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    'Cuti': 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    'Mutasi': 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
        
        {/* Banner Header */}
        <div className="h-32 bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 relative p-6 flex items-end justify-between">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 translate-y-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-extrabold text-2xl border-4 border-white dark:border-slate-900 shadow-xl shrink-0">
              {santri.nama.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full border ${statusColors[santri.status]}`}>
                  {santri.status}
                </span>
                <span className="text-xs font-semibold text-emerald-200 bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-md">
                  {santri.jenjang}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white drop-shadow-md">{santri.nama}</h2>
              <p className="text-xs font-mono font-semibold text-emerald-300">NIS: {santri.nis}</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="pt-12 p-6 space-y-6 text-xs">
          
          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center justify-end gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <button
              onClick={() => onViewCard(santri)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-sm"
            >
              <CreditCard className="w-4 h-4" />
              <span>Kartu Santri PVC</span>
            </button>
            <button
              onClick={() => onViewQR(santri)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white font-semibold rounded-xl transition-all"
            >
              <QrCode className="w-4 h-4" />
              <span>Lihat QR Code</span>
            </button>
            <button
              onClick={() => onEdit(santri)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Biodata</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Personal Data Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                <User className="w-4 h-4 text-emerald-600" />
                Data Identitas
              </h3>
              <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <div className="flex justify-between"><span className="text-slate-400">NIK:</span> <span className="font-mono font-semibold text-slate-800 dark:text-slate-100">{santri.nik || '-'}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">No KK:</span> <span className="font-mono font-semibold text-slate-800 dark:text-slate-100">{santri.noKK || '-'}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Jenis Kelamin:</span> <span className="font-semibold text-slate-800 dark:text-slate-100">{santri.jenisKelamin === 'L' ? 'Laki-Laki (Ikhwan)' : 'Perempuan (Akhwat)'}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Tempat / Tgl Lahir:</span> <span className="font-semibold text-slate-800 dark:text-slate-100">{santri.tempatLahir}, {santri.tanggalLahir}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Nama Panggilan:</span> <span className="font-semibold text-slate-800 dark:text-slate-100">{santri.namaPanggilan || '-'}</span></div>
              </div>
            </div>

            {/* Academic & Halaqah Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                <School className="w-4 h-4 text-emerald-600" />
                Data Akademik & Halaqah
              </h3>
              <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <div className="flex justify-between"><span className="text-slate-400">Jenjang:</span> <span className="font-semibold text-emerald-600 dark:text-emerald-400">{santri.jenjang}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Kelas:</span> <span className="font-semibold text-slate-800 dark:text-slate-100">{santri.kelas}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Halaqah Al-Qur'an:</span> <span className="font-semibold text-teal-600 dark:text-teal-400">{santri.halaqah}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Guru Pembimbing:</span> <span className="font-semibold text-slate-800 dark:text-slate-100">{santri.guruPembimbing}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Tanggal Masuk:</span> <span className="font-semibold text-slate-800 dark:text-slate-100">{santri.tanggalMasuk}</span></div>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Alamat Domisili
              </h3>
              <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <p className="font-semibold text-slate-800 dark:text-slate-100">{santri.alamat}</p>
                <div className="flex justify-between"><span className="text-slate-400">Jorong:</span> <span className="font-semibold text-slate-800 dark:text-slate-100">{santri.jorong}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Nagari / Desa:</span> <span className="font-semibold text-slate-800 dark:text-slate-100">{santri.nagari}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Kecamatan:</span> <span className="font-semibold text-slate-800 dark:text-slate-100">{santri.kecamatan}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Kabupaten / Prov:</span> <span className="font-semibold text-slate-800 dark:text-slate-100">{santri.kabupaten}, {santri.provinsi}</span></div>
              </div>
            </div>

            {/* Parent Info Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                Orang Tua & Kontak
              </h3>
              <div className="space-y-2 text-slate-600 dark:text-slate-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-400 text-[10px]">Ayah Kandung</p>
                    <p className="font-bold text-slate-800 dark:text-slate-100">{santri.namaAyah || '-'}</p>
                  </div>
                  {santri.hpAyah && (
                    <a
                      href={`https://wa.me/${santri.hpAyah.replace(/^0/, '62')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-emerald-700"
                    >
                      <Phone className="w-3 h-3" /> WhatsApp
                    </a>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-400 text-[10px]">Ibu Kandung</p>
                    <p className="font-bold text-slate-800 dark:text-slate-100">{santri.namaIbu || '-'}</p>
                  </div>
                  {santri.hpIbu && (
                    <a
                      href={`https://wa.me/${santri.hpIbu.replace(/^0/, '62')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-emerald-700"
                    >
                      <Phone className="w-3 h-3" /> WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
