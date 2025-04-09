import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => void;
  logout: () => void;
}

// Load current user from localStorage
const loadCurrentUserFromLocalStorage = (): { isAuthenticated: boolean; user: string | null } => {
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? { isAuthenticated: true, user: storedUser } : { isAuthenticated: false, user: null };
};

const useAuthStore = create<AuthState>((set) => ({
  ...loadCurrentUserFromLocalStorage(), // Initialize with localStorage data
  login: (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', email); // Persist current user
      set({ isAuthenticated: true, user: email });
      return true;
    }
    return false;
  },
  signup: (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users)); // Save updated user list
  },
  logout: () => {
    localStorage.removeItem('currentUser'); // Clear current user, keep todos intact
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
