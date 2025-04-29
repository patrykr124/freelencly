import { create } from "zustand";

type User = {
  id: string;
  email: string;
  name?: string | null;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  init: () => void;
  isLoggout: boolean;
};

const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  token: null,
  isLoggout: false,

  login: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, isAuth: true, token, isLoggout: false });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, isAuth: false, token: null, isLoggout: true });
  },

  init: () => {
    const userJson = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (userJson && token) {
      set({ user: JSON.parse(userJson), isAuth: true, token });
    }
  },
}));

export default useAuth;
