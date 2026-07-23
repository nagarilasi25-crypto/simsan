import React, { useState } from 'react';
import { School, ShieldCheck, Lock, Mail, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { loginWithEmail, loginAsRole, isLoading } = useAuth();
  const [email, setEmail] = useState('admin@simsan.id');
  const [password, setPassword] = useState('password123');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await loginWithEmail(email, password);
  };

  const rolePresets: { role: UserRole; name: string; email: string; desc: string }[] = [
    { role: 'super_admin', name: 'Super Admin / Pengelola', email: 'superadmin@simsan.id', desc: 'Akses Penuh Seluruh Fitur System' },
    { role: 'guru', name: 'Guru / Musyrif', email: 'guru@simsan.id', desc: 'Input Setoran Tahfidz & Absensi' },
    { role: 'bendahara', name: 'Bendahara', email: 'bendahara@simsan.id', desc: 'Kelola SPP, Syahriyah, & Keuangan' },
    { role: 'kepala_lembaga', name: 'Kepala Lembaga', email: 'kepala@simsan.id', desc: 'Monitoring Laporan & Eksekutif' },
    { role: 'orang_tua', name: 'Orang Tua', email: 'orangtua@simsan.id', desc: 'Portal Monitoring Santri & SPP' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Decorative Ripples */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-4xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side: Branding */}
        <div className="p-8 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-emerald-800/50">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-950/50">
                <School className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-200 via-teal-100 to-emerald-400 bg-clip-text text-transparent">
                  SIMSAN
                </h1>
                <p className="text-[10px] text-emerald-300 font-semibold tracking-wider uppercase">
                  Sistem Informasi Manajemen Santri
                </p>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-emerald-300 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Enterprise NISN Pesantren</span>
              </div>
              <h2 className="text-2xl font-bold leading-tight">
                Sistem Informasi Induk Pesantren & Rumah Tahfidz
              </h2>
              <p className="text-xs text-emerald-200/80 leading-relaxed">
                Kelola data santri terpusat dengan penerbitan NIS otomatis unik, pendaftaran multi-jenjang, kartu santri PVC, pencatatan hafalan Al-Qur'an, absensi QR Code, dan keuangan terpadu.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-emerald-800/50 text-[11px] text-emerald-300/80 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Terlindungi dengan Role Based Access Control (RBAC) & Firebase Security Rules</span>
          </div>
        </div>

        {/* Right Side: Login Form & Role Switcher */}
        <div className="p-8 space-y-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Masuk ke Sistem</h2>
            <p className="text-xs text-slate-400 mt-1">Gunakan akun terdaftar atau pilih role simulasi di bawah</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Email Pengguna</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="nama@simsan.id"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Kata Sandi</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950/50 transition-all"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Role Switcher Demo Pills */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Simulasi Cepat Role RBAC:
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              {rolePresets.map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => loginAsRole(r.role)}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 font-semibold text-left truncate flex items-center justify-between"
                  title={r.desc}
                >
                  <span className="truncate">{r.name}</span>
                  <Check className="w-3 h-3 text-emerald-400 shrink-0 opacity-60" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
