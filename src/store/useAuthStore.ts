import { create } from 'zustand';
import { dbService, INITIAL_VKU_ACCOUNTS } from '../services/dbService';
import { UserAccount, UserProfile } from '../types';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  initAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (accountData: Omit<UserAccount, 'id'>) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updated: UserProfile) => Promise<void>;
  loginAsDemoUser: (index: number) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  initAuth: async () => {
    try {
      set({ isLoading: true });
      const sessionUser = await dbService.getCurrentSession();
      if (sessionUser) {
        set({ user: sessionUser, isAuthenticated: true, isLoading: false });
      } else {
        // Auto sign in as the first demo student so users can explore immediately
        const defaultUser = INITIAL_VKU_ACCOUNTS[0];
        await dbService.saveSession(defaultUser);
        const { passwordHash, ...profile } = defaultUser;
        set({ user: profile, isAuthenticated: true, isLoading: false });
      }
    } catch (e) {
      console.error('initAuth error:', e);
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const result = await dbService.loginUser(email, password);
      if (result.success && result.user) {
        set({ user: result.user, isAuthenticated: true, isLoading: false });
        return { success: true };
      }
      set({ isLoading: false });
      return { success: false, message: result.message || 'Đăng nhập không thành công.' };
    } catch (e: any) {
      set({ isLoading: false });
      return { success: false, message: e?.message || 'Lỗi kết nối cơ sở dữ liệu.' };
    }
  },

  register: async (accountData) => {
    set({ isLoading: true });
    try {
      const result = await dbService.registerUser(accountData);
      if (result.success && result.user) {
        set({ user: result.user, isAuthenticated: true, isLoading: false });
        return { success: true };
      }
      set({ isLoading: false });
      return { success: false, message: result.message || 'Đăng ký không thành công.' };
    } catch (e: any) {
      set({ isLoading: false });
      return { success: false, message: e?.message || 'Lỗi lưu thông tin tài khoản.' };
    }
  },

  logout: async () => {
    try {
      await dbService.clearSession();
      set({ user: null, isAuthenticated: false });
    } catch (e) {
      console.error('logout error:', e);
      set({ user: null, isAuthenticated: false });
    }
  },

  updateProfile: async (updated) => {
    await dbService.updateProfile(updated);
    set({ user: updated });
  },

  loginAsDemoUser: async (index: number) => {
    const target = INITIAL_VKU_ACCOUNTS[index] || INITIAL_VKU_ACCOUNTS[0];
    await dbService.saveSession(target);
    const { passwordHash, ...profile } = target;
    set({ user: profile, isAuthenticated: true });
    return true;
  }
}));
