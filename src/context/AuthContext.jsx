"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_NOTIFICATION_PREFS, checkAndTriggerDailyNotifications } from '../lib/notificationEngine';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { APP_CONFIG } from '../lib/config';

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
  isAdFree: false,
  isAccessGranted: true,
  daysLeft: 0,
  showAuthModal: false,
  setShowAuthModal: () => {},
  showSubModal: false,
  setShowSubModal: () => {},
  showNotificationModal: false,
  setShowNotificationModal: () => {},
  selectedCity: 'Konya',
  changeCity: () => {},
  showCityModal: false,
  setShowCityModal: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Konya');
  const [notificationPrefs, setNotificationPrefs] = useState(DEFAULT_NOTIFICATION_PREFS);
  const [loading, setLoading] = useState(true);

  // Initialize FCM Push Notifications on native platforms (Android/iOS)
  usePushNotifications();

  const changeCity = (city) => {
    if (!city) return;
    setSelectedCity(city);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ata_takvimi_city', city);
      window.dispatchEvent(new Event('storage'));
    }
  };

  // Load user session & notification preferences on mount
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

    const savedPrefs = localStorage.getItem('ata_takvimi_notif_prefs');
    if (savedPrefs) {
      try {
        setNotificationPrefs(JSON.parse(savedPrefs));
      } catch (e) {}
    }

    const savedCity = localStorage.getItem('ata_takvimi_city');
    if (savedCity) {
      setSelectedCity(savedCity);
    }

    const handleStorageChange = () => {
      const currentCity = localStorage.getItem('ata_takvimi_city');
      if (currentCity) setSelectedCity(currentCity);
    };

    window.addEventListener('storage', handleStorageChange);
    setLoading(false);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Trigger daily notification check on user load
  useEffect(() => {
    if (!loading) {
      const activeCity = localStorage.getItem('ata_takvimi_city') || selectedCity || 'Konya';
      let userNotes = [];
      try {
        userNotes = JSON.parse(localStorage.getItem('ata_takvimi_notes') || '[]');
      } catch (e) {}

      checkAndTriggerDailyNotifications(notificationPrefs, activeCity, userNotes);
    }
  }, [loading, notificationPrefs, selectedCity]);

  const updateNotificationPrefs = (newPrefs) => {
    setNotificationPrefs(newPrefs);
    localStorage.setItem('ata_takvimi_notif_prefs', JSON.stringify(newPrefs));
  };

  const sendServerNotification = async (event, userData) => {
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: event,
          userName: userData.name,
          userEmail: userData.email,
          planName: userData.subscription ? userData.subscription.planName : APP_CONFIG.subscription.planName,
          provider: userData.provider || 'email',
          date: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error('Failed to dispatch notification:', err);
    }
  };

  const saveUserSession = (userData, eventType = 'USER_SESSION') => {
    setUser(userData);
    localStorage.setItem('ata_takvimi_user', JSON.stringify(userData));
    window.dispatchEvent(new Event('storage'));
    sendServerNotification(eventType, userData);

    // 📊 Admin panelde abone tablosu için sunucu taraflı kullanıcı kaydı
    try {
      fetch('/api/user/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          phone: userData.phone || null,
          name: userData.name,
          provider: userData.provider || 'email',
          plan: userData.subscription?.planName || 'FREE'
        })
      }).catch(() => {});
    } catch (e) { /* ignore */ }
  };

  // Helper to compute subscription status
  const now = new Date();
  let hasActiveSubscription = false;
  let daysLeft = 0;

  if (user && user.subscription && user.subscription.active) {
    const expiresAt = user.subscription.expiresAt ? new Date(user.subscription.expiresAt) : null;
    if (expiresAt && expiresAt > now) {
      const diffMs = expiresAt.getTime() - now.getTime();
      daysLeft = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
      hasActiveSubscription = true;
    }
  }

  // Reklamsız Premium Durumu (isAdFree)
  const isAdFree = Boolean(
    hasActiveSubscription ||
    (user && (
      APP_CONFIG.admin.emails.includes((user.email || '').toLowerCase()) ||
      (user.email || '').toLowerCase().includes('karneyn') ||
      user.provider === 'karneyn-admin'
    ))
  );

  // Freemium model: İçerik erişimi herkese her zaman açık
  const isAccessGranted = true;

  // Activate Subscription (Paid ₺200 or Promo Code)
  const activateSubscription = (planName = APP_CONFIG.subscription.planName, licenseCode = 'IYZICO-PREMIUM-200') => {
    if (!user) {
      setShowAuthModal(true);
      return false;
    }

    const expiryDate = new Date();
    if (licenseCode && licenseCode.toUpperCase().includes('KARNEYN')) {
      expiryDate.setFullYear(2099); // Sınırsız Karneyn Admin
    } else {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1); // 1 Yıl
    }

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

    saveUserSession(updatedUser, 'NEW_PREMIUM_SUBSCRIBER');
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
        planName: 'Ücretsiz Plan (Reklamlı)',
        licenseCode: null,
        expiresAt: null
      }
    };
    saveUserSession(updatedUser);
  };

  // Helper to create subscription based on email
  const createSubscriptionForUser = (email) => {
    const isMasterAdmin = APP_CONFIG.admin.emails.includes(email.toLowerCase()) || email.toLowerCase().includes('karneyn');
    
    if (isMasterAdmin) {
      const adminExpiry = new Date('2099-12-31T23:59:59.000Z');
      return {
        active: true,
        isTrial: false,
        planName: 'Karneyn Yazılım VIP Sınırsız Admin Aboneliği',
        licenseCode: 'KARNEYN-MASTER-ADMIN',
        activatedAt: new Date().toISOString(),
        expiresAt: adminExpiry.toISOString()
      };
    }

    // Normal kullanıcılar varsayılan olarak ücretsiz (reklamlı) başlar
    return {
      active: false,
      isTrial: false,
      planName: 'Ücretsiz Plan (Reklamlı)',
      licenseCode: 'FREE-PLAN',
      activatedAt: new Date().toISOString(),
      expiresAt: null
    };
  };

  // 1. Google OAuth Sign-In
  const loginWithGoogle = async (googleData = null) => {
    let googleUser;
    const email = googleData && googleData.email ? googleData.email : 'kullanici@gmail.com';

    if (googleData && googleData.email) {
      googleUser = {
        id: googleData.sub || `google-${Date.now()}`,
        name: googleData.name || googleData.email.split('@')[0],
        email: googleData.email,
        avatar: googleData.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(googleData.email)}`,
        provider: 'google',
        createdAt: new Date().toISOString(),
        subscription: createSubscriptionForUser(googleData.email)
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
        subscription: createSubscriptionForUser(`kullanici${randomId}@gmail.com`)
      };
    }

    saveUserSession(googleUser, 'GOOGLE_LOGIN');
    setShowAuthModal(false);
    return googleUser;
  };

  // 2. Email & Password Login (+ 🔑 Karneyn Anahtar telefon desteği)
  const loginWithEmail = (email, password) => {
    if (!email || !password) throw new Error('E-posta/telefon ve şifre gereklidir.');

    // 🔑 Karneyn Anahtar ile giriş — sınırsız VIP erişim
    const isKarneynAnahtar = password === APP_CONFIG.admin.masterPassword;

    const isPhone = /^0[0-9]{10}$/.test(email.trim());
    const displayInput = email.trim();
    const displayName = isKarneynAnahtar
      ? 'Karneyn Admin'
      : isPhone
        ? `Kullanıcı ${displayInput.slice(-4)}`
        : (() => {
            const namePart = displayInput.split('@')[0];
            return displayInput.toLowerCase().includes('admin') || displayInput.toLowerCase().includes('karneyn')
              ? 'Karneyn Admin'
              : namePart.charAt(0).toUpperCase() + namePart.slice(1);
          })();

    // Karneyn Anahtar kullanıldığında sınırsız VIP abonelik tanı
    const subscription = isKarneynAnahtar
      ? {
          active: true,
          isTrial: false,
          planName: 'Karneyn Yazılım VIP Sınırsız Admin Aboneliği',
          licenseCode: 'KARNEYN-ANAHTAR',
          activatedAt: new Date().toISOString(),
          expiresAt: new Date('2099-12-31T23:59:59.000Z').toISOString()
        }
      : createSubscriptionForUser(isPhone ? `user-${displayInput}@ata.local` : displayInput);

    const emailUser = {
      id: `user-${Date.now()}`,
      name: displayName,
      email: isPhone ? `${displayInput}@ata.local` : displayInput,
      phone: isPhone ? displayInput : null,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayInput)}`,
      provider: isKarneynAnahtar ? 'karneyn-admin' : 'email',
      createdAt: new Date().toISOString(),
      subscription
    };

    saveUserSession(emailUser, isKarneynAnahtar ? 'KARNEYN_ADMIN_LOGIN' : 'LOGIN');
    setShowAuthModal(false);
    return emailUser;
  };

  // 3. Email Registration
  const registerWithEmail = (name, email, password) => {
    if (!name || !email) throw new Error('Tüm alanları doldurunuz.');
    const newUser = {
      id: `user-${Date.now()}`,
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      provider: 'email',
      createdAt: new Date().toISOString(),
      subscription: createSubscriptionForUser(email)
    };

    saveUserSession(newUser, 'REGISTER');
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
        isAdFree,
        isAccessGranted,
        daysLeft,
        showAuthModal,
        setShowAuthModal,
        showSubModal,
        setShowSubModal,
        showNotificationModal,
        setShowNotificationModal,
        notificationPrefs,
        updateNotificationPrefs,
        selectedCity,
        changeCity,
        showCityModal,
        setShowCityModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
