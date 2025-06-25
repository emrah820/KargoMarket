import React, { useState } from 'react';
import { ArrowLeft, Upload, Calendar, Package, MapPin, FileText, Download, Eye, Trash2 } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { supabase } from '../../supabaseClient';

const CreateLoadListingSection: React.FC = () => {
  const dashboard = useDashboard();
  if (!dashboard || typeof dashboard.setActiveSection !== 'function') {
    return (
      <div className="p-8 text-center text-red-600 font-bold">
        Dashboard context bulunamadı veya hatalı! Lütfen DashboardProvider ile sarmalandığından emin olun.<br />
        (useDashboard() context hatası)
      </div>
    );
  }
  const { setActiveSection } = dashboard;

  const [offerType, setOfferType] = useState('direct');
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{
    id: string;
    name: string;
    size: string;
    type: string;
    url: string;
  }>>([]);
  const [formData, setFormData] = useState({
    listingNumber: `ILN${new Date().getFullYear().toString().substr(-2)}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    loadTitle: '',
    loadType: '',
    loadDescription: '',
    loadOrigin: '',
    loadDestination: '',
    loadingDate: '',
    deliveryDate: '',
    loadWeight: '',
    loadVolume: '',
    setPrice: '',
    loadRoleSelection: '',
    companyName: '',
    contactInfo: '',
    // Karayolu
    road_vehicleType: '',
    road_plate: '',
    road_capacity: '',
    road_route: '',
    road_availabilityDate: '',
    road_driverInfo: '',
    road_documents: '',
    road_note: '',
    // Denizyolu
    sea_vesselName: '',
    sea_imo: '',
    sea_vesselType: '',
    sea_dwt: '',
    sea_dimensions: '',
    sea_ports: '',
    sea_laycan: '',
    sea_cargoCompatibility: '',
    sea_freightType: '',
    sea_charterer: '',
    sea_certificates: '',
    sea_note: '',
    // Havayolu
    air_aircraftType: '',
    air_capacity: '',
    air_airports: '',
    air_availabilityDate: '',
    air_flightNumber: '',
    air_cargoType: '',
    air_operator: '',
    air_contact: '',
    air_documents: '',
    air_note: '',
    // Demiryolu
    rail_wagonType: '',
    rail_trainNumber: '',
    rail_capacity: '',
    rail_stations: '',
    rail_availabilityDate: '',
    rail_cargoType: '',
    rail_operator: '',
    rail_documents: '',
    rail_note: '',
  });
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [transportMode, setTransportMode] = useState(''); // yeni eklendi

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);
    // Kullanıcı id'si alınmalı
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
    if (!userId) {
      setSubmitMessage('Kullanıcı bulunamadı, lütfen tekrar giriş yapın.');
      return;
    }
    // Supabase'a ekle
    const { error } = await supabase.from('listings').insert([
      {
        user_id: userId,
        title: formData.loadTitle,
        load_type: formData.loadType,
        description: formData.loadDescription,
        origin: formData.loadOrigin,
        destination: formData.loadDestination,
        loading_date: formData.loadingDate || null,
        delivery_date: formData.deliveryDate || null,
        weight: formData.loadWeight ? Number(formData.loadWeight) : null,
        volume: formData.loadVolume ? Number(formData.loadVolume) : null,
        price: formData.setPrice ? Number(formData.setPrice) : null,
        offer_type: offerType,
        listing_number: formData.listingNumber,
        // Diğer alanlar eklenebilir
      }
    ]);
    if (error) {
      setSubmitMessage('Kayıt eklenemedi: ' + error.message);
    } else {
      setSubmitMessage('İlan başarıyla eklendi!');
      setTimeout(() => setActiveSection('my-listings'), 1200);
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

  const getRoleBackground = () => {
    if (offerType === 'buyer') {
      return 'bg-gradient-to-br from-blue-50 to-blue-100';
    } else if (offerType === 'seller') {
      return 'bg-gradient-to-br from-green-50 to-green-100';
    }
    return 'bg-white';
  };

  // Modlara özel araç/gemi/uçak/vagon tipleri
  const vehicleTypeOptions = {
    road: [
      { group: 'Kamyonlar', options: [
        'Kamyon - 3.5 Ton (Açık Kasa)',
        'Kamyon - 3.5 Ton (Kapalı Kasa)',
        'Kamyon - 5 Ton (Açık Kasa)',
        'Kamyon - 5 Ton (Kapalı Kasa)',
        'Kamyon - 10 Ton (Açık Kasa)',
        'Kamyon - 10 Ton (Kapalı Kasa)',
        'Kamyon - 10 Ton (Tenteli)',
        'Kamyon - 15 Ton (Açık Kasa)',
        'Kamyon - 15 Ton (Kapalı Kasa)',
        'Kamyon - 15 Ton (Tenteli)'
      ]},
      { group: 'Tır ve Çekiciler', options: [
        'Tır (Standart Dorse) - 90m³ / 40t',
        'Tır (Mega Dorse) - 100m³ / 40t',
        'Tır (Jumbo Dorse) - 120m³ / 40t',
        'Tır (Tenteli Dorse) - 40t',
        'Tır (Frigorifik Dorse - Isı Kontrollü) - 40t',
        'Tır (Konteyner Taşıyıcı) - 40t',
        'Tır (Platform) - 40t',
        'Tır (Frigorifik Çift Isı) - 40t'
      ]},
      { group: 'Kargo Araçları', options: [
        'Kargo Van - 3m³ (1000kg)',
        'Kargo Van - 6m³ (1500kg)',
        'Kargo Van - 10m³ (2000kg)',
        'Kargo Van - 15m³ (2500kg)'
      ]}
    ],
    sea: [
      { group: 'Konteyner Gemisi', options: [
        "20' Standart (20DC) - 33m³ / 28t",
        "40' Standart (40DC) - 67m³ / 28t",
        "40' Yüksek (40HC) - 76m³ / 28t",
        "20' Open Top - 32m³ / 28t",
        "40' Open Top - 66m³ / 28t",
        "20' Flat Rack - 28t",
        "40' Flat Rack - 40t",
        "20' Reefer - 28m³ / 25t",
        "40' Reefer - 60m³ / 25t"
      ]},
      { group: 'Dökme Yük Gemisi', options: [
        'Handysize (10,000-35,000 DWT)',
        'Handymax (35,000-60,000 DWT)',
        'Panamax (60,000-80,000 DWT)',
        'Capesize (80,000+ DWT)'
      ]},
      { group: 'Genel Kargo Gemisi', options: [
        'Küçük Tonaj (1,000-5,000 DWT)',
        'Orta Tonaj (5,000-15,000 DWT)',
        'Büyük Tonaj (15,000+ DWT)'
      ]},
      { group: 'Tanker', options: [
        'Ürün Tankeri (10,000-60,000 DWT)',
        'Kimyasal Tanker (5,000-40,000 DWT)',
        'Ham Petrol Tankeri (60,000+ DWT)',
        'LPG Tankeri (5,000-80,000 m³)',
        'LNG Tankeri (150,000-180,000 m³)'
      ]},
      { group: 'RO-RO', options: [
        'Küçük RO-RO (100-200 araç)',
        'Orta RO-RO (200-500 araç)',
        'Büyük RO-RO (500+ araç)'
      ]},
      { group: 'Feribot ve Yük Teknesi', options: [
        'Kargo Feribotu',
        'Karma Feribot (Yolcu+Yük)',
        'Küçük Yük Teknesi (500-1,000 DWT)',
        'Büyük Yük Teknesi (1,000+ DWT)'
      ]}
    ],
    air: [
      { group: 'Kargo Tipi', options: [
        'Standart Kargo',
        'Büyük Hacimli Kargo',
        'Özel Kargo'
      ]}
    ],
    rail: [
      { group: 'Vagon Tipi', options: [
        'Açık Yük Vagonu',
        'Kapalı Yük Vagonu',
        'Konteyner Vagonu',
        'Tanker Vagonu'
      ]}
    ]
  };

  // Modlara özel evraklar
  const documentOptions = {
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
      'DWT / Draft Survey Raporu'
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className={`rounded-3xl shadow-lg p-6 transition-all duration-300 ${getRoleBackground()}`}> 
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => setActiveSection('my-listings')}
              className="mr-4 p-2 text-gray-600 hover:text-primary-600 transition-colors rounded-full"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Yeni Nakliye İlanı Oluştur</h1>
          </div>
        </div>

        {/* Taşıma Modu Seçimi */}
        <div className="mb-6">
          <label htmlFor="transportMode" className="block text-sm font-medium text-gray-700 mb-2">
            Taşıma Modu Seçiniz *
          </label>
          <select
            id="transportMode"
            name="transportMode"
            value={transportMode}
            onChange={e => setTransportMode(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm"
            required
          >
            <option value="">Seçiniz</option>
            <option value="road">🚚 Karayolu</option>
            <option value="sea">🚢 Denizyolu</option>
            <option value="air">✈️ Havayolu</option>
            <option value="rail">🚂 Demiryolu</option>
          </select>
        </div>

        {/* Ortak Alanlar */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* İlan No */}
            <div>
              <label htmlFor="listingNumber" className="block text-sm font-medium text-gray-700 mb-2">İlan No</label>
              <input type="text" id="listingNumber" name="listingNumber" value={formData.listingNumber} className="w-full px-6 py-4 bg-gray-50 border border-gray-300 rounded-full text-gray-500 cursor-not-allowed shadow-sm" readOnly />
            </div>
            {/* İlan Başlığı */}
            <div>
              <label htmlFor="loadTitle" className="block text-sm font-medium text-gray-700 mb-2">İlan Başlığı *</label>
              <input type="text" id="loadTitle" name="loadTitle" value={formData.loadTitle} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm" required placeholder="Örn: İstanbul-Ankara Tekstil Yükü" />
            </div>
            {/* Firma Adı (Opsiyonel) */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">Firma Adı (Opsiyonel)</label>
              <input type="text" id="companyName" name="companyName" value={formData.companyName || ''} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm" placeholder="Firma adı (isteğe bağlı)" />
            </div>
            {/* İletişim Bilgisi */}
            <div>
              <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-2">İletişim Bilgisi (E-posta/Telefon) *</label>
              <input type="text" id="contactInfo" name="contactInfo" value={formData.contactInfo || ''} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm" required placeholder="E-posta veya telefon" />
            </div>
          </div>

          {/* Dinamik Mod Alanları: Araç/Gemi/Uçak/Vagon Tipi */}
          {transportMode && (
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {transportMode === 'road' && 'Araç Tipi *'}
                    {transportMode === 'sea' && 'Gemi Tipi *'}
                    {transportMode === 'air' && 'Kargo/Uçak Tipi *'}
                    {transportMode === 'rail' && 'Vagon Tipi *'}
                  </label>
                  <select
                    name={
                      transportMode === 'road' ? 'road_vehicleType' :
                      transportMode === 'sea' ? 'sea_vesselType' :
                      transportMode === 'air' ? 'air_aircraftType' :
                      'rail_wagonType'
                    }
                    value={
                      transportMode === 'road' ? formData.road_vehicleType :
                      transportMode === 'sea' ? formData.sea_vesselType :
                      transportMode === 'air' ? formData.air_aircraftType :
                      formData.rail_wagonType
                    }
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border border-gray-300 rounded-full"
                    required
                  >
                    <option value="">Seçiniz</option>
                    {vehicleTypeOptions[transportMode].map((group, idx) => (
                      <optgroup key={group.group + idx} label={group.group}>
                        {group.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                {/* Diğer modlara özel alanlar burada devam edecek */}
              </div>
            </div>
          )}
          {transportMode === 'road' && (
            <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
              <h3 className="text-lg font-bold mb-4">Karayolu Taşımacılığı Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plaka/Şasi No *</label>
                  <input type="text" name="road_plate" value={formData.road_plate} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required placeholder="Plaka veya Şasi No" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kapasite (ton/m³) *</label>
                  <input type="text" name="road_capacity" value={formData.road_capacity} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required placeholder="Örn: 20 ton, 60 m³" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Güzergah *</label>
                  <input type="text" name="road_route" value={formData.road_route} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required placeholder="Kalkış - Varış" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Müsaitlik Tarihi *</label>
                  <input type="date" name="road_availabilityDate" value={formData.road_availabilityDate} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sürücü Bilgisi</label>
                  <input type="text" name="road_driverInfo" value={formData.road_driverInfo} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="Ad Soyad, Telefon" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Belge/Ek Evrak</label>
                  <input type="text" name="road_documents" value={formData.road_documents} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="SRC, Yetki Belgesi vb." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea name="road_note" value={formData.road_note} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-2xl" rows={2} placeholder="Ek açıklama veya notlar" />
                </div>
              </div>
            </div>
          )}
          {transportMode === 'sea' && (
            <div className="mt-8 p-6 bg-cyan-50 rounded-2xl border border-cyan-200">
              <h3 className="text-lg font-bold mb-4">Denizyolu Taşımacılığı Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gemi Adı / IMO / MMSI *</label>
                  <input type="text" name="sea_vesselName" value={formData.sea_vesselName} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required placeholder="Gemi adı veya IMO/MMSI" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gemi Tipi *</label>
                  <input type="text" name="sea_vesselType" value={formData.sea_vesselType} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required placeholder="Konteyner, Dökme, Tanker vb." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">DWT / Kapasite *</label>
                  <input type="text" name="sea_dwt" value={formData.sea_dwt} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required placeholder="Örn: 5000 DWT" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Boyutlar (LOA, Beam)</label>
                  <input type="text" name="sea_dimensions" value={formData.sea_dimensions} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="Uzunluk, Genişlik" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kalkış/Varış Limanı *</label>
                  <input type="text" name="sea_ports" value={formData.sea_ports} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required placeholder="Kalkış - Varış Limanı" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Laycan Tarihi *</label>
                  <input type="date" name="sea_laycan" value={formData.sea_laycan} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Yük Tipi Uyumluluğu</label>
                  <input type="text" name="sea_cargoCompatibility" value={formData.sea_cargoCompatibility} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="Dökme, Konteyner, Sıvı vb." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Navlun Tipi</label>
                  <input type="text" name="sea_freightType" value={formData.sea_freightType} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="Spot, Time Charter vb." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Charterer/Broker</label>
                  <input type="text" name="sea_charterer" value={formData.sea_charterer} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="Firma veya Broker" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sertifika/Evrak</label>
                  <input type="text" name="sea_certificates" value={formData.sea_certificates} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="Class, ISM, ISPS vb." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea name="sea_note" value={formData.sea_note} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-2xl" rows={2} placeholder="Ek açıklama veya notlar" />
                </div>
              </div>
            </div>
          )}
          {transportMode === 'air' && (
            <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-200">
              <h3 className="text-lg font-bold mb-4">Havayolu Taşımacılığı Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Uçak Tipi/Modeli *</label>
                  <input type="text" name="air_aircraftType" value={formData.air_aircraftType} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required placeholder="Boeing 747, Airbus A330 vb." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kargo Kapasitesi *</label>
                  <input type="text" name="air_capacity" value={formData.air_capacity} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required placeholder="Örn: 100 ton" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kalkış/Varış Havalimanı *</label>
                  <input type="text" name="air_airports" value={formData.air_airports} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required placeholder="Kalkış - Varış Havalimanı" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Müsaitlik Tarihi *</label>
                  <input type="date" name="air_availabilityDate" value={formData.air_availabilityDate} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Uçuş Numarası</label>
                  <input type="text" name="air_flightNumber" value={formData.air_flightNumber} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="Uçuş No" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Yük Tipi</label>
                  <input type="text" name="air_cargoType" value={formData.air_cargoType} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="Genel, Tehlikeli, Canlı Hayvan vb." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operatör/Firma</label>
                  <input type="text" name="air_operator" value={formData.air_operator} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="Firma adı" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İletişim Bilgisi</label>
                  <input type="text" name="air_contact" value={formData.air_contact} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="Telefon/E-posta" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Belge/Evrak</label>
                  <input type="text" name="air_documents" value={formData.air_documents} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="AOC, Sigorta vb." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea name="air_note" value={formData.air_note} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-2xl" rows={2} placeholder="Ek açıklama veya notlar" />
                </div>
              </div>
            </div>
          )}
          {transportMode === 'rail' && (
            <div className="mt-8 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
              <h3 className="text-lg font-bold mb-4">Demiryolu Taşımacılığı Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vagon Tipi *</label>
                  <input type="text" name="rail_wagonType" value={formData.rail_wagonType} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required placeholder="Kapalı, Açık, Sarnıç vb." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tren/No *</label>
                  <input type="text" name="rail_trainNumber" value={formData.rail_trainNumber} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required placeholder="Tren veya Vagon No" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kapasite *</label>
                  <input type="text" name="rail_capacity" value={formData.rail_capacity} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required placeholder="Örn: 60 ton" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kalkış/Varış İstasyonu *</label>
                  <input type="text" name="rail_stations" value={formData.rail_stations} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required placeholder="Kalkış - Varış İstasyonu" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Müsaitlik Tarihi *</label>
                  <input type="date" name="rail_availabilityDate" value={formData.rail_availabilityDate} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Yük Tipi</label>
                  <input type="text" name="rail_cargoType" value={formData.rail_cargoType} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="Kömür, Tahıl, Konteyner vb." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operatör/Firma</label>
                  <input type="text" name="rail_operator" value={formData.rail_operator} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="Firma adı" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Belge/Evrak</label>
                  <input type="text" name="rail_documents" value={formData.rail_documents} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-full" placeholder="TCDD Yetki, Sigorta vb." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea name="rail_note" value={formData.rail_note} onChange={handleInputChange} className="w-full px-6 py-4 border border-gray-300 rounded-2xl" rows={2} placeholder="Ek açıklama veya notlar" />
                </div>
              </div>
            </div>
          )}

          {/* Taşıma Modu seçimine göre Mevcut Araç Tipi ve Gerekli Evraklar */}
          {transportMode && (
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mevcut Araç Tipi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {transportMode === 'road' && 'Mevcut Araç Tipi *'}
                    {transportMode === 'sea' && 'Mevcut Gemi Tipi *'}
                    {transportMode === 'air' && 'Mevcut Kargo/Uçak Tipi *'}
                    {transportMode === 'rail' && 'Mevcut Vagon Tipi *'}
                  </label>
                  <select
                    name={
                      transportMode === 'road' ? 'road_vehicleType' :
                      transportMode === 'sea' ? 'sea_vesselType' :
                      transportMode === 'air' ? 'air_aircraftType' :
                      'rail_wagonType'
                    }
                    value={
                      transportMode === 'road' ? formData.road_vehicleType :
                      transportMode === 'sea' ? formData.sea_vesselType :
                      transportMode === 'air' ? formData.air_aircraftType :
                      formData.rail_wagonType
                    }
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border border-gray-300 rounded-full"
                    required
                  >
                    <option value="">Seçiniz</option>
                    {vehicleTypeOptions[transportMode].map((group, idx) => (
                      <optgroup key={group.group + idx} label={group.group}>
                        {group.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                {/* Gerekli Evraklar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gerekli Evraklar *</label>
                  <select
                    name="requiredDocuments"
                    multiple
                    value={formData.requiredDocuments || []}
                    onChange={e => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setFormData(prev => ({ ...prev, requiredDocuments: selected }));
                    }}
                    className="w-full px-6 py-4 border border-gray-300 rounded-2xl h-40"
                    required
                  >
                    {documentOptions[transportMode].map(doc => (
                      <option key={doc} value={doc}>{doc}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">Birden fazla evrak seçmek için Ctrl (Windows) veya Cmd (Mac) tuşunu kullanın.</p>
                </div>
              </div>
            </div>
          )}
          {/* ...diğer form alanları ve butonlar... */}
        </form>
      </div>
    </div>
  );
};

export default CreateLoadListingSection;