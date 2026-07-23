import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SantriProvider } from './contexts/SantriContext';
import { DashboardLayout } from './layouts/DashboardLayout';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { SantriPage } from './pages/SantriPage';
import { MasterDataPage } from './pages/MasterDataPage';
import { TahfidzPage } from './pages/TahfidzPage';
import { AbsensiPage } from './pages/AbsensiPage';
import { PembayaranPage } from './pages/PembayaranPage';
import { LaporanPage } from './pages/LaporanPage';
import { SettingsPage } from './pages/SettingsPage';
import { SantriFormModal } from './components/santri/SantriFormModal';

function MainApp() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 animate-pulse">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center font-bold text-lg">
            SIMSAN
          </div>
          <p className="text-xs text-slate-400">Memuat Sistem Informasi Manajemen Santri...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <DashboardLayout currentTab={currentTab} onSelectTab={setCurrentTab}>
      {currentTab === 'dashboard' && (
        <DashboardPage
          onSelectTab={setCurrentTab}
          onOpenAddSantri={() => setIsQuickAddOpen(true)}
        />
      )}

      {currentTab === 'santri' && <SantriPage />}
      {currentTab === 'master' && <MasterDataPage />}
      {currentTab === 'tahfidz' && <TahfidzPage />}
      {currentTab === 'absensi' && <AbsensiPage />}
      {currentTab === 'pembayaran' && <PembayaranPage />}
      {currentTab === 'laporan' && <LaporanPage />}
      {currentTab === 'settings' && <SettingsPage />}

      {/* Global Quick Add Santri Modal */}
      <SantriFormModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
      />
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SantriProvider>
        <MainApp />
      </SantriProvider>
    </AuthProvider>
  );
}
