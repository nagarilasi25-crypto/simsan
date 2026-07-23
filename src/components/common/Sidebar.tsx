import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  BookOpen, 
  Building2, 
  QrCode, 
  CreditCard, 
  FileText, 
  Settings, 
  ShieldCheck, 
  GraduationCap, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  School,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSantri } from '../../contexts/SantriContext';
import { UserRole } from '../../types';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
  allowedRoles?: UserRole[];
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab, isOpen, onToggleOpen }) => {
  const { user, logout, hasPermission } = useAuth();
  const { santriList, settings } = useSantri();

  const totalActive = santriList.filter(s => s.status === 'Aktif').length;

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard Utama',
      icon: <LayoutDashboard className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'santri',
      label: 'Data Induk Santri',
      icon: <Users className="w-5 h-5 shrink-0" />,
      badge: totalActive,
    },
    {
      id: 'master',
      label: 'Master Data',
      icon: <Building2 className="w-5 h-5 shrink-0" />,
      allowedRoles: ['super_admin', 'kepala_lembaga'],
    },
    {
      id: 'tahfidz',
      label: 'Tahfidz & Hafalan',
      icon: <BookOpen className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'absensi',
      label: 'Absensi & QR Scan',
      icon: <QrCode className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'pembayaran',
      label: 'Keuangan & SPP',
      icon: <CreditCard className="w-5 h-5 shrink-0" />,
      allowedRoles: ['super_admin', 'bendahara', 'kepala_lembaga', 'orang_tua'],
    },
    {
      id: 'laporan',
      label: 'Laporan & Rekap',
      icon: <FileText className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'settings',
      label: 'Pengaturan System',
      icon: <Settings className="w-5 h-5 shrink-0" />,
      allowedRoles: ['super_admin'],
    },
  ];

  const roleLabels: Record<UserRole, { label: string; color: string }> = {
    super_admin: { label: 'Super Admin', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    guru: { label: 'Guru / Ustadz', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    bendahara: { label: 'Bendahara', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    kepala_lembaga: { label: 'Kepala Lembaga', color: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
    orang_tua: { label: 'Orang Tua Santri', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-emerald-900 text-white border-r border-emerald-800 transition-all duration-300 flex flex-col justify-between ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Sidebar Header */}
      <div>
        <div className="flex items-center justify-between p-5 border-b border-emerald-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-emerald-400 text-emerald-900 flex items-center justify-center font-extrabold text-sm shrink-0 shadow-sm">
              S
            </div>
            {isOpen && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-lg tracking-tight text-white truncate">
                  SIMSAN
                </span>
                <span className="text-[10px] text-emerald-300 font-medium truncate">
                  {settings.prefixNis} • Sistem NIS Santri
                </span>
              </div>
            )}
          </div>
          <button
            onClick={onToggleOpen}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors shrink-0"
            title={isOpen ? 'Ciutkan Sidebar' : 'Perluas Sidebar'}
          >
            {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        {/* User Info Badge */}
        {isOpen && user && (
          <div className="p-3 mx-3 my-3 bg-emerald-850/80 bg-emerald-950/40 border border-emerald-800 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-400 text-emerald-950 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-300">
              {user.displayName.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-white truncate">{user.displayName}</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${roleLabels[user.role].color}`}>
                  {roleLabels[user.role].label}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
          {menuItems.map((item) => {
            // Check RBAC permission
            if (item.allowedRoles && !hasPermission(item.allowedRoles)) {
              return null;
            }

            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-800 text-emerald-50 font-semibold shadow-sm'
                    : 'text-emerald-100 hover:bg-emerald-800/70 hover:text-white'
                }`}
                title={!isOpen ? item.label : undefined}
              >
                <div className={isActive ? 'text-emerald-300' : 'text-emerald-300/70'}>
                  {item.icon}
                </div>
                {isOpen && <span className="truncate flex-1 text-left">{item.label}</span>}
                {isOpen && item.badge !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                    isActive ? 'bg-emerald-700 text-white' : 'bg-emerald-950/80 text-emerald-300 border border-emerald-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-emerald-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-200 hover:bg-emerald-800 hover:text-white transition-colors"
          title={!isOpen ? 'Keluar' : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {isOpen && <span>Keluar System</span>}
        </button>
      </div>
    </aside>
  );
};
