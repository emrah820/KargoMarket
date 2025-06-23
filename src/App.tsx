import { useState, useEffect } from 'react';
import PublicLayout from './components/layout/PublicLayout.tsx';
import DashboardLayout from './components/layout/DashboardLayout.tsx';
import { DashboardProvider } from './context/DashboardContext.tsx';
import AuthModal from './components/common/AuthModal';
import { supabase } from './supabaseClient';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [profile, setProfile] = useState<{ full_name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Oturum açık mı kontrol et (ilk yüklemede)
  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        setShowAuthModal(false);
        // Profili getir
        const { data, error: profileError } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('user_id', user.id)
          .single();
        if (data) setProfile({ full_name: data.full_name });
        if (profileError) setError('Profil alınamadı: ' + profileError.message);
      } else {
        setIsLoggedIn(false);
        setProfile(null);
        setShowDashboard(false);
        setShowAuthModal(true);
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  // Kullanıcı giriş/kayıt sonrası Supabase profiles tablosuna veri ekle
  const handleAuthSuccess = async () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setLoading(true);
    setError(null);
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (user) {
      // profiles tablosunda var mı kontrol et
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (!data) {
        // Yoksa ekle
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            full_name: user.user_metadata?.full_name || user.email,
            created_at: new Date().toISOString(),
          });
        if (insertError) {
          setError('Profil eklenemedi: ' + insertError.message);
        } else {
          setProfile({ full_name: user.user_metadata?.full_name || user.email });
        }
      } else {
        setProfile({ full_name: data.full_name });
      }
    } else if (userError) {
      setError('Kullanıcı alınamadı: ' + userError.message);
    }
    setLoading(false);
  };

  // Çıkış fonksiyonu
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setProfile(null);
    setShowDashboard(false);
    setShowAuthModal(true);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  if (showDashboard && isLoggedIn) {
    return (
      <DashboardProvider>
        <DashboardLayout onBackToPublic={() => setShowDashboard(false)} profile={profile} onLogout={handleLogout} />
      </DashboardProvider>
    );
  }

  return (
    <>
      {error && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-50">{error}</div>
      )}
      <PublicLayout 
        isLoggedIn={isLoggedIn}
        onLogin={() => setShowAuthModal(true)}
        onShowDashboard={() => setShowDashboard(true)}
        profile={profile}
        onLogout={handleLogout}
      />
      <AuthModal
        open={showAuthModal && !isLoggedIn}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}

export default App;