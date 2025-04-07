import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      set({ isAuthenticated: true, user: email });
      return true;
    }
    return false;
  },
  signup: (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;