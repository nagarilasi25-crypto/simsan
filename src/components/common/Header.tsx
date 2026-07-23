import React, { useState } from 'react';
import { Search, Bell, User, Calendar, Shield, ChevronDown, Check, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSantri } from '../../contexts/SantriContext';
import { Breadcrumbs } from './Breadcrumbs';
import { UserRole } from '../../types';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, isSidebarOpen }) => {
  const { user, loginAsRole, logout } = useAuth();
  const { filters, setFilters, settings } = useSantri();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const rolesList: { role: UserRole; name: string }[] = [
    { role: 'super_admin', name: 'Super Admin / Pengelola' },
    { role: 'guru', name: 'Guru / Ustadz' },
    { role: 'bendahara', name: 'Bendahara' },
    { role: 'kepala_lembaga', name: 'Kepala Lembaga' },
    { role: 'orang_tua', name: 'Orang Tua' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Breadcrumbs & Page Info */}
        <div className="flex flex-col">
          <Breadcrumbs currentTab={currentTab} onTabChange={onSelectTab} />
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">
            {settings.namaLembaga}
          </h1>
        </div>

        {/* Right: Controls, Quick Search & Role Switcher */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Quick Search Input */}
          <div className="relative flex-1 sm:w-64 max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari Santri / NIS / NIK..."
              value={filters.search}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, search: e.target.value }));
                if (currentTab !== 'santri' && e.target.value.trim() !== '') {
                  onSelectTab('santri');
                }
              }}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Academic Year Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>T.A. {settings.tahunAjaranAktif}</span>
          </div>

          {/* Quick RBAC Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Role: {user?.role ? user.role.replace('_', ' ').toUpperCase() : 'SELECT'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] uppercase font-extrabold text-slate-400">
                  Simulasi Dual-Role RBAC
                </div>
                {rolesList.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      loginAsRole(r.role);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      user?.role === r.role ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-700'
                    }`}
                  >
                    <span>{r.name}</span>
                    {user?.role === r.role && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
