import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, RolePermissions } from '../types';
import { SAMPLE_USERS, DEFAULT_ROLE_PERMISSIONS } from '../utils/mockData';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  rolePermissions: Record<UserRole, RolePermissions>;
  updateRolePermission: (role: UserRole, permissionKey: keyof RolePermissions, value: boolean) => void;
  resetRolePermissions: () => void;
  loginAsRole: (role: UserRole) => void;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'simsan_current_user';
const PERMISSIONS_STORAGE_KEY = 'simsan_role_permissions';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rolePermissions, setRolePermissions] = useState<Record<UserRole, RolePermissions>>(() => {
    try {
      const saved = localStorage.getItem(PERMISSIONS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_ROLE_PERMISSIONS;
    } catch {
      return DEFAULT_ROLE_PERMISSIONS;
    }
  });

  useEffect(() => {
    // Load saved user or default to Super Admin for seamless preview
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        // Fallback if legacy admin role saved
        if (parsed.role === 'admin') {
          parsed.role = 'super_admin';
        }
        setUser(parsed);
      } else {
        // Default initialized user as Super Admin
        const defaultUser = SAMPLE_USERS[0];
        setUser(defaultUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(defaultUser));
      }
    } catch (e) {
      console.error('Failed to parse saved user state:', e);
      setUser(SAMPLE_USERS[0]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateRolePermission = (role: UserRole, permissionKey: keyof RolePermissions, value: boolean) => {
    const updated = {
      ...rolePermissions,
      [role]: {
        ...rolePermissions[role],
        [permissionKey]: value
      }
    };
    setRolePermissions(updated);
    localStorage.setItem(PERMISSIONS_STORAGE_KEY, JSON.stringify(updated));
  };

  const resetRolePermissions = () => {
    setRolePermissions(DEFAULT_ROLE_PERMISSIONS);
    localStorage.setItem(PERMISSIONS_STORAGE_KEY, JSON.stringify(DEFAULT_ROLE_PERMISSIONS));
  };

  const loginAsRole = (role: UserRole) => {
    const foundUser = SAMPLE_USERS.find(u => u.role === role) || SAMPLE_USERS[0];
    setUser(foundUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(foundUser));
  };

  const loginWithEmail = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 500));
    
    const matched = SAMPLE_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setUser(matched);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(matched));
      setIsLoading(false);
      return true;
    }
    
    const newUser: UserProfile = {
      uid: `u-${Date.now()}`,
      email,
      displayName: email.split('@')[0],
      role: 'super_admin',
      status: 'active'
    };
    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const hasPermission = (allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        rolePermissions,
        updateRolePermission,
        resetRolePermissions,
        loginAsRole,
        loginWithEmail,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
