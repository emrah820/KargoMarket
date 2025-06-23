import React from 'react';

const MyReviewsSection: React.FC = () => {
  const myReviews = [
    {
      id: 1,
      companyId: 1,
      companyName: 'Aras Kargo',
      companyLogo: '🚚',
      rating: 5,
      comment: 'Çok hızlı ve güvenilir hizmet. Paketim zamanında geldi, hiçbir sorun yaşamadım. Kesinlikle tavsiye ederim.',
      date: '2025-01-12',
      status: 'published',
      statusLabel: 'Yayınlandı',
      helpful: 12,
      views: 156,
      isPublic: true,
      visibleOn: ['Reklamlar Sayfası', 'Firma Profili', 'Yorumlar Sayfası']
    },
    {
      id: 2,
      companyId: 2,
      companyName: 'MNG Kargo',
      companyLogo: '📦',
      rating: 4,
      comment: 'Genel olarak memnunum ama bazen teslimat saatleri değişebiliyor. Müşteri hizmetleri iyi.',
      date: '2025-01-08',
      status: 'published',
      statusLabel: 'Yayınlandı',
      helpful: 8,
      views: 89,
      isPublic: true,
      visibleOn: ['Reklamlar Sayfası', 'Yorumlar Sayfası']
    },
    {
      id: 3,
      companyId: 4,
      companyName: 'Güven Sigorta',
      companyLogo: '🛡️',
      rating: 5,
      comment: 'Hasar durumunda çok hızlı ödeme yaptılar. Profesyonel yaklaşım için teşekkürler.',
      date: '2024-12-20',
      status: 'pending',
      statusLabel: 'Moderasyonda',
      helpful: 0,
      views: 0,
      isPublic: true,
      visibleOn: []
    },
    {
      id: 4,
      companyId: 5,
      companyName: 'Lojistik Pro',
      companyLogo: '🏭',
      rating: 3,
      comment: 'Ortalama bir hizmet. Fiyat/performans dengesi makul ama daha iyisi olabilir.',
      date: '2024-12-15',
      status: 'draft',
      statusLabel: 'Taslak',
      helpful: 0,
      views: 0,
      isPublic: false,
      visibleOn: []
    }
  ];

  const getStatusBadge = (status: string, label: string) => {
    const statusClasses = {
      published: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      draft: 'bg-gray-100 text-gray-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
        {label}
      </span>
    );
  };

  const handleNewReview = () => {
    // Yeni yorum ekleme işlemleri
  };

  const renderEditModal = (): React.ReactNode => {
    return null;
  };

  const renderNewReviewModal = (): React.ReactNode => {
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Yorumlarım & Puanlarım</h2>
          <button 
            onClick={handleNewReview}
            className="bg-primary-600 text-white py-2 px-4 rounded-lg flex items-center justify-center font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <span>Yeni Yorum Ekle</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Yorum</p>
                <p className="text-2xl font-bold text-blue-600">{myReviews.length}</p>
              </div>
              <div className="text-blue-600" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Yayınlanan</p>
                <p className="text-2xl font-bold text-green-600">{myReviews.filter(r => r.status === 'published').length}</p>
              </div>
              <div className="text-green-600" />
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ortalama Puan</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {(myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1)}
                </p>
              </div>
              <div className="text-yellow-600" />
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Beğeni</p>
                <p className="text-2xl font-bold text-purple-600">{myReviews.reduce((sum, r) => sum + r.helpful, 0)}</p>
              </div>
              <div className="text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Yorum ara..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            <option value="">Tüm Durumlar</option>
            <option value="published">Yayınlanan</option>
            <option value="pending">Moderasyonda</option>
            <option value="draft">Taslak</option>
          </select>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {myReviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{review.companyLogo}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{review.companyName}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center mr-3">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(review.status, review.statusLabel)}
                  <div className="flex space-x-1">
                    <button 
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                      title="Sil"
                    >
                      <div className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{review.comment}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="text-gray-400 mr-1" />
                    <span>{review.views} görüntülenme</span>
                  </div>
                  <div className="flex items-center">
                    <div className="text-gray-400 mr-1" />
                    <span>{review.helpful} beğeni</span>
                  </div>
                  <div className="flex items-center">
                    <div className="text-gray-400 mr-1" />
                    <span>{review.isPublic ? 'Herkese açık' : 'Özel'}</span>
                  </div>
                </div>
                
                {review.visibleOn.length > 0 && (
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Görünür:</span> {review.visibleOn.join(', ')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {myReviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz yorum yapmamışsınız</h3>
            <p className="text-gray-600 mb-6">İşlem yaptığınız firmalar hakkında yorum yaparak diğer kullanıcılara yardımcı olun.</p>
            <button 
              onClick={handleNewReview}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              İlk Yorumunuzu Yapın
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {renderEditModal()}
      {renderNewReviewModal()}
    </div>
  );
};

export default MyReviewsSection;