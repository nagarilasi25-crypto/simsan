import { Santri, StatusSantri, JenjangPendidikan } from '../types';
import { SAMPLE_SANTRI } from '../utils/mockData';

const LOCAL_STORAGE_KEY = 'simsan_santri_db';
const SETTINGS_KEY = 'simsan_settings_db';

export function getLocalSantri(): Santri[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load santri from localStorage:', e);
  }
  // Default seed
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SAMPLE_SANTRI));
  return SAMPLE_SANTRI;
}

export function saveLocalSantri(data: Santri[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save santri to localStorage:', e);
  }
}

/**
 * Generate Next Automatic NIS (Nomor Induk Santri)
 * Format: [PREFIX]-[TAHUN]-[4_DIGIT_URUT]-[4_DIGIT_ACAK] (e.g. ARR-2026-0001-8392)
 */
export function generateAutoNIS(prefix: string = 'ARR', year?: number, existingList?: Santri[]): string {
  const currentYear = year || new Date().getFullYear();
  const list = existingList || getLocalSantri();
  
  const searchPattern = `${prefix}-${currentYear}-`;
  
  // Find all NIS matching the prefix and year
  const matchingSequenceNumbers: number[] = list
    .filter(s => s.nis.startsWith(searchPattern))
    .map(s => {
      const parts = s.nis.split('-');
      if (parts.length >= 3) {
        const num = parseInt(parts[2], 10);
        return isNaN(num) ? 0 : num;
      }
      return 0;
    });

  const maxSeq = matchingSequenceNumbers.length > 0 ? Math.max(...matchingSequenceNumbers) : 0;
  const nextSeq = maxSeq + 1;
  
  const paddedSeq = nextSeq.toString().padStart(4, '0');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4-digit random trailing number
  return `${prefix}-${currentYear}-${paddedSeq}-${randomSuffix}`;
}

export function generateRandomSuffixNIS(currentNis: string): string {
  const parts = currentNis.split('-');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  if (parts.length >= 3) {
    return `${parts[0]}-${parts[1]}-${parts[2]}-${randomSuffix}`;
  }
  return `${currentNis}-${randomSuffix}`;
}

export function validateNISUnique(nis: string, currentId?: string, list?: Santri[]): boolean {
  const santriList = list || getLocalSantri();
  return !santriList.some(s => s.nis.toLowerCase() === nis.toLowerCase() && s.id !== currentId);
}

export async function fetchSantriList(): Promise<Santri[]> {
  return getLocalSantri();
}

export async function createSantri(santriData: Omit<Santri, 'id' | 'createdAt' | 'updatedAt' | 'qrCodeData'>, prefix: string = 'ARR'): Promise<Santri> {
  const list = getLocalSantri();
  
  // Ensure NIS is generated if blank
  let nisToUse = santriData.nis;
  if (!nisToUse || nisToUse.trim() === '') {
    nisToUse = generateAutoNIS(prefix, new Date().getFullYear(), list);
  }
  
  // Ensure uniqueness
  if (!validateNISUnique(nisToUse, undefined, list)) {
    throw new Error(`Nomor Induk Santri (NIS) "${nisToUse}" sudah terdaftar dalam sistem.`);
  }

  const now = new Date().toISOString();
  const newSantri: Santri = {
    ...santriData,
    id: `santri-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    nis: nisToUse,
    qrCodeData: `SIMSAN:${nisToUse}:${santriData.nama}`,
    createdAt: now,
    updatedAt: now,
  };

  const updatedList = [newSantri, ...list];
  saveLocalSantri(updatedList);
  return newSantri;
}

export async function updateSantri(id: string, santriData: Partial<Santri>): Promise<Santri> {
  const list = getLocalSantri();
  const index = list.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error('Data santri tidak ditemukan.');
  }

  const existing = list[index];
  
  // Handle NIS update if provided (admin redeem or update)
  let nisToUse = existing.nis;
  if (santriData.nis && santriData.nis !== existing.nis) {
    if (!validateNISUnique(santriData.nis, id, list)) {
      throw new Error(`NIS / Kode Redeem "${santriData.nis}" sudah digunakan oleh santri lain.`);
    }
    nisToUse = santriData.nis;
  }

  const updated: Santri = {
    ...existing,
    ...santriData,
    nis: nisToUse,
    qrCodeData: `SIMSAN:${nisToUse}:${santriData.nama || existing.nama}`,
    updatedAt: new Date().toISOString(),
  };

  list[index] = updated;
  saveLocalSantri(list);
  return updated;
}

export async function deleteSantri(id: string): Promise<boolean> {
  const list = getLocalSantri();
  const filtered = list.filter(s => s.id !== id);
  if (filtered.length === list.length) {
    return false;
  }
  saveLocalSantri(filtered);
  return true;
}
