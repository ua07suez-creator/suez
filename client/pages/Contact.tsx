import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Upload, CheckCircle, Globe } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    city: '',
    operationType: '',
    transportMethod: '',
    cargoDescription: '',
    weight: '',
    volume: '',
    packages: '',
    value: '',
    incoterms: '',
    hsCode: '',
    contactPreference: '',
    files: [] as File[],
    privacyAgreement: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData({
        ...formData,
        files: [...formData.files, ...newFiles]
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFormData({
        ...formData,
        files: [...formData.files, ...newFiles]
      });
    }
  };

  const removeFile = (index: number) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      files: newFiles
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAgreement) {
      alert('يرجى الموافقة على سياسة الخصوصية للمتابعة');
      return;
    }
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="section-spacing">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-status-success rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-navy-dark mb-4">
              تم إرسال طلبك بنجاح!
            </h1>
            <p className="text-xl text-gray-text mb-8">
              شكرًا لك على طلب عرض السعر. سنقوم بمراجعة تفاصيل طلبك وإرسال عرض سعر مفصل خلال 24-48 ساعة.
            </p>
            <div className="bg-gray-card rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-navy-dark mb-3">ما سيحدث الآن:</h3>
              <ul className="space-y-2 text-right">
                <li className="flex items-center space-x-2 space-x-reverse">
                  <CheckCircle className="w-5 h-5 text-status-success" />
                  <span>مراجعة تفصيلية لطلبك من قبل فريق التسعير</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Mail className="w-5 h-5 text-navy-light" />
                  <span>إرسال عرض سعر مفصل عبر البريد الإلكتروني</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Phone className="w-5 h-5 text-navy-light" />
                  <span>متابعة شخصية لمناقشة التفاصيل</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsSubmitted(false)}
                className="btn-navy-outline"
              >
                طلب عرض سعر آخر
              </button>
              <a
                href="https://wa.me/201234567890"
                className="bg-status-success hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 space-x-reverse"
              >
                <MessageCircle className="w-5 h-5" />
                <span>تواصل عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-navy-light text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              اتصل بنا / اطلب عرض سعر
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              تواصل معنا للحصول على عرض سعر مخصص وتفصيلي لجميع احتياجاتك في التخليص الجمركي
            </p>
          </div>
        </div>
      </section>

      <div className="section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-navy-dark mb-6">
                  نموذج طلب عرض السعر
                </h2>
                <p className="text-gray-text mb-8">
                  املأ النموذج التالي بأكبر قدر من التفاصيل للحصول على عرض سعر دقيق ومناسب
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-navy-dark mb-4">البيانات الأساسية</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-dark font-medium mb-2">
                          الاسم الكامل <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-dark font-medium mb-2">
                          اسم الشركة
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                          placeholder="اسم الشركة أو المؤسسة"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-dark font-medium mb-2">
                          رقم الموبايل (مصر) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                          placeholder="+20 10 1234 5678"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-dark font-medium mb-2">
                          البريد الإلكتروني <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-left"
                          placeholder="example@email.com"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-dark font-medium mb-2">
                          مدينة/ميناء الوصول <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                        >
                          <option value="">اختر المدينة أو الميناء</option>
                          <option value="ميناء الإسكندرية">ميناء الإسكندرية</option>
                          <option value="ميناء السويس">ميناء السويس</option>
                          <option value="ميناء دمياط">ميناء دمياط</option>
                          <option value="ميناء سفاجا">ميناء سفاجا</option>
                          <option value="مطار القاهرة">مطار القاهرة الدولي</option>
                          <option value="مطار برج العرب">مطار برج العرب</option>
                          <option value="منفذ رفح">منفذ رفح البري</option>
                          <option value="منفذ طابا">منفذ طابا البري</option>
                          <option value="منفذ السلوم">منفذ السلوم البري</option>
                          <option value="أخرى">أخرى</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Operation Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-navy-dark mb-4">تفاصيل العملية</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-dark font-medium mb-2">
                          نوع العملية <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="operationType"
                          value={formData.operationType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                        >
                          <option value="">اختر نوع العملية</option>
                          <option value="وارد">وارد (استيراد)</option>
                          <option value="صادر">صادر (تصدير)</option>
                          <option value="ترانزيت">ترانزيت</option>
                          <option value="منطقة حرة">منطقة حرة</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-dark font-medium mb-2">
                          وسيلة النقل <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="transportMethod"
                          value={formData.transportMethod}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                        >
                          <option value="">اختر وسيلة النقل</option>
                          <option value="بحري">بحري (Sea Freight)</option>
                          <option value="جوي">جوي (Air Freight)</option>
                          <option value="بري">بري (Land Freight)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Cargo Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-navy-dark mb-4">تفاصيل الشحنة</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-dark font-medium mb-2">
                          وصف البضاعة <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="cargoDescription"
                          value={formData.cargoDescription}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                          placeholder="اكتب وصفًا مفصلاً للبضاعة (نوع البضاعة، المواد، الاستخدام...)"
                        />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-gray-dark font-medium mb-2">
                            الوزن الإجمالي (كجم)
                          </label>
                          <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                            placeholder="1000"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-dark font-medium mb-2">
                            الحجم (متر مكعب)
                          </label>
                          <input
                            type="number"
                            name="volume"
                            value={formData.volume}
                            onChange={handleInputChange}
                            step="0.1"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                            placeholder="10.5"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-dark font-medium mb-2">
                            عدد الطرود/الحاويات
                          </label>
                          <input
                            type="number"
                            name="packages"
                            value={formData.packages}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                            placeholder="1"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-dark font-medium mb-2">
                            القيمة التقريبية (جنيه مصري)
                          </label>
                          <input
                            type="number"
                            name="value"
                            value={formData.value}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                            placeholder="100000"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-dark font-medium mb-2">
                            إنكوترمز (اختياري)
                          </label>
                          <select
                            name="incoterms"
                            value={formData.incoterms}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                          >
                            <option value="">اختر إنكوترمز</option>
                            <option value="FOB">FOB - Free On Board</option>
                            <option value="CIF">CIF - Cost, Insurance & Freight</option>
                            <option value="CFR">CFR - Cost & Freight</option>
                            <option value="EXW">EXW - Ex Works</option>
                            <option value="FCA">FCA - Free Carrier</option>
                            <option value="DAP">DAP - Delivered at Place</option>
                            <option value="DDP">DDP - Delivered Duty Paid</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-dark font-medium mb-2">
                          HS Code (اختياري)
                        </label>
                        <input
                          type="text"
                          name="hsCode"
                          value={formData.hsCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-left"
                          placeholder="1234.56.78"
                        />
                      </div>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <h3 className="text-xl font-semibold text-navy-dark mb-4">المرفقات (إن وجدت)</h3>
                    <div
                      className={`border-2 border-dashed ${isDragOver ? 'border-navy-light bg-navy-light/10' : 'border-gray-300'} rounded-lg p-8 text-center transition-colors`}
                      onDrop={handleDrop}
                      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                      onDragLeave={() => setIsDragOver(false)}
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-text mb-4">
                        اسحب الملفات هنا أو اضغط لاختيار الملفات
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="btn-navy-outline cursor-pointer inline-block"
                      >
                        اختيار الملفات
                      </label>
                      <p className="text-sm text-gray-text mt-2">
                        يمكن رفع: PDF, JPG, PNG, DOCX, XLSX (حد أقصى 20MB/ملف)
                      </p>
                    </div>
                    {formData.files.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-dark mb-2">الملفات المرفقة:</h4>
                        <div className="space-y-2">
                          {formData.files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
                              <span className="text-sm text-gray-text">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                حذف
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact Preference */}
                  <div>
                    <h3 className="text-xl font-semibold text-navy-dark mb-4">تفضيل التواصل</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                        <input
                          type="radio"
                          name="contactPreference"
                          value="phone"
                          checked={formData.contactPreference === 'phone'}
                          onChange={handleInputChange}
                          className="text-navy-light"
                        />
                        <Phone className="w-5 h-5 text-navy-light" />
                        <span>مكالمة هاتفية</span>
                      </label>
                      <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                        <input
                          type="radio"
                          name="contactPreference"
                          value="whatsapp"
                          checked={formData.contactPreference === 'whatsapp'}
                          onChange={handleInputChange}
                          className="text-navy-light"
                        />
                        <MessageCircle className="w-5 h-5 text-navy-light" />
                        <span>واتساب</span>
                      </label>
                      <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                        <input
                          type="radio"
                          name="contactPreference"
                          value="email"
                          checked={formData.contactPreference === 'email'}
                          onChange={handleInputChange}
                          className="text-navy-light"
                        />
                        <Mail className="w-5 h-5 text-navy-light" />
                        <span>بريد إلكتروني</span>
                      </label>
                    </div>
                  </div>

                  {/* Privacy Agreement */}
                  <div className="bg-gray-100 rounded-lg p-4">
                    <label className="flex items-start space-x-3 space-x-reverse cursor-pointer">
                      <input
                        type="checkbox"
                        name="privacyAgreement"
                        checked={formData.privacyAgreement}
                        onChange={handleInputChange}
                        className="mt-1 text-navy-light"
                        required
                      />
                      <span className="text-sm text-gray-dark">
                        أوافق على <a href="/privacy" className="text-navy-light hover:underline">سياسة الخصوصية</a> و
                        <a href="/terms" className="text-navy-light hover:underline"> شروط الاستخدام</a>
                        وأسمح للشركة بالتواصل معي لتقديم عرض السعر المطلوب.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn-navy text-lg px-8 py-4"
                      disabled={!formData.privacyAgreement}
                    >
                      إرسال طلب عرض السعر
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-navy-light text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6">بيانات التواصل</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">هاتف المكتب</p>
                      <p className="text-gray-200">+20 10 1234 5678</p>
                      <p className="text-gray-200">+20 12 3456 7890</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <MessageCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">واتساب</p>
                      <p className="text-gray-200">+20 10 1234 5678</p>
                      <p className="text-sm text-gray-200">متاح 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">البريد الإلكتروني</p>
                      <p className="text-gray-200">info@customsclearance.com</p>
                      <p className="text-gray-200">quote@customsclearance.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">العنوان</p>
                      <p className="text-gray-200">القاهرة، مصر</p>
                      <p className="text-gray-200">مكاتب في الإسكندرية والسويس</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">ساعات العمل</p>
                      <p className="text-gray-200">الأحد - الخميس: 9:00 ص - 6:00 م</p>
                      <p className="text-gray-200">الجمعة - السبت: 10:00 ص - 4:00 م</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-card rounded-xl p-6">
                <h3 className="text-xl font-semibold text-navy-dark mb-4">تواصل سريع</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+201234567890"
                    className="w-full btn-navy-outline text-center flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <Phone className="w-4 h-4" />
                    <span>اتصل الآن</span>
                  </a>
                  <a
                    href="https://wa.me/201234567890"
                    className="w-full bg-status-success hover:bg-green-600 text-white font-semibold px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>واتساب</span>
                  </a>
                  <a
                    href="mailto:info@customsclearance.com"
                    className="w-full btn-navy-outline text-center flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <Mail className="w-4 h-4" />
                    <span>بريد إلكتروني</span>
                  </a>
                </div>
              </div>

              {/* Service Areas */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-navy-dark mb-4">مناطق خدماتنا</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2 space-x-reverse">
                    <CheckCircle className="w-4 h-4 text-status-success" />
                    <span>ميناء الإسكندرية</span>
                  </li>
                  <li className="flex items-center space-x-2 space-x-reverse">
                    <CheckCircle className="w-4 h-4 text-status-success" />
                    <span>ميناء السويس</span>
                  </li>
                  <li className="flex items-center space-x-2 space-x-reverse">
                    <CheckCircle className="w-4 h-4 text-status-success" />
                    <span>ميناء دمياط</span>
                  </li>
                  <li className="flex items-center space-x-2 space-x-reverse">
                    <CheckCircle className="w-4 h-4 text-status-success" />
                    <span>مطار القاهرة الدولي</span>
                  </li>
                  <li className="flex items-center space-x-2 space-x-reverse">
                    <CheckCircle className="w-4 h-4 text-status-success" />
                    <span>المنافذ البرية</span>
                  </li>
                  <li className="flex items-center space-x-2 space-x-reverse">
                    <CheckCircle className="w-4 h-4 text-status-success" />
                    <span>المناطق الحرة</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
