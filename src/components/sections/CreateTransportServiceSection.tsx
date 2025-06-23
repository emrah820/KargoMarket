import React, { useState } from 'react';
import { ArrowLeft, Calendar, Package, MapPin, Truck, Ship, Plane, Train, FileText, Upload, Eye, Download, Trash2 } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

const CreateTransportServiceSection: React.FC = () => {
  const { setActiveSection } = useDashboard();
  const [transportMode, setTransportMode] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{
    id: string;
    name: string;
    size: string;
    type: string;
    url: string;
  }>>([]);
  const [formData, setFormData] = useState({
    serviceNumber: `NK${new Date().getFullYear().toString().substr(-2)}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    serviceTitle: '',
    serviceTransportMode: '',
    serviceDescription: '',
    serviceOrigin: '',
    serviceDestination: '',
    serviceVehicleType: '',
    serviceAvailableDate: '',
    serviceCapacity: '',
    serviceCompanyName: '',
    serviceContact: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Taşıma modu değiştiğinde state'i güncelle
    if (name === 'serviceTransportMode') {
      setTransportMode(value);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        // Dosya türü kontrolü
        const allowedTypes = [
          'application/pdf',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'image/png',
          'image/jpeg',
          'image/jpg'
        ];

        // Dosya boyutu kontrolü (10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert(`${file.name} dosyası çok büyük. Maksimum dosya boyutu 10MB'dir.`);
          return;
        }

        if (allowedTypes.includes(file.type)) {
          const newDocument = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            type: file.type,
            url: URL.createObjectURL(file)
          };
          setUploadedDocuments(prev => [...prev, newDocument]);
        } else {
          alert('Desteklenmeyen dosya türü. Lütfen Excel, Word, PDF, PNG veya JPEG dosyası yükleyin.');
        }
      });
    }
  };

  const handleDocumentDelete = (id: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const handleDocumentPreview = (document: { id: string; name: string; size: string; type: string; url: string }) => {
    window.open(document.url, '_blank');
  };

  const handleDocumentDownload = (document: { id: string; name: string; size: string; type: string; url: string }) => {
    const link = document.createElement('a');
    link.href = document.url;
    link.download = document.name;
    link.click();
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('image')) return '🖼️';
    return '📎';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Transport service submitted:', {
      ...formData,
      uploadedDocuments
    });
    setActiveSection('my-listings');
  };

  const getTransportBackground = () => {
    const backgrounds = {
      road: 'bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden',
      sea: 'bg-gradient-to-br from-cyan-50 to-cyan-100 relative overflow-hidden',
      air: 'bg-gradient-to-br from-purple-50 to-purple-100 relative overflow-hidden',
      rail: 'bg-gradient-to-br from-green-50 to-green-100 relative overflow-hidden'
    };
    return backgrounds[transportMode as keyof typeof backgrounds] || 'bg-white relative overflow-hidden';
  };

  const getTransportIcon = () => {
    const icons = {
      road: Truck,
      sea: Ship,
      air: Plane,
      rail: Train
    };
    const IconComponent = icons[transportMode as keyof typeof icons];
    return IconComponent ? <IconComponent className="w-16 h-16 text-gray-400" /> : null;
  };

  const getTransportBackgroundImage = () => {
    if (!transportMode) return '';
    
    const backgroundImages = {
      road: `
        <div class="absolute inset-0 opacity-5">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <path d="M10 50 L90 50 M20 40 L80 40 M20 60 L80 60" stroke="currentColor" stroke-width="2" fill="none"/>
            <rect x="30" y="35" width="20" height="15" rx="2" fill="currentColor"/>
            <circle cx="35" cy="52" r="3" fill="currentColor"/>
            <circle cx="45" cy="52" r="3" fill="currentColor"/>
          </svg>
        </div>
      `,
      sea: `
        <div class="absolute inset-0 opacity-5">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <path d="M10 60 Q30 55 50 60 T90 60" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M30 40 L70 40 L65 55 L35 55 Z" fill="currentColor"/>
            <rect x="45" y="25" width="3" height="15" fill="currentColor"/>
            <path d="M48 25 L60 35 L48 30 Z" fill="currentColor"/>
          </svg>
        </div>
      `,
      air: `
        <div class="absolute inset-0 opacity-5">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <path d="M20 50 L80 50" stroke="currentColor" stroke-width="3" fill="none"/>
            <path d="M30 45 L70 45 L75 50 L70 55 L30 55 Z" fill="currentColor"/>
            <path d="M35 40 L45 30 L55 40" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M35 60 L45 70 L55 60" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        </div>
      `,
      rail: `
        <div class="absolute inset-0 opacity-5">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <path d="M10 55 L90 55 M10 45 L90 45" stroke="currentColor" stroke-width="2" fill="none"/>
            <rect x="25" y="35" width="50" height="20" rx="3" fill="currentColor"/>
            <circle cx="35" cy="58" r="2" fill="currentColor"/>
            <circle cx="45" cy="58" r="2" fill="currentColor"/>
            <circle cx="55" cy="58" r="2" fill="currentColor"/>
            <circle cx="65" cy="58" r="2" fill="currentColor"/>
          </svg>
        </div>
      `
    };
    
    return backgroundImages[transportMode as keyof typeof backgroundImages] || '';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className={`rounded-3xl shadow-lg p-6 transition-all duration-300 ${getTransportBackground()}`}>
        {/* Background Image */}
        {transportMode && (
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            dangerouslySetInnerHTML={{ __html: getTransportBackgroundImage() }}
          />
        )}
        
        {/* Header */}
        <div className="flex items-center mb-8 relative z-10">
          <button
            onClick={() => setActiveSection('my-listings')}
            className="mr-4 p-2 text-gray-600 hover:text-primary-600 transition-colors rounded-full"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Yeni Nakliye İlanı Oluştur</h1>
          {transportMode && (
            <div className="ml-auto hidden md:block">
              {getTransportIcon()}
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nakliye İlanı No */}
            <div>
              <label htmlFor="serviceNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Nakliye İlanı No
              </label>
              <input
                type="text"
                id="serviceNumber"
                name="serviceNumber"
                value={formData.serviceNumber}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-300 rounded-full text-gray-500 cursor-not-allowed shadow-sm"
                readOnly
              />
            </div>

            {/* İlan Başlığı */}
            <div>
              <label htmlFor="serviceTitle" className="block text-sm font-medium text-gray-700 mb-2">
                İlan Başlığı *
              </label>
              <input
                type="text"
                id="serviceTitle"
                name="serviceTitle"
                value={formData.serviceTitle}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                required
                placeholder="Örn: İstanbul-Ankara Güzergahı Nakliye Hizmeti"
              />
            </div>

            {/* Taşıma Modu */}
            <div>
              <label htmlFor="serviceTransportMode" className="block text-sm font-medium text-gray-700 mb-2">
                Taşıma Modu *
              </label>
              <select
                id="serviceTransportMode"
                name="serviceTransportMode"
                value={formData.serviceTransportMode}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                required
              >
                <option value="">Seçiniz</option>
                <option value="road">🚛 Karayolu</option>
                <option value="sea">🚢 Denizyolu</option>
                <option value="air">✈️ Havayolu</option>
                <option value="rail">🚂 Demiryolu</option>
              </select>
            </div>

            {/* Kalkış Bölgesi */}
            <div>
              <label htmlFor="serviceOrigin" className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Kalkış Bölgesi/Noktası *
              </label>
              <input
                type="text"
                id="serviceOrigin"
                name="serviceOrigin"
                value={formData.serviceOrigin}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                required
                placeholder="Örn: İstanbul ve çevresi"
              />
            </div>

            {/* Varış Bölgesi */}
            <div>
              <label htmlFor="serviceDestination" className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Varış Bölgesi/Noktası *
              </label>
              <input
                type="text"
                id="serviceDestination"
                name="serviceDestination"
                value={formData.serviceDestination}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                required
                placeholder="Örn: Ankara ve çevresi"
              />
            </div>

            {/* Araç Tipi */}
            <div>
              <label htmlFor="serviceVehicleType" className="block text-sm font-medium text-gray-700 mb-2">
                <Truck className="inline w-4 h-4 mr-1" />
                Mevcut Araç Tipi *
              </label>
              <select
                id="serviceVehicleType"
                name="serviceVehicleType"
                value={formData.serviceVehicleType}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                required
              >
                <option value="">Seçiniz</option>
                <option value="truck">🚚 Kamyon</option>
                <option value="tir">🚛 Tır</option>
                <option value="all_road">🛣️ Tüm Karayolu Araçları</option>
                <option value="container_ship">🚢 Konteyner Gemisi</option>
                <option value="cargo_plane">✈️ Uçak Kargo</option>
                <option value="train">🚂 Tren</option>
                <option value="other">🔧 Diğer</option>
              </select>
            </div>

            {/* Boşta Olma Tarihi */}
            <div>
              <label htmlFor="serviceAvailableDate" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Boşta Olma Tarihi *
              </label>
              <input
                type="date"
                id="serviceAvailableDate"
                name="serviceAvailableDate"
                value={formData.serviceAvailableDate}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                required
              />
            </div>

            {/* Kapasite */}
            <div>
              <label htmlFor="serviceCapacity" className="block text-sm font-medium text-gray-700 mb-2">
                <Package className="inline w-4 h-4 mr-1" />
                Kapasite (ton/m³) *
              </label>
              <input
                type="number"
                id="serviceCapacity"
                name="serviceCapacity"
                value={formData.serviceCapacity}
                onChange={handleInputChange}
                min="0.1"
                step="0.1"
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                required
                placeholder="Örn: 25.0"
              />
            </div>

            {/* Firma Adı */}
            <div>
              <label htmlFor="serviceCompanyName" className="block text-sm font-medium text-gray-700 mb-2">
                Firma Adı (Opsiyonel)
              </label>
              <input
                type="text"
                id="serviceCompanyName"
                name="serviceCompanyName"
                value={formData.serviceCompanyName}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                placeholder="Örn: ABC Lojistik A.Ş."
              />
            </div>

            {/* İletişim Bilgileri */}
            <div>
              <label htmlFor="serviceContact" className="block text-sm font-medium text-gray-700 mb-2">
                İletişim Bilgileri (E-posta/Telefon) *
              </label>
              <input
                type="text"
                id="serviceContact"
                name="serviceContact"
                value={formData.serviceContact}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                required
                placeholder="Örn: info@abclojistik.com veya +90 555 123 4567"
              />
            </div>
          </div>

          {/* Açıklama */}
          <div>
            <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama *
            </label>
            <textarea
              id="serviceDescription"
              name="serviceDescription"
              value={formData.serviceDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-6 py-4 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
              required
              placeholder="Nakliye hizmetiniz hakkında detaylı bilgi verin..."
            />
          </div>

          {/* Service Features */}
          <div className="bg-white/50 rounded-3xl p-6 border border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-4">🚀 Hizmet Özellikleri</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="insurance"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="insurance" className="ml-2 text-sm text-gray-700">
                  🛡️ Sigorta Dahil
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="tracking"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="tracking" className="ml-2 text-sm text-gray-700">
                  📍 Takip Sistemi
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="express"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="express" className="ml-2 text-sm text-gray-700">
                  ⚡ Ekspres Teslimat
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="fragile"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="fragile" className="ml-2 text-sm text-gray-700">
                  🔒 Hassas Yük Taşıma
                </label>
              </div>
            </div>
          </div>

          {/* Evrak Yükleme Alanı */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FileText className="mr-2 text-primary-600" size={20} />
              Evrak Yükleme Alanı
            </h3>
            
            {/* Dosya Yükleme Alanı */}
            <div className="mb-6">
              <div className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center hover:border-primary-400 transition-colors">
                <input
                  type="file"
                  id="documentUpload"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="documentUpload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Evrakları buraya sürükleyin veya tıklayın</p>
                  <p className="text-sm text-gray-500">
                    Desteklenen formatlar: PDF, Word (.doc, .docx), Excel (.xls, .xlsx), PNG, JPEG
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Maksimum dosya boyutu: 10MB</p>
                </label>
              </div>
            </div>

            {/* Yüklenen Dosyalar Listesi */}
            {uploadedDocuments.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Yüklenen Evraklar ({uploadedDocuments.length})</h4>
                <div className="space-y-3">
                  {uploadedDocuments.map((document) => (
                    <div key={document.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-3xl border border-gray-200">
                      <div className="flex items-center flex-1">
                        <span className="text-2xl mr-3">{getFileIcon(document.type)}</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 truncate">{document.name}</p>
                          <p className="text-sm text-gray-500">{document.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          type="button"
                          onClick={() => handleDocumentPreview(document)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                          title="Önizleme"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentDownload(document)}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition-colors"
                          title="İndir"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDocumentDelete(document.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                          title="Sil"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setActiveSection('my-listings')}
              className="px-8 py-4 bg-gray-200 text-gray-800 rounded-full font-medium hover:bg-gray-300 transition-colors shadow-sm"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-8 py-4 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              İlanı Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTransportServiceSection;