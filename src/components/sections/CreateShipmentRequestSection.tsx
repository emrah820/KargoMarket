import React, { useState } from 'react';
import { ArrowLeft, Calendar, Package, MapPin, ChevronDown, FileText, Upload, Eye, Download, Trash2 } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';

const CreateShipmentRequestSection: React.FC = () => {
  const { setActiveSection } = useDashboard();
  const { theme, setMode } = useTheme();
  const [transportMode, setTransportMode] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [offerType, setOfferType] = useState('direct');
  const [selectedLoadListing, setSelectedLoadListing] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{
    id: string;
    name: string;
    size: string;
    type: string;
    url: string;
  }>>([]);
  const [formData, setFormData] = useState({
    requestNumber: `NT${new Date().getFullYear().toString().substr(-2)}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    requestTitle: '',
    requestLoadType: '',
    requestDescription: '',
    requestOrigin: '',
    requestDestination: '',
    requestLoadingDate: '',
    requestDeliveryDate: '',
    requestWeight: '',
    requestVolume: '',
    requestSetPrice: ''
  });

  // Örnek yük ilanları listesi
  const loadListings = [
    {
      id: 'ILN2506230001',
      title: 'İstanbul-Ankara Tekstil Yükü',
      route: 'İstanbul → Ankara',
      loadType: 'Tekstil Ürünleri'
    },
    {
      id: 'ILN2506230002',
      title: 'Ankara-Konya Gıda Taşıma',
      route: 'Ankara → Konya',
      loadType: 'Ambalajlı Gıda Ürünleri'
    },
    {
      id: 'ILN2506230003',
      title: 'İzmir-Antalya Elektronik Eşya',
      route: 'İzmir → Antalya',
      loadType: 'Beyaz Eşya / Elektronik'
    },
    {
      id: 'ILN2506230004',
      title: 'Bursa-İzmir Mobilya Taşıma',
      route: 'Bursa → İzmir',
      loadType: 'Mobilya / Dekorasyon Ürünleri'
    }
  ];

  // Araç tipleri taşıma moduna göre - Grup başlıkları ile organize edilmiş
  const vehicleTypes = {
    road: [
      {
        group: 'Kamyonlar',
        vehicles: [
          { value: 'truck_3_5_open', label: 'Kamyon - 3.5 Ton (Açık Kasa)' },
          { value: 'truck_3_5_closed', label: 'Kamyon - 3.5 Ton (Kapalı Kasa)' },
          { value: 'truck_5_open', label: 'Kamyon - 5 Ton (Açık Kasa)' },
          { value: 'truck_5_closed', label: 'Kamyon - 5 Ton (Kapalı Kasa)' },
          { value: 'truck_10_open', label: 'Kamyon - 10 Ton (Açık Kasa)' },
          { value: 'truck_10_closed', label: 'Kamyon - 10 Ton (Kapalı Kasa)' },
          { value: 'truck_10_tent', label: 'Kamyon - 10 Ton (Tenteli)' },
          { value: 'truck_15_open', label: 'Kamyon - 15 Ton (Açık Kasa)' },
          { value: 'truck_15_closed', label: 'Kamyon - 15 Ton (Kapalı Kasa)' },
          { value: 'truck_15_tent', label: 'Kamyon - 15 Ton (Tenteli)' }
        ]
      },
      {
        group: 'Tır ve Çekiciler (40 Tona Kadar)',
        vehicles: [
          { value: 'tir_standard', label: 'Tır (Standart Dorse) - 90m³ / 40t' },
          { value: 'tir_mega', label: 'Tır (Mega Dorse) - 100m³ / 40t' },
          { value: 'tir_jumbo', label: 'Tır (Jumbo Dorse) - 120m³ / 40t' },
          { value: 'tir_tent', label: 'Tır (Tenteli Dorse) - 40t' },
          { value: 'tir_frigo', label: 'Tır (Frigorifik Dorse - Isı Kontrollü) - 40t' },
          { value: 'tir_container', label: 'Tır (Konteyner Taşıyıcı) - 40t' },
          { value: 'tir_platform', label: 'Tır (Platform) - 40t' },
          { value: 'tir_frigo_dual', label: 'Tır (Frigorifik Çift Isı) - 40t' }
        ]
      },
      {
        group: 'Kargo Araçları (Hafif Yükler)',
        vehicles: [
          { value: 'van_3', label: 'Kargo Van - 3m³ (1000kg)' },
          { value: 'van_6', label: 'Kargo Van - 6m³ (1500kg)' },
          { value: 'van_10', label: 'Kargo Van - 10m³ (2000kg)' },
          { value: 'van_15', label: 'Kargo Van - 15m³ (2500kg)' }
        ]
      }
    ],
    sea: [
      {
        group: 'Konteyner Gemisi',
        vehicles: [
          { value: 'container_20dc', label: '20\' Standart (20DC) - 33m³ / 28t' },
          { value: 'container_40dc', label: '40\' Standart (40DC) - 67m³ / 28t' },
          { value: 'container_40hc', label: '40\' Yüksek (40HC) - 76m³ / 28t' },
          { value: 'container_20ot', label: '20\' Open Top - 32m³ / 28t' },
          { value: 'container_40ot', label: '40\' Open Top - 66m³ / 28t' },
          { value: 'container_20fr', label: '20\' Flat Rack - 28t' },
          { value: 'container_40fr', label: '40\' Flat Rack - 40t' },
          { value: 'container_20rf', label: '20\' Reefer - 28m³ / 25t' },
          { value: 'container_40rf', label: '40\' Reefer - 60m³ / 25t' }
        ]
      },
      {
        group: 'Dökme Yük Gemisi',
        vehicles: [
          { value: 'bulk_handysize', label: 'Handysize (10,000-35,000 DWT)' },
          { value: 'bulk_handymax', label: 'Handymax (35,000-60,000 DWT)' },
          { value: 'bulk_panamax', label: 'Panamax (60,000-80,000 DWT)' },
          { value: 'bulk_capesize', label: 'Capesize (80,000+ DWT)' }
        ]
      },
      {
        group: 'Genel Kargo Gemisi',
        vehicles: [
          { value: 'general_small', label: 'Küçük Tonaj (1,000-5,000 DWT)' },
          { value: 'general_medium', label: 'Orta Tonaj (5,000-15,000 DWT)' },
          { value: 'general_large', label: 'Büyük Tonaj (15,000+ DWT)' }
        ]
      },
      {
        group: 'Tanker',
        vehicles: [
          { value: 'tanker_product', label: 'Ürün Tankeri (10,000-60,000 DWT)' },
          { value: 'tanker_chemical', label: 'Kimyasal Tanker (5,000-40,000 DWT)' },
          { value: 'tanker_crude', label: 'Ham Petrol Tankeri (60,000+ DWT)' },
          { value: 'tanker_lpg', label: 'LPG Tankeri (5,000-80,000 m³)' },
          { value: 'tanker_lng', label: 'LNG Tankeri (150,000-180,000 m³)' }
        ]
      },
      {
        group: 'RO-RO',
        vehicles: [
          { value: 'roro_small', label: 'Küçük RO-RO (100-200 araç)' },
          { value: 'roro_medium', label: 'Orta RO-RO (200-500 araç)' },
          { value: 'roro_large', label: 'Büyük RO-RO (500+ araç)' }
        ]
      },
      {
        group: 'Feribot ve Yük Teknesi',
        vehicles: [
          { value: 'ferry_cargo', label: 'Kargo Feribotu' },
          { value: 'ferry_mixed', label: 'Karma Feribot (Yolcu+Yük)' },
          { value: 'cargo_small', label: 'Küçük Yük Teknesi (500-1,000 DWT)' },
          { value: 'cargo_large', label: 'Büyük Yük Teknesi (1,000+ DWT)' }
        ]
      }
    ],
    air: [
      {
        group: 'Kargo Tipleri',
        vehicles: [
          { value: 'standard_cargo', label: 'Standart Kargo' },
          { value: 'large_cargo', label: 'Büyük Hacimli Kargo' },
          { value: 'special_cargo', label: 'Özel Kargo' }
        ]
      }
    ],
    rail: [
      {
        group: 'Vagon Tipleri',
        vehicles: [
          { value: 'open_wagon', label: 'Açık Yük Vagonu' },
          { value: 'closed_wagon', label: 'Kapalı Yük Vagonu' },
          { value: 'container_wagon', label: 'Konteyner Vagonu' },
          { value: 'tanker_wagon', label: 'Tanker Vagonu' }
        ]
      }
    ]
  };

  // Gerekli evraklar taşıma moduna göre
  const requiredDocuments = {
    road: [
      'SRC Belgesi',
      'Yetki Belgesi (K1/K2/L vs.)',
      'Taşıma Sözleşmesi',
      'Araç Ruhsatı',
      'Zorunlu Trafik Sigortası',
      'Taşıyıcı Sorumluluk Sigortası',
      'İrsaliye / Sevk Fişi',
      'ADR Belgesi (Tehlikeli madde için)',
      'Frigo Sertifikası (Soğutmalı araçlar için)',
      'Ağırlık ve Ölçüm Raporu (Low-bed için)'
    ],
    sea: [
      'Konşimento (B/L)',
      'P&I Sigorta Sertifikası',
      'IMO Deklarasyonu (Tehlikeli Yük İçin)',
      'Gemici Belgeleri',
      'Gemi Uygunluk Sertifikası',
      'Son 3 kargo',
      'Yükleme Planı',
      'Tank/Ambar Temizlik sertifikası',
      'Sörvey Raporu',
      'Yükleme Manifestosu',
      'SOPEP (Petrol Kirliliği Önleme Planı – Tankerler için)',
      'SIRE Raporu (Tankerler için)',
      'DWT / Draft Survey Raporu',
      'CDI Raporu'
    ],
    air: [
      'AWB (Air Waybill)',
      'Gümrük Beyannamesi',
      'Tehlikeli Madde Beyanı (DGR)',
      'Kargo Listesi',
      'İthalat/İhracat Belgeleri',
      'Taşıma Yetki Sertifikası',
      'Uçuş Planı',
      'Güvenlik Onay Belgesi'
    ],
    rail: [
      'CIM Belgesi',
      'Vagon Uygunluk Sertifikası',
      'Taşıma Talimatnamesi',
      'Yükleme Planı',
      'Tehlikeli Madde Sertifikası',
      'Raylı Sistem Sertifikaları',
      'Sevk Emri ve Onay Yazısı'
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoadListingSelect = (listingId: string) => {
    const selectedListing = loadListings.find(listing => listing.id === listingId);
    if (selectedListing) {
      setSelectedLoadListing(listingId);
      // Seçilen yük ilanından bilgileri otomatik doldur
      setFormData(prev => ({
        ...prev,
        requestTitle: `${selectedListing.title} - Nakliye Talebi`,
        requestLoadType: selectedListing.loadType,
        requestOrigin: selectedListing.route.split(' → ')[0],
        requestDestination: selectedListing.route.split(' → ')[1]
      }));
    }
  };

  const handleTransportModeChange = (mode: string) => {
    setTransportMode(mode);
    setMode(mode as 'light' | 'dark' | 'system'); // ThemeContext ile temayı güncelle
    setVehicleType(''); // Araç tipini sıfırla
    setSelectedDocuments([]); // Seçili evrakları sıfırla
  };

  const handleDocumentChange = (document: string, checked: boolean) => {
    if (checked) {
      setSelectedDocuments(prev => [...prev, document]);
    } else {
      setSelectedDocuments(prev => prev.filter(doc => doc !== document));
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

  // Transport mode ikonunu döndüren yardımcı fonksiyon
  const getTransportIcon = () => {
    switch (transportMode) {
      case 'road':
        return <span title="Karayolu">🚚</span>;
      case 'sea':
        return <span title="Denizyolu">🚢</span>;
      case 'air':
        return <span title="Havayolu">✈️</span>;
      case 'rail':
        return <span title="Demiryolu">🚆</span>;
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Shipment request submitted:', {
      ...formData,
      transportMode,
      vehicleType,
      selectedDocuments,
      selectedLoadListing,
      uploadedDocuments
    });
    setActiveSection('my-listings');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div
        className={`rounded-3xl shadow-lg p-6 transition-all duration-300 relative overflow-hidden`}
        style={{
          background: theme.bgColor,
        }}
      >
        {/* Background Image */}
        {theme.bgImage && (
          <img
            src={theme.bgImage}
            alt="background"
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '320px',
              height: 'auto',
              opacity: 0.12,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        )}
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center">
            <button
              onClick={() => setActiveSection('my-listings')}
              className="mr-4 p-2 text-gray-600 hover:text-primary-600 transition-colors rounded-full"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Yeni Nakliye Talebi İlanı Oluştur</h1>
          </div>
          {transportMode && (
            <div className="hidden md:block">
              {getTransportIcon()}
            </div>
          )}
        </div>

        {/* Yük İlanı Seçimi */}
        <div className="mb-8 p-6 bg-white/70 rounded-3xl border border-gray-200 relative z-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Package className="mr-2 text-primary-600" size={20} />
            Hangi Yük İlanı İçin Nakliye Talebi Oluşturuyorsunuz?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="loadListingSelect" className="block text-sm font-medium text-gray-700 mb-2">
                Yük İlanı Seçin *
              </label>
              <div className="relative">
                <select
                  id="loadListingSelect"
                  value={selectedLoadListing}
                  onChange={(e) => handleLoadListingSelect(e.target.value)}
                  className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors appearance-none bg-white shadow-sm"
                  required
                >
                  <option value="">Yük ilanı seçiniz...</option>
                  {loadListings.map((listing) => (
                    <option key={listing.id} value={listing.id}>
                      {listing.id} - {listing.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
            {selectedLoadListing && (
              <div className="bg-primary-50 p-4 rounded-3xl border border-primary-200">
                <h4 className="font-medium text-primary-900 mb-2">Seçilen İlan Detayları</h4>
                {(() => {
                  const listing = loadListings.find(l => l.id === selectedLoadListing);
                  return listing ? (
                    <div className="text-sm text-primary-800">
                      <p><strong>İlan No:</strong> {listing.id}</p>
                      <p><strong>Başlık:</strong> {listing.title}</p>
                      <p><strong>Güzergah:</strong> {listing.route}</p>
                      <p><strong>Yük Tipi:</strong> {listing.loadType}</p>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nakliye Talebi No */}
            <div>
              <label htmlFor="requestNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Nakliye Talebi No
              </label>
              <input
                type="text"
                id="requestNumber"
                name="requestNumber"
                value={formData.requestNumber}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-300 rounded-full text-gray-500 cursor-not-allowed shadow-sm"
                readOnly
              />
            </div>

            {/* İlan Başlığı */}
            <div>
              <label htmlFor="requestTitle" className="block text-sm font-medium text-gray-700 mb-2">
                İlan Başlığı *
              </label>
              <input
                type="text"
                id="requestTitle"
                name="requestTitle"
                value={formData.requestTitle}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                required
                placeholder="Örn: İstanbul-Ankara Nakliye Talebi"
              />
            </div>

            {/* Yük Tipi */}
            <div>
              <label htmlFor="requestLoadType" className="block text-sm font-medium text-gray-700 mb-2">
                Yük Tipi *
              </label>
              <select
                id="requestLoadType"
                name="requestLoadType"
                value={formData.requestLoadType}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                required
              >
                <option value="">Seçiniz</option>
                <optgroup label="Genel Kargo / Paletli Ürünler">
                  <option value="box_package">Koli / Paket</option>
                  <option value="pallet_standard">Paletli Yükler - Standart Palet</option>
                  <option value="pallet_euro">Paletli Yükler - Euro Palet</option>
                  <option value="pallet_industrial">Paletli Yükler - Endüstriyel Palet</option>
                  <option value="sack_bigbag">Çuval / Bigbag (Dökme Olmayan)</option>
                  <option value="barrel_drum">Varil / Fıçı</option>
                  <option value="appliances_electronics">Beyaz Eşya / Elektronik</option>
                  <option value="furniture_decor">Mobilya / Dekorasyon Ürünleri</option>
                  <option value="textile_products">Tekstil Ürünleri</option>
                  <option value="automotive_parts">Otomotiv Parçaları / Yedek Parça</option>
                  <option value="machinery_parts">Makine / Ekipman Parçaları (Büyük Olmayan)</option>
                  <option value="construction_materials">İnşaat Malzemeleri (Torbalı Çimento, Demir Bağlar vb.)</option>
                  <option value="packaged_food">Ambalajlı Gıda Ürünleri (Kuru Gıda, Konserve vb.)</option>
                  <option value="consumer_goods">Tüketim Ürünleri (Market Ürünleri)</option>
                  <option value="ecommerce_cargo">E-ticaret Kargo</option>
                  <option value="other_general">Diğer Genel Kargo</option>
                </optgroup>
                <optgroup label="Dökme Yükler">
                  <option value="grain">Tahıl (Buğday, Mısır, Arpa, Pirinç vb.)</option>
                  <option value="ore">Maden Cevheri (Demir, Bakır, Boksit vb.)</option>
                  <option value="coal">Kömür</option>
                  <option value="cement_bulk">Çimento (Dökme)</option>
                  <option value="sand_gravel">Kum / Çakıl</option>
                  <option value="fertilizer_bulk">Gübre (Dökme)</option>
                  <option value="soil_excavation">Toprak / Hafriyat</option>
                  <option value="scrap_metal">Hurda Metal</option>
                  <option value="other_bulk">Diğer Dökme Yükler</option>
                </optgroup>
                <optgroup label="Sıvı Yükler (Dökme Sıvı)">
                  <option value="crude_oil">Ham Petrol / Petrol Ürünleri</option>
                  <option value="chemical_liquids">Kimyasal Sıvılar (Asit, Baz, Solvent vb.)</option>
                  <option value="vegetable_oils">Bitkisel Yağlar (Ayçiçek Yağı, Zeytinyağı vb.)</option>
                  <option value="fuel">Yakıt (Dizel, Benzin vb.)</option>
                  <option value="lpg_lng">LPG / LNG (Sıvılaştırılmış Gazlar)</option>
                  <option value="water">Su (İçme Suyu, Endüstriyel Su)</option>
                  <option value="milk_dairy">Süt / Süt Ürünleri (Dökme)</option>
                  <option value="wine_concentrate">Şarap / İçecek Konsantresi</option>
                  <option value="other_liquid">Diğer Sıvı Yükler</option>
                </optgroup>
                <optgroup label="Ağır Yük / Gabari Dışı Yük">
                  <option value="tbm">Tünel Açma Makinesi (TBM)</option>
                  <option value="transformer_generator">Trafo / Jeneratör</option>
                  <option value="heavy_machinery">Büyük İş Makineleri (Ekskavatör, Vinç vb.)</option>
                  <option value="boat_yacht">Tekne / Yat</option>
                  <option value="industrial_parts">Büyük Endüstriyel Parçalar</option>
                  <option value="prefab_elements">Prefabrik Yapı Elemanları</option>
                  <option value="wind_turbine">Rüzgar Türbini Kanatları / Kuleleri</option>
                  <option value="other_oversized">Diğer Gabari Dışı Yükler</option>
                </optgroup>
                <optgroup label="Hassas / Kırılabilir Kargo">
                  <option value="art_antiques">Sanat Eserleri / Antikalar</option>
                  <option value="glass_ceramic">Cam / Seramik Ürünler</option>
                  <option value="electronic_devices">Elektronik Cihaz</option>
                  <option value="medical_devices">Tıbbi Cihazlar</option>
                  <option value="lab_equipment">Laboratuvar Ekipmanları</option>
                  <option value="flowers_plants">Çiçek / Canlı Bitki</option>
                  <option value="other_sensitive">Diğer Hassas Kargo</option>
                </optgroup>
                <optgroup label="Tehlikeli Madde (ADR / IMDG / IATA Sınıflandırması)">
                  <option value="dangerous_class1">Patlayıcılar (Sınıf 1)</option>
                  <option value="dangerous_class2">Gazlar (Sınıf 2)</option>
                  <option value="dangerous_class3">Yanıcı Sıvılar (Sınıf 3)</option>
                  <option value="dangerous_class4">Yanıcı Katılar (Sınıf 4)</option>
                  <option value="dangerous_class5">Oksitleyici Maddeler (Sınıf 5)</option>
                  <option value="dangerous_class6">Zehirli ve Bulaşıcı Maddeler (Sınıf 6)</option>
                  <option value="dangerous_class7">Radyoaktif Maddeler (Sınıf 7)</option>
                  <option value="dangerous_class8">Aşındırıcı Maddeler (Sınıf 8)</option>
                  <option value="dangerous_class9">Diğer Tehlikeli Maddeler (Sınıf 9)</option>
                </optgroup>
                <optgroup label="Soğuk Zincir / Isı Kontrollü Yük">
                  <option value="frozen_food">Donmuş Gıda</option>
                  <option value="fresh_produce">Taze Meyve / Sebze</option>
                  <option value="meat_dairy">Et / Süt Ürünleri</option>
                  <option value="pharma_vaccine">İlaç / Aşı</option>
                  <option value="chemical_temp">Kimyasal Maddeler (Isı Kontrollü)</option>
                  <option value="other_cold_chain">Diğer Soğuk Zincir Kargo</option>
                </optgroup>
                <optgroup label="Canlı Hayvan">
                  <option value="small_livestock">Küçük Baş Hayvan (Koyun, Keçi vb.)</option>
                  <option value="large_livestock">Büyük Baş Hayvan (Sığır, At vb.)</option>
                  <option value="poultry">Kanatlı Hayvan</option>
                  <option value="pets">Evcil Hayvan</option>
                  <option value="other_livestock">Diğer Canlı Hayvanlar</option>
                </optgroup>
                <optgroup label="Proje Yükleri">
                  <option value="factory_setup">Fabrika Kurulumu</option>
                  <option value="power_plant">Enerji Santrali Ekipmanları</option>
                  <option value="infrastructure">Altyapı Proje Malzemeleri</option>
                  <option value="other_project">Diğer Proje Yükleri</option>
                </optgroup>
              </select>
            </div>

            {/* Taşıma Modu */}
            <div>
              <label htmlFor="transportationModeRequest" className="block text-sm font-medium text-gray-700 mb-2">
                Taşıma Modu *
              </label>
              <select
                id="transportationModeRequest"
                name="transportationModeRequest"
                value={transportMode}
                onChange={(e) => handleTransportModeChange(e.target.value)}
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

            {/* Araç Tipi - Taşıma modu seçildikten sonra gösterilir */}
            {transportMode && (
              <div>
                <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-2">
                  Araç Tipi *
                </label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                  required
                >
                  <option value="">Araç tipi seçiniz...</option>
                  {vehicleTypes[transportMode as keyof typeof vehicleTypes]?.map((group, groupIndex) => (
                    <optgroup key={groupIndex} label={group.group}>
                      {group.vehicles.map((vehicle) => (
                        <option key={vehicle.value} value={vehicle.value}>
                          {vehicle.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            )}

            {/* Kalkış Noktası - Artık opsiyonel */}
            <div>
              <label htmlFor="requestOrigin" className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Kalkış Noktası (Opsiyonel)
              </label>
              <input
                type="text"
                id="requestOrigin"
                name="requestOrigin"
                value={formData.requestOrigin}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                placeholder="Örn: İstanbul, Türkiye"
              />
            </div>

            {/* Varış Noktası - Artık opsiyonel */}
            <div>
              <label htmlFor="requestDestination" className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Varış Noktası (Opsiyonel)
              </label>
              <input
                type="text"
                id="requestDestination"
                name="requestDestination"
                value={formData.requestDestination}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                placeholder="Örn: Ankara, Türkiye"
              />
            </div>

            {/* Yükleme Tarihi */}
            <div>
              <label htmlFor="requestLoadingDate" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Yükleme Tarihi *
              </label>
              <input
                type="date"
                id="requestLoadingDate"
                name="requestLoadingDate"
                value={formData.requestLoadingDate}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                required
              />
            </div>

            {/* Teslimat Tarihi */}
            <div>
              <label htmlFor="requestDeliveryDate" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Teslimat Tarihi *
              </label>
              <input
                type="date"
                id="requestDeliveryDate"
                name="requestDeliveryDate"
                value={formData.requestDeliveryDate}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                required
              />
            </div>

            {/* Ağırlık */}
            <div>
              <label htmlFor="requestWeight" className="block text-sm font-medium text-gray-700 mb-2">
                <Package className="inline w-4 h-4 mr-1" />
                Ağırlık (ton) *
              </label>
              <input
                type="number"
                id="requestWeight"
                name="requestWeight"
                value={formData.requestWeight}
                onChange={handleInputChange}
                min="0.1"
                step="0.1"
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                required
                placeholder="Örn: 10.5"
              />
            </div>

            {/* Hacim */}
            <div>
              <label htmlFor="requestVolume" className="block text-sm font-medium text-gray-700 mb-2">
                <Package className="inline w-4 h-4 mr-1" />
                Hacim (m³) *
              </label>
              <input
                type="number"
                id="requestVolume"
                name="requestVolume"
                value={formData.requestVolume}
                onChange={handleInputChange}
                min="0.1"
                step="0.1"
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                required
                placeholder="Örn: 25.0"
              />
            </div>

            {/* Teklif Alma Şekli */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Teklif Alma Şekli</label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="requestOfferTypeDirect"
                    name="requestOfferType"
                    value="direct"
                    checked={offerType === 'direct'}
                    onChange={(e) => setOfferType(e.target.value)}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <label htmlFor="requestOfferTypeDirect" className="ml-2 text-sm text-gray-700">
                    Doğrudan Teklif
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="requestOfferTypePrice"
                    name="requestOfferType"
                    value="price"
                    checked={offerType === 'price'}
                    onChange={(e) => setOfferType(e.target.value)}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <label htmlFor="requestOfferTypePrice" className="ml-2 text-sm text-gray-700">
                    Fiyat Belirleyerek
                  </label>
                </div>
              </div>
            </div>

            {/* Belirlenen Fiyat */}
            {offerType === 'price' && (
              <div>
                <label htmlFor="requestSetPrice" className="block text-sm font-medium text-gray-700 mb-2">
                  Belirlenen Fiyat (TL) *
                </label>
                <input
                  type="number"
                  id="requestSetPrice"
                  name="requestSetPrice"
                  value={formData.requestSetPrice}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
                  placeholder="Örn: 5000"
                />
              </div>
            )}
          </div>

          {/* Açıklama */}
          <div>
            <label htmlFor="requestDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama *
            </label>
            <textarea
              id="requestDescription"
              name="requestDescription"
              value={formData.requestDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-6 py-4 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
              required
              placeholder="Nakliye talebiniz hakkında detaylı bilgi verin..."
            />
          </div>

          {/* Gerekli Evraklar - Taşıma modu seçildikten sonra gösterilir */}
          {transportMode && (
            <div className="bg-white/50 rounded-3xl p-6 border border-gray-200">
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                📋 Gerekli Evraklar ({transportMode === 'road' ? 'Karayolu' : transportMode === 'sea' ? 'Denizyolu' : transportMode === 'air' ? 'Havayolu' : 'Demiryolu'})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {requiredDocuments[transportMode as keyof typeof requiredDocuments]?.map((document, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`doc_${index}`}
                      checked={selectedDocuments.includes(document)}
                      onChange={(e) => handleDocumentChange(document, e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor={`doc_${index}`} className="ml-3 text-sm text-gray-700">
                      {document}
                    </label>
                  </div>
                ))}
              </div>
              {selectedDocuments.length > 0 && (
                <div className="mt-4 p-3 bg-primary-50 rounded-3xl border border-primary-200">
                  <p className="text-sm text-primary-800">
                    <strong>Seçilen Evraklar ({selectedDocuments.length}):</strong> {selectedDocuments.join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}

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

          {/* Transport Mode Specific Fields */}
          {transportMode && (
            <div className="bg-white/50 rounded-3xl p-6 border border-gray-200">
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                {transportMode === 'road' && '🚛 Karayolu Taşımacılığı Detayları'}
                {transportMode === 'sea' && '🚢 Denizyolu Taşımacılığı Detayları'}
                {transportMode === 'air' && '✈️ Havayolu Taşımacılığı Detayları'}
                {transportMode === 'rail' && '🚂 Demiryolu Taşımacılığı Detayları'}
              </h4>
              <div className="text-sm text-gray-600">
                {transportMode === 'road' && 'Karayolu taşımacılığı için özel gereksinimlerinizi belirtebilirsiniz.'}
                {transportMode === 'sea' && 'Denizyolu taşımacılığı için liman ve konteyner bilgilerini ekleyebilirsiniz.'}
                {transportMode === 'air' && 'Havayolu taşımacılığı için havaalanı ve kargo terminal bilgilerini belirtebilirsiniz.'}
                {transportMode === 'rail' && 'Demiryolu taşımacılığı için istasyon ve vagon tipi bilgilerini ekleyebilirsiniz.'}
              </div>
            </div>
          )}

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
              style={{ background: theme.primary }}
              className="px-8 py-4 text-white rounded-full font-medium hover:brightness-90 transition-colors shadow-lg hover:shadow-xl"
            >
              İlanı Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShipmentRequestSection;