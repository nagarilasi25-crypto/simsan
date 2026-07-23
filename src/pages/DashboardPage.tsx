import React from 'react';
import { 
  Users, 
  UserCheck, 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Sparkles, 
  Plus, 
  QrCode, 
  CreditCard, 
  FileText, 
  TrendingUp,
  Award,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useSantri } from '../contexts/SantriContext';
import { useAuth } from '../contexts/AuthContext';

interface DashboardPageProps {
  onSelectTab: (tab: string) => void;
  onOpenAddSantri: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onSelectTab, onOpenAddSantri }) => {
  const { santriList, settings, auditLogs } = useSantri();
  const { user } = useAuth();

  const totalSantri = santriList.length;
  const santriAktif = santriList.filter(s => s.status === 'Aktif').length;
  const santriAlumni = santriList.filter(s => s.status === 'Alumni').length;
  const santriBaru = santriList.filter(s => s.nis.includes('2026')).length;

  // Chart Data Calculations
  const jenjangCounts: Record<string, number> = {
    'Pesantren': 0,
    'Tahfidz': 0,
    'TPQ': 0,
    'Madrasah': 0
  };

  santriList.forEach(s => {
    if (s.jenjang.includes('Pesantren')) jenjangCounts['Pesantren']++;
    else if (s.jenjang.includes('Tahfidz')) jenjangCounts['Tahfidz']++;
    else if (s.jenjang.includes('TPQ')) jenjangCounts['TPQ']++;
    else jenjangCounts['Madrasah']++;
  });

  const jenjangChartData = [
    { name: 'Pondok Pesantren', value: jenjangCounts['Pesantren'] || 1, color: '#10b981' },
    { name: 'Rumah Tahfidz', value: jenjangCounts['Tahfidz'] || 1, color: '#14b8a6' },
    { name: 'TPQ Al-Qur\'an', value: jenjangCounts['TPQ'] || 1, color: '#3b82f6' },
    { name: 'Madrasah Diniyah', value: jenjangCounts['Madrasah'] || 1, color: '#8b5cf6' },
  ];

  const tahfidzProgressData = [
    { bulan: 'Jan', setoranJuz: 120, murajaah: 340 },
    { bulan: 'Feb', setoranJuz: 145, murajaah: 390 },
    { bulan: 'Mar', setoranJuz: 180, murajaah: 420 },
    { bulan: 'Apr', setoranJuz: 210, murajaah: 460 },
    { bulan: 'Mei', setoranJuz: 250, murajaah: 510 },
    { bulan: 'Jun', setoranJuz: 290, murajaah: 580 },
    { bulan: 'Jul', setoranJuz: 340, murajaah: 630 },
  ];

  const absensiData = [
    { hari: 'Sen', Hadir: 98, Izin: 2, Sakit: 0, Alpa: 0 },
    { hari: 'Sel', Hadir: 96, Izin: 3, Sakit: 1, Alpa: 0 },
    { hari: 'Rab', Hadir: 99, Izin: 1, Sakit: 0, Alpa: 0 },
    { hari: 'Kam', Hadir: 97, Izin: 2, Sakit: 1, Alpa: 0 },
    { hari: 'Jum', Hadir: 100, Izin: 0, Sakit: 0, Alpa: 0 },
    { hari: 'Sab', Hadir: 95, Izin: 4, Sakit: 1, Alpa: 0 },
  ];

  const pembayaranData = [
    { bulan: 'Jan', lunas: 92, tunggakan: 8 },
    { bulan: 'Feb', lunas: 94, tunggakan: 6 },
    { bulan: 'Mar', lunas: 90, tunggakan: 10 },
    { bulan: 'Apr', lunas: 96, tunggakan: 4 },
    { bulan: 'Mei', lunas: 95, tunggakan: 5 },
    { bulan: 'Jun', lunas: 98, tunggakan: 2 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="p-6 bg-emerald-900 text-white rounded-xl shadow-md relative overflow-hidden border border-emerald-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800 rounded-md text-xs font-semibold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sistem Informasi Induk Santri (SIMSAN)</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Selamat Datang, {user?.displayName}!
            </h1>
            <p className="text-xs text-emerald-100 max-w-xl">
              Panel Pengendalian Induk {settings.namaLembaga}. Kelola data santri, penerbitan NIS otomatis, tahfidz, absensi QR Code, dan keuangan terpadu.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenAddSantri}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Santri Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Total Santri</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-slate-800">{totalSantri}</h3>
            <span className="text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-0.5 rounded">Terdaftar</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Santri Aktif</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-emerald-700">{santriAktif}</h3>
            <span className="text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-0.5 rounded">{Math.round((santriAktif / (totalSantri || 1)) * 100)}%</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Santri Baru</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-slate-800">{santriBaru}</h3>
            <span className="text-slate-400 text-xs">Angkatan 2026</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Total Guru</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-slate-800">18</h3>
            <span className="text-slate-400 text-xs">Musyrif</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Halaqah Qur'an</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-slate-800">12</h3>
            <span className="text-slate-400 text-xs font-medium">Kelompok</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Alumni</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-slate-800">{santriAlumni}</h3>
            <span className="text-slate-400 text-xs">Khatam</span>
          </div>
        </div>

      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Distribusi Santri per Jenjang */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-800">Statistik Santri per Jenjang</h3>
              <p className="text-[11px] text-slate-500">Komposisi santri di Pesantren, Rumah Tahfidz, TPQ & Madrasah</p>
            </div>
            <button onClick={() => onSelectTab('santri')} className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1">
              <span>Detail</span> <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jenjangChartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {jenjangChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Progress Tahfidz Al-Qur'an */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-800">Tren Hafalan & Murajaah Santri</h3>
              <p className="text-[11px] text-slate-500">Rekapitulasi setoran hafalan baru dan murajaah harian</p>
            </div>
            <button onClick={() => onSelectTab('tahfidz')} className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1">
              <span>Detail Tahfidz</span> <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tahfidzProgressData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="setoranJuz" stroke="#059669" strokeWidth={2.5} name="Setoran Hafalan" />
                <Line type="monotone" dataKey="murajaah" stroke="#2563eb" strokeWidth={2} strokeDasharray="5 5" name="Murajaah" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Quick Actions & Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Action Buttons */}
        <div className="lg:col-span-1 p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-3">
            Aksi Cepat
          </h3>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={onOpenAddSantri}
              className="w-full flex items-center gap-3 p-3 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200/80 rounded-xl text-xs font-bold transition-all text-left"
            >
              <div className="p-2 rounded-lg bg-emerald-600 text-white font-bold shrink-0">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <div>Tambah Santri & NIS</div>
                <div className="text-[10px] text-emerald-700 font-normal">Penerbitan NIS Otomatis</div>
              </div>
            </button>

            <button
              onClick={() => onSelectTab('santri')}
              className="w-full flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-xl text-xs font-bold transition-all text-left"
            >
              <div className="p-2 rounded-lg bg-slate-700 text-white font-bold shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div>Cetak Kartu Santri</div>
                <div className="text-[10px] text-slate-500 font-normal">Cetak kartu fisik dengan QR</div>
              </div>
            </button>

            <button
              onClick={() => onSelectTab('absensi')}
              className="w-full flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-xl text-xs font-bold transition-all text-left"
            >
              <div className="p-2 rounded-lg bg-emerald-700 text-white font-bold shrink-0">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <div>Scan Absensi QR Code</div>
                <div className="text-[10px] text-slate-500 font-normal">Kehadiran santri otomatis</div>
              </div>
            </button>
          </div>
        </div>

        {/* Audit Log Activity Feed */}
        <div className="lg:col-span-2 p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-800">Audit Log & Aktivitas Terakhir</h3>
              <p className="text-[11px] text-slate-500">Jejak rekam aktivitas admin, guru, dan sistem SIMSAN</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-mono font-medium">
              Realtime
            </span>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3 text-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{log.action}</span>
                    <span className="text-[10px] text-slate-400">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-slate-600 font-medium truncate">{log.target}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Oleh: {log.userName} ({log.role.replace('_', ' ')})</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
