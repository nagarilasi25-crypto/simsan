import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const TAB_LABELS: Record<string, string> = {
  dashboard: 'Dashboard Utama',
  santri: 'Data Induk Santri',
  master: 'Master Data Lembaga',
  tahfidz: 'Modul Tahfidz & Hafalan',
  absensi: 'Modul Absensi & Kehadiran',
  pembayaran: 'Modul Pembayaran & SPP',
  laporan: 'Rekap Laporan Enterprise',
  settings: 'Pengaturan System',
};

export const Breadcrumbs: React.FC<BreadcrumbProps> = ({ currentTab, onTabChange }) => {
  return (
    <nav className="flex items-center text-xs font-medium text-emerald-800/70 dark:text-slate-400 py-1">
      <button 
        onClick={() => onTabChange('dashboard')}
        className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>SIMSAN</span>
      </button>
      <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-300 dark:text-slate-600 shrink-0" />
      <span className="text-emerald-950 dark:text-slate-200 font-semibold">
        {TAB_LABELS[currentTab] || 'Halaman'}
      </span>
    </nav>
  );
};
