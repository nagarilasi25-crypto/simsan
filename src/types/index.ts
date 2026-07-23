export type UserRole = 
  | 'super_admin' 
  | 'guru' 
  | 'bendahara' 
  | 'kepala_lembaga' 
  | 'orang_tua';

export interface RolePermissions {
  canManageSantri: boolean;
  canManageMasterData: boolean;
  canInputTahfidz: boolean;
  canInputAbsensi: boolean;
  canManageKeuangan: boolean;
  canManageSettings: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  lembagaId?: string;
  avatarUrl?: string;
  phone?: string;
  status: 'active' | 'inactive';
}

export type JenisKelamin = 'L' | 'P';

export type StatusSantri = 'Aktif' | 'Non-Aktif' | 'Alumni' | 'Cuti' | 'Mutasi';

export type JenjangPendidikan = 'TPQ' | 'Madrasah Diniyah' | 'Rumah Tahfidz' | 'Pondok Pesantren';

export interface Santri {
  id: string;
  nis: string; // e.g. ARR-2026-000001
  nik: string;
  noKK: string;
  nama: string;
  namaPanggilan?: string;
  jenisKelamin: JenisKelamin;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  jorong: string;
  nagari: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
  foto?: string;
  status: StatusSantri;
  tanggalMasuk: string;
  asalSekolah: string;
  jenjang: JenjangPendidikan;
  kelas: string;
  halaqah: string;
  guruPembimbing: string;
  catatan?: string;
  
  // Data Orang Tua / Wali
  namaAyah: string;
  nikAyah?: string;
  pendidikanAyah?: string;
  pekerjaanAyah?: string;
  hpAyah: string;
  
  namaIbu: string;
  nikIbu?: string;
  pendidikanIbu?: string;
  pekerjaanIbu?: string;
  hpIbu: string;
  
  namaWali?: string;
  hubunganWali?: string;
  hpWali?: string;
  
  qrCodeData: string;
  createdAt: string;
  updatedAt: string;
}

export interface Guru {
  id: string;
  nip: string;
  nama: string;
  jenisKelamin: JenisKelamin;
  email: string;
  noHp: string;
  jabatan: string;
  status: 'Aktif' | 'Non-Aktif';
  halaqahAjar: string[];
}

export interface Halaqah {
  id: string;
  namaHalaqah: string;
  guruId: string;
  namaGuru: string;
  jumlahSantri: number;
  lokasi: string;
  tingkat: string;
}

export interface Kelas {
  id: string;
  namaKelas: string;
  jenjang: JenjangPendidikan;
  waliKelas: string;
  jumlahSantri: number;
}

export interface WilayahOption {
  kecamatan: string[];
  nagari: Record<string, string[]>; // kecamatan -> nagari array
  jorong: Record<string, string[]>; // nagari -> jorong array
}

export interface InstitutionSettings {
  namaLembaga: string;
  alamat: string;
  logoUrl?: string;
  prefixNis: string; // e.g. "ARR"
  tahunAjaranAktif: string; // e.g. "2025/2026"
  nomorSuratHeader: string;
  ttdDigitalUrl?: string;
  email: string;
  telepon: string;
  kota: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  role: UserRole;
  action: string;
  target: string;
  timestamp: string;
  details?: string;
}

export interface DashboardStats {
  totalSantri: number;
  santriAktif: number;
  santriBaru: number;
  totalGuru: number;
  totalHalaqah: number;
  totalAlumni: number;
}
