import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Phone, 
  Mail, 
  ExternalLink, 
  Play, 
  Eye, 
  MessageCircle,
  LogIn,
  UserPlus,
  Heart,
  Share2
} from 'lucide-react';

interface AdsPageProps {
  isLoggedIn?: boolean;
  onLogin?: () => void;
}

interface Ad {
  id: number;
  companyName: string;
  title: string;
  description: string;
  rating: number;
  reviewCount: number;
  category: string;
  type: string;
  hasVideo: boolean;
  videoThumbnail: string;
  logo: string;
  specialOffer: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  features: string[];
  views: number;
  clicks: number;
}

const AdsPage: React.FC<AdsPageProps> = ({ isLoggedIn = false, onLogin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const categories = [
    { id: 'all', label: 'Tüm Reklamlar', count: 24 },
    { id: 'transport', label: 'Nakliye Hizmetleri', count: 12 },
    { id: 'logistics', label: 'Lojistik Çözümleri', count: 8 },
    { id: 'insurance', label: 'Sigorta Hizmetleri', count: 4 }
  ];

  const ads: Ad[] = [
    {
      id: 1,
      companyName: 'Aras Kargo',
      title: 'Türkiye\'nin En Hızlı Kargo Hizmeti',
      description: 'Aynı gün teslimat garantisi ile tüm Türkiye\'ye güvenli kargo hizmeti. 30 yıllık deneyimimizle yanınızdayız.',
      rating: 4.8,
      reviewCount: 1247,
      category: 'transport',
      type: 'premium',
      hasVideo: true,
      videoThumbnail: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=400',
      logo: '🚚',
      specialOffer: '%20 İndirim - İlk Siparişinizde',
      contact: {
        phone: '+90 444 2 727',
        email: 'info@araskargo.com.tr',
        website: 'https://www.araskargo.com.tr'
      },
      features: ['Aynı Gün Teslimat', 'SMS Bilgilendirme', 'Online Takip', '7/24 Müşteri Hizmetleri'],
      views: 15420,
      clicks: 892
    },
    {
      id: 2,
      companyName: 'MNG Kargo',
      title: 'Güvenilir Kargo ve Lojistik Çözümleri',
      description: 'Kurumsal ve bireysel müşterilerimize özel kargo çözümleri. Hızlı, güvenli ve ekonomik teslimat seçenekleri.',
      rating: 4.6,
      reviewCount: 856,
      category: 'transport',
      type: 'standard',
      hasVideo: false,
      logo: '📦',
      specialOffer: 'Toplu Gönderimde Özel Fiyat',
      contact: {
        phone: '+90 444 6 664',
        email: 'musteri@mngkargo.com.tr',
        website: 'https://www.mngkargo.com.tr'
      },
      features: ['Kapıdan Kapıya', 'Sigortalı Taşıma', 'Esnek Ödeme', 'Şube Ağı'],
      views: 12350,
      clicks: 567
    },
    {
      id: 3,
      companyName: 'Yurtiçi Kargo',
      title: 'Türkiye\'nin Kargo Lideri',
      description: 'En geniş şube ağı ile her yere ulaşıyoruz. Güvenli ve hızlı kargo hizmetleri için doğru adres.',
      rating: 4.7,
      reviewCount: 2134,
      category: 'transport',
      type: 'premium',
      hasVideo: true,
      videoThumbnail: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=400',
      logo: '🚛',
      specialOffer: 'Ücretsiz Kargo - 50 TL Üzeri',
      contact: {
        phone: '+90 444 9 999',
        email: 'info@yurticikargo.com',
        website: 'https://www.yurticikargo.com'
      },
      features: ['Geniş Şube Ağı', 'Hızlı Teslimat', 'Güvenli Paketleme', 'Müşteri Memnuniyeti'],
      views: 18750,
      clicks: 1234
    },
    {
      id: 4,
      companyName: 'Güven Sigorta',
      title: 'Nakliye ve Kargo Sigortası',
      description: 'Yüklerinizi güvence altına alın. Kapsamlı nakliye sigortası ile riskleri minimize edin.',
      rating: 4.5,
      reviewCount: 432,
      category: 'insurance',
      type: 'standard',
      hasVideo: false,
      logo: '🛡️',
      specialOffer: 'İlk Yıl %30 İndirim',
      contact: {
        phone: '+90 212 555 0123',
        email: 'info@guvensigorta.com',
        website: 'https://www.guvensigorta.com'
      },
      features: ['Kapsamlı Koruma', 'Hızlı Hasar Ödemesi', 'Online İşlemler', 'Uzman Destek'],
      views: 8920,
      clicks: 345
    },
    {
      id: 5,
      companyName: 'Lojistik Pro',
      title: 'Entegre Lojistik Çözümleri',
      description: 'Depolama, dağıtım ve nakliye hizmetlerini tek çatı altında toplayan lojistik çözüm ortağınız.',
      rating: 4.9,
      reviewCount: 678,
      category: 'logistics',
      type: 'premium',
      hasVideo: true,
      videoThumbnail: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=400',
      logo: '🏭',
      specialOffer: 'Ücretsiz Depo Analizi',
      contact: {
        phone: '+90 216 555 0456',
        email: 'info@lojistikpro.com',
        website: 'https://www.lojistikpro.com'
      },
      features: ['Depolama', 'Dağıtım Ağı', 'Teknoloji Entegrasyonu', 'Raporlama'],
      views: 11200,
      clicks: 789
    },
    {
      id: 6,
      companyName: 'Hızlı Nakliyat',
      title: 'Şehir İçi Express Teslimat',
      description: 'Şehir içi acil teslimat ihtiyaçlarınız için 7/24 hizmet. Motokurye ve araç filosu ile hızlı çözümler.',
      rating: 4.4,
      reviewCount: 289,
      category: 'transport',
      type: 'standard',
      hasVideo: false,
      logo: '🏍️',
      specialOffer: '2 Saat İçinde Teslimat',
      contact: {
        phone: '+90 555 123 4567',
        email: 'info@hizlinakliyat.com',
        website: 'https://www.hizlinakliyat.com'
      },
      features: ['Express Teslimat', 'Motokurye', '7/24 Hizmet', 'Anlık Takip'],
      views: 6780,
      clicks: 234
    }
  ];

  const handleContactClick = (ad: Ad, type: 'phone' | 'email' | 'website') => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    // İletişim işlemi
    if (type === 'phone') {
      window.open(`tel:${ad.contact.phone}`);
    } else if (type === 'email') {
      window.open(`mailto:${ad.contact.email}`);
    } else if (type === 'website') {
      window.open(ad.contact.website, '_blank');
    }
  };

  const handleViewReviews = (companyName: string) => {
    // Yorumlar sayfasına yönlendirme
    console.log(`${companyName} yorumlarını görüntüle`);
  };

  const getTypeStyle = (type: string) => {
    return type === 'premium' 
      ? 'border-2 border-yellow-300 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50' 
      : 'border border-gray-200 shadow-lg bg-white';
  };

  const getTypeBadge = (type: string) => {
    if (type === 'premium') {
      return (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          ⭐ PREMIUM
        </div>
      );
    }
    return null;
  };

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || ad.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-primary-600">Reklam</span> Vitrini
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Güvenilir firmalardan özel teklifler ve hizmetler. Kaliteli iş ortakları ile tanışın.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setCategoryFilter(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border-2 ${
                  categoryFilter === category.id
                    ? 'bg-primary-600 text-white border-primary-600 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:text-primary-600 hover:shadow-md'
                }`}
              >
                <span>{category.label}</span>
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Firma veya hizmet ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 border border-gray-300 rounded-xl w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm text-lg"
            />
          </div>
        </div>

        {/* Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredAds.map((ad) => (
            <div key={ad.id} className={`rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl relative ${getTypeStyle(ad.type)}`}>
              {getTypeBadge(ad.type)}
              
              {/* Video/Image Section */}
              {ad.hasVideo ? (
                <div className="relative h-48 bg-gray-900 overflow-hidden group cursor-pointer">
                  <img 
                    src={ad.videoThumbnail} 
                    alt={ad.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                      <Play className="text-primary-600 ml-1" size={24} />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    🎥 VİDEO
                  </div>
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <div className="text-6xl">{ad.logo}</div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Company Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                      <span className="text-white text-lg">{ad.logo}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{ad.companyName}</h3>
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={`${i < Math.floor(ad.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{ad.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({ad.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Favorilere Ekle"
                    >
                      <Heart size={18} />
                    </button>
                    <button 
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                      title="Paylaş"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Title & Description */}
                <h4 className="text-xl font-bold text-gray-900 mb-3">{ad.title}</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">{ad.description}</p>

                {/* Special Offer */}
                {ad.specialOffer && (
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center">
                      <span className="text-green-600 mr-2">🎉</span>
                      <span className="font-semibold text-green-800">{ad.specialOffer}</span>
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {ad.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        ✓ {feature}
                      </span>
                    ))}
                    {ad.features.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                        +{ad.features.length - 3} daha
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Eye size={14} className="mr-1" />
                    <span>{ad.views.toLocaleString()} görüntülenme</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle size={14} className="mr-1" />
                    <span>{ad.clicks} tıklama</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Contact Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleContactClick(ad, 'phone')}
                      className="flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      title="Telefon"
                    >
                      <Phone size={14} className="mr-1" />
                      Ara
                    </button>
                    <button
                      onClick={() => handleContactClick(ad, 'email')}
                      className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      title="E-posta"
                    >
                      <Mail size={14} className="mr-1" />
                      Mail
                    </button>
                    <button
                      onClick={() => handleContactClick(ad, 'website')}
                      className="flex items-center justify-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                      title="Website"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      Site
                    </button>
                  </div>

                  {/* Review Button */}
                  <button
                    onClick={() => handleViewReviews(ad.companyName)}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    <Star size={14} className="mr-2" />
                    Tüm Yorumları Gör ({ad.reviewCount})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors transform hover:scale-105 shadow-lg hover:shadow-xl">
            Daha Fazla Reklam Yükle
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Reklam Vermek İster misiniz?</h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Firmanızı binlerce potansiyel müşteriye tanıtın. Reklam kartları ve video reklamları ile işinizi büyütün.
          </p>
          <div className="text-center">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors transform hover:scale-105 shadow-lg hover:shadow-xl">
              Reklam Ver
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold transform hover:scale-110 transition-all duration-200"
            >
              ×
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <LogIn className="text-primary-600" size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Giriş Gerekli</h3>
              <p className="text-gray-600 mb-6">
                Firmalarla iletişime geçmek için giriş yapmanız gerekiyor.
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setShowLoginModal(false);
                    onLogin?.();
                  }}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors transform hover:scale-105 flex items-center justify-center"
                >
                  <LogIn size={18} className="mr-2" />
                  Giriş Yap
                </button>
                <button 
                  onClick={() => {
                    setShowLoginModal(false);
                    onLogin?.();
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors transform hover:scale-105 flex items-center justify-center"
                >
                  <UserPlus size={18} className="mr-2" />
                  Üye Ol
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdsPage;