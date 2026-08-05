"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  loginWithGoogle: () => {},
  loginWithEmail: () => {},
  registerWithEmail: () => {},
  logout: () => {},
  showAuthModal: false,
  setShowAuthModal: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user session from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ata_takvimi_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user:', e);
      }
    }
    setLoading(false);
  }, []);

  const saveUserSession = (userData) => {
    setUser(userData);
    localStorage.setItem('ata_takvimi_user', JSON.stringify(userData));
    window.dispatchEvent(new Event('storage'));
  };

  // 1. Google OAuth / One-Tap & Direct Google Sign-In
  const loginWithGoogle = async (googleData = null) => {
    let googleUser;

    if (googleData && googleData.email) {
      googleUser = {
        id: googleData.sub || `google-${Date.now()}`,
        name: googleData.name || googleData.email.split('@')[0],
        email: googleData.email,
        avatar: googleData.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(googleData.email)}`,
        provider: 'google',
        createdAt: new Date().toISOString()
      };
    } else {
      // Direct Google Auth Helper
      const randomId = Math.floor(Math.random() * 10000);
      googleUser = {
        id: `google-${Date.now()}`,
        name: 'Google Kullanıcısı',
        email: `kullanici${randomId}@gmail.com`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=GoogleUser${randomId}`,
        provider: 'google',
        createdAt: new Date().toISOString()
      };
    }

    saveUserSession(googleUser);
    setShowAuthModal(false);
    return googleUser;
  };

  // 2. Email & Password Login
  const loginWithEmail = (email, password) => {
    if (!email || !password) throw new Error('E-posta ve şifre gereklidir.');
    const namePart = email.split('@')[0];
    const emailUser = {
      id: `user-${Date.now()}`,
      name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      provider: 'email',
      createdAt: new Date().toISOString()
    };

    saveUserSession(emailUser);
    setShowAuthModal(false);
    return emailUser;
  };

  // 3. Email Registration
  const registerWithEmail = (name, email, password) => {
    if (!name || !email || !password) throw new Error('Tüm alanları doldurunuz.');
    const newUser = {
      id: `user-${Date.now()}`,
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      provider: 'email',
      createdAt: new Date().toISOString()
    };

    saveUserSession(newUser);
    setShowAuthModal(false);
    return newUser;
  };

  // 4. Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('ata_takvimi_user');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        showAuthModal,
        setShowAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
