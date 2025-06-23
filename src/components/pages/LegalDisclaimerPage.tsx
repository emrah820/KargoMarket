import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Users, 
  CreditCard, 
  Lock, 
  CheckCircle,
  XCircle,
  Info,
  Phone,
  Mail
} from 'lucide-react';

const LegalDisclaimerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('turkish');

  const tabs = [
    { id: 'turkish', label: 'Türkçe', flag: '🇹🇷' },
    { id: 'english', label: 'English', flag: '🇺🇸' }
  ];

  const renderTurkishContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-red-600" size={40} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Platform Sorumluluk Reddi ve Gelir Modeli Beyanı
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Kargo Market platformunu kullanmadan önce lütfen aşağıdaki önemli bilgileri dikkatle okuyunuz.
        </p>
      </div>

      {/* Section 1 */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <CreditCard className="text-blue-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">1. Platformun Gelir Modeli ve Ticari Tarafsızlığı</h2>
        </div>
        
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Bu platformun tüm gelirleri yalnızca <strong>üyelik ücretleri</strong> ve <strong>reklam/ilan yayınlama bedellerinden</strong> elde edilmektedir.
          </p>
          <p>
            Platform, kullanıcılar arasında gerçekleştirilen herhangi bir mal, hizmet veya finansal işlemde doğrudan ya da dolaylı olarak <strong>hiçbir şekilde ticari taraf değildir</strong>.
          </p>
          <p>
            Kullanıcılar arasındaki tüm ticari ve hukuki ilişki, münhasıran ilgili kullanıcılar arasında geçerlidir; platform bu ilişkilerin hiçbir aşamasında aracı, kefil, garantör veya temsilci olarak hareket etmez.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
            <div className="flex items-center text-blue-800 mb-2">
              <Info size={20} className="mr-2" />
              <span className="font-semibold">Önemli Not</span>
            </div>
            <p className="text-blue-700 text-sm">
              Platformumuz; ilan/üyelik hizmetleri dışında hiçbir şekilde finansal aracı, tahsilat/kredi/emanet sağlayıcı, ticari temsilci veya ticari sözleşmenin tarafı değildir. Her türlü ticari risk kullanıcıya aittir.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <XCircle className="text-red-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">2. Sorumluluk Reddi</h2>
        </div>
        
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Platformda yer alan ilan, teklif, yorum, mesaj, içerik ve tüm kullanıcı işlemleri, <strong>ilgili kullanıcıların kendi beyan ve sorumluluğundadır</strong>.
          </p>
          
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-800 mb-3">Platform aşağıdaki durumlardan kesinlikle sorumlu değildir:</h3>
            <ul className="space-y-2 text-red-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Kara para aklama, dolandırıcılık, hayali işlem
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Kalitesiz hizmet, ürün veya hizmette gecikme
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Kaybolma, çalınma, ayıplı mal
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Sözleşme ihlali, maddi/manevi zarar
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Her türlü hukuki, mali, cezai, idari veya diğer doğabilecek sonuç ve ihtilaflar
              </li>
            </ul>
          </div>
          
          <p className="font-semibold">
            Platform, yalnızca bir ilan ve reklam/üyelik hizmeti sunar; hiçbir ticari anlaşmanın, ödemenin, teslimatın veya taahhüdün doğrudan tarafı değildir. Kullanıcılar, tüm işlemleri kendi risk ve sorumluluklarında yürütür.
          </p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-yellow-500">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
            <Users className="text-yellow-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">3. Danışmanlık ve Hukuki Yönlendirme</h2>
        </div>
        
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Platformda sunulan bilgiler, tavsiyeler veya yönlendirmeler <strong>hiçbir şekilde hukuki, mali, ticari veya profesyonel tavsiye teşkil etmez</strong>.
          </p>
          <p>
            Kullanıcılar, platform üzerinde karşılaştıkları şüpheli işlemler veya anlaşmazlıklar için mutlaka kendi avukatları veya profesyonel danışmanlarıyla görüşmelidir.
          </p>
        </div>
      </div>

      {/* Section 4 */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <Lock className="text-green-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">4. Kişisel Veriler ve KVKK</h2>
        </div>
        
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Kişisel verileriniz yalnızca platform işleyişini sağlamak ve yasal yükümlülükler çerçevesinde <strong>KVKK kapsamında işlenir</strong>. Üçüncü şahıslarla paylaşılmaz, gizliliğiniz korunur.
          </p>
        </div>
      </div>

      {/* Section 5 */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-purple-500">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <CheckCircle className="text-purple-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">5. Kabul ve Yürürlülük</h2>
        </div>
        
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p className="font-semibold text-lg">
            Platformu kullanan tüm kullanıcılar, bu açıklamaları ve yukarıda belirtilen koşulları <strong>peşinen kabul etmiş sayılır</strong>.
          </p>
        </div>
      </div>
    </div>
  );

  const renderEnglishContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-red-600" size={40} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Platform Disclaimer and Revenue Model Statement
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Please read the following important information carefully before using the Kargo Market platform.
        </p>
      </div>

      {/* Section 1 */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <CreditCard className="text-blue-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">1. Platform Revenue Model and Commercial Neutrality</h2>
        </div>
        
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            All revenues of this platform are derived solely from <strong>membership fees</strong> and <strong>advertising/listing publication fees</strong>.
          </p>
          <p>
            The platform is in no way, directly or indirectly, <strong>a commercial party to any goods, services, or financial transaction</strong> between users.
          </p>
          <p>
            All commercial and legal relationships between users are exclusively between the relevant users; the platform does not act as an intermediary, guarantor, surety, or representative at any stage of these relationships.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
            <div className="flex items-center text-blue-800 mb-2">
              <Info size={20} className="mr-2" />
              <span className="font-semibold">Important Note</span>
            </div>
            <p className="text-blue-700 text-sm">
              Our platform is not, under any circumstances, a financial intermediary, payment/escrow provider, commercial representative, or a party to any commercial contract, except for providing listing/membership services. All commercial risks rest with the users.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <XCircle className="text-red-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">2. Disclaimer of Liability</h2>
        </div>
        
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            All listings, offers, comments, messages, content, and all user transactions on the platform are <strong>the sole responsibility and declaration of the respective users</strong>.
          </p>
          
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-800 mb-3">The platform shall not be liable for and accepts no responsibility for:</h3>
            <ul className="space-y-2 text-red-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Money laundering, fraud, fictitious transactions
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Low quality of service, delays in products or services
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Loss, theft, defective goods
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Breach of contract, material or moral damages
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Any legal, financial, criminal, administrative or other possible consequences and disputes
              </li>
            </ul>
          </div>
          
          <p className="font-semibold">
            The platform solely provides listing and advertising/membership services; it is not a direct party to any commercial agreement, payment, delivery, or commitment. Users carry out all transactions at their own risk and responsibility.
          </p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-yellow-500">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
            <Users className="text-yellow-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">3. Advisory and Legal Guidance</h2>
        </div>
        
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Any information, advice, or guidance provided on the platform <strong>does not constitute legal, financial, commercial, or professional advice</strong>.
          </p>
          <p>
            Users must consult their own lawyers or professional advisors for any suspicious transaction or dispute encountered on the platform.
          </p>
        </div>
      </div>

      {/* Section 4 */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <Lock className="text-green-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">4. Personal Data and Privacy</h2>
        </div>
        
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Your personal data is processed only to ensure the operation of the platform and within the scope of legal obligations in accordance with <strong>data protection laws</strong>. It is not shared with third parties, and your privacy is protected.
          </p>
        </div>
      </div>

      {/* Section 5 */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-purple-500">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <CheckCircle className="text-purple-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">5. Acceptance and Enforcement</h2>
        </div>
        
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p className="font-semibold text-lg">
            All users who use the platform are <strong>deemed to have accepted these statements and the above-mentioned conditions in advance</strong>.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        {/* Language Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <span className="mr-2 text-lg">{tab.flag}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'turkish' ? renderTurkishContent() : renderEnglishContent()}

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Sorularınız mı var?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Yasal konularda destek almak için bizimle iletişime geçin.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <Phone className="mx-auto mb-4 text-white" size={32} />
              <h3 className="font-bold mb-2">Hukuk Departmanı</h3>
              <p className="text-primary-100 text-sm mb-4">+905412879705</p>
              <button className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors transform hover:scale-105">
                Hemen Ara
              </button>
            </div>
            
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <Mail className="mx-auto mb-4 text-white" size={32} />
              <h3 className="font-bold mb-2">E-posta Desteği</h3>
              <p className="text-primary-100 text-sm mb-4">emrahbadas@gmail.com</p>
              <button className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors transform hover:scale-105">
                E-posta Gönder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDisclaimerPage;