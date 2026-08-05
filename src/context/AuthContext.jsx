"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  loading: true,
  loginWithGoogle: () => {},
  loginWithEmail: () => {},
  registerWithEmail: () => {},
  logout: () => {},
  activateSubscription: () => {},
  cancelSubscription: () => {},
  hasActiveSubscription: false,
  isTrialActive: false,
  isAccessGranted: false,
  daysLeft: 0,
  showAuthModal: false,
  setShowAuthModal: () => {},
  showSubModal: false,
  setShowSubModal: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user session from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ata_takvimi_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
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

  // Helper to compute subscription / trial status
  const now = new Date();
  let hasActiveSubscription = false;
  let isTrialActive = false;
  let daysLeft = 0;

  if (user && user.subscription && user.subscription.active) {
    const expiresAt = user.subscription.expiresAt ? new Date(user.subscription.expiresAt) : null;
    if (expiresAt && expiresAt > now) {
      const diffMs = expiresAt.getTime() - now.getTime();
      daysLeft = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
      if (user.subscription.isTrial) {
        isTrialActive = true;
      } else {
        hasActiveSubscription = true;
      }
    }
  }

  const isAccessGranted = Boolean(user && (hasActiveSubscription || isTrialActive));

  // Check if trial has expired and trigger paywall modal
  useEffect(() => {
    if (user && !isAccessGranted && !loading) {
      setShowSubModal(true);
    }
  }, [user, isAccessGranted, loading]);

  // Activate Subscription (Paid ₺300 or Promo Code)
  const activateSubscription = (planName = 'Yıllık Ata Çiftçisi Paketi (₺300)', licenseCode = 'IYZICO-SUB') => {
    if (!user) {
      setShowAuthModal(true);
      return false;
    }

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1); // 1 Year

    const updatedUser = {
      ...user,
      subscription: {
        active: true,
        isTrial: false,
        planName: planName,
        licenseCode: licenseCode,
        activatedAt: new Date().toISOString(),
        expiresAt: expiryDate.toISOString()
      }
    };

    saveUserSession(updatedUser);
    setShowSubModal(false);
    return true;
  };

  // Cancel Subscription
  const cancelSubscription = () => {
    if (!user) return;
    const updatedUser = {
      ...user,
      subscription: {
        active: false,
        isTrial: false,
        planName: null,
        licenseCode: null,
        expiresAt: null
      }
    };
    saveUserSession(updatedUser);
  };

  // Create default 2-day trial structure
  const create2DayTrialSubscription = () => {
    const trialExpiry = new Date();
    trialExpiry.setDate(trialExpiry.getDate() + 2); // 2 Days Trial
    return {
      active: true,
      isTrial: true,
      planName: '2 Gün Ücretsiz Deneme Paketi',
      licenseCode: 'TRIAL-2-DAYS',
      activatedAt: new Date().toISOString(),
      expiresAt: trialExpiry.toISOString()
    };
  };

  // 1. Google OAuth Sign-In
  const loginWithGoogle = async (googleData = null) => {
    let googleUser;

    if (googleData && googleData.email) {
      googleUser = {
        id: googleData.sub || `google-${Date.now()}`,
        name: googleData.name || googleData.email.split('@')[0],
        email: googleData.email,
        avatar: googleData.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(googleData.email)}`,
        provider: 'google',
        createdAt: new Date().toISOString(),
        subscription: create2DayTrialSubscription()
      };
    } else {
      const randomId = Math.floor(Math.random() * 10000);
      googleUser = {
        id: `google-${Date.now()}`,
        name: 'Google Kullanıcısı',
        email: `kullanici${randomId}@gmail.com`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=GoogleUser${randomId}`,
        provider: 'google',
        createdAt: new Date().toISOString(),
        subscription: create2DayTrialSubscription()
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
      createdAt: new Date().toISOString(),
      subscription: create2DayTrialSubscription()
    };

    saveUserSession(emailUser);
    setShowAuthModal(false);
    return emailUser;
  };

  // 3. Email Registration (With 2-Day Trial)
  const registerWithEmail = (name, email, password) => {
    if (!name || !email) throw new Error('Tüm alanları doldurunuz.');
    const newUser = {
      id: `user-${Date.now()}`,
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      provider: 'email',
      createdAt: new Date().toISOString(),
      subscription: create2DayTrialSubscription()
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
        activateSubscription,
        cancelSubscription,
        hasActiveSubscription,
        isTrialActive,
        isAccessGranted,
        daysLeft,
        showAuthModal,
        setShowAuthModal,
        showSubModal,
        setShowSubModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
