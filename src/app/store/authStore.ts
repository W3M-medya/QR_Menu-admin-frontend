import { create } from "zustand";
import Cookies from "js-cookie";

interface User {
  id: string;
  username: string;
  email?: string;
  role: string;
  name?: string;
  lastname?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  loadFromStorage: () => void;
}

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return !payload?.exp || payload.exp < currentTime;
}

let logoutTimer: NodeJS.Timeout | null = null;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: (user, token) => {
    const payload = parseJwt(token);
    if (!payload?.exp) return;

    // Token'ı sakla
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    Cookies.set("token", token, { expires: 7 }); // cookie 7 gün saklansın

    // Logout timer ayarla
    const expiresInMs = (payload.exp * 1000) - Date.now();
    if (logoutTimer) clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      useAuthStore.getState().logout();
    }, expiresInMs);

    set({ user, token });
  },

  logout: () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (logoutTimer) clearTimeout(logoutTimer);
    logoutTimer = null;
    set({ user: null, token: null });
  },

  loadFromStorage: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        Cookies.remove("token");
        return;
      }

      const payload = parseJwt(token);
      const expiresInMs = (payload.exp * 1000) - Date.now();
      if (logoutTimer) clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        useAuthStore.getState().logout();
      }, expiresInMs);

      set({ token, user: JSON.parse(user) });
    }
  },
}));
