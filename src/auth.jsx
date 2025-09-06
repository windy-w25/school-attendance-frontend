import { createContext, useContext, useState } from 'react';
import { api } from './api';  

const AuthCtx = createContext(null);

export function AuthProvider({children}) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  const login = async (email, password) => {
    const { data } = await api.post('/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      console.warn("Logout error:", e.response?.data || e.message);
    }
    localStorage.clear();
    setUser(null);
    window.location.href = '/login';   // 👈 redirect to login
  };
  
  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
