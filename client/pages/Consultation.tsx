import React, { useState } from 'react';
import { Phone, MessageCircle, Clock, CheckCircle, User, Building, Mail, MapPin, Package, Plane, Ship, Truck } from 'lucide-react';

const Consultation = () => {
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
    hsCode: '',
    contactPreference: '',
    additionalNotes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
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
              شكرًا لك على طلب الاستشارة المجانية. سيتواصل معك أحد خبرائنا خلال 24 ساعة للمناقشة والمساعدة.
            </p>
            <div className="bg-gray-card rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-navy-dark mb-3">الخطوات التالية:</h3>
              <ul className="space-y-2 text-right">
                <li className="flex items-center space-x-2 space-x-reverse">
                  <CheckCircle className="w-5 h-5 text-status-success" />
                  <span>مراجعة طلبك من قبل فريق الخبراء</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Phone className="w-5 h-5 text-navy-light" />
                  <span>اتصال مباشر لمناقشة احتياجاتك</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Mail className="w-5 h-5 text-navy-light" />
                  <span>إرسال عرض سعر مخصص</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsSubmitted(false)}
                className="btn-navy-outline"
              >
                طلب استشارة أخرى
              </button>
              <a
                href="https://wa.me/201234567890"
                className="bg-status-success hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 space-x-reverse"
              >
                <MessageCircle className="w-5 h-5" />
                <span>تواصل فوري عبر واتساب</span>
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
              استشارة مجانية مع خبرائنا
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              احصل على استشارة متخصصة مجانية لتحديد أفضل الحلول الجمركية لأعمالك
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Clock className="w-12 h-12 mx-auto mb-4 text-gray-200" />
                <h3 className="text-lg font-semibold mb-2">استجابة سريعة</h3>
                <p className="text-gray-200">نتواصل معك خلال 24 ساعة</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <User className="w-12 h-12 mx-auto mb-4 text-gray-200" />
                <h3 className="text-lg font-semibold mb-2">خبراء معتمدون</h3>
                <p className="text-gray-200">فريق من المخلصين المعتمدين</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-200" />
                <h3 className="text-lg font-semibold mb-2">حلول مخصصة</h3>
                <p className="text-gray-200">خطة عمل تناسب احتياجاتك</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy-dark mb-4">
                املأ النموذج للحصول على استشارتك المجانية
              </h2>
              <p className="text-xl text-gray-text">
                كلما كانت المعلومات أكثر تفصيلاً، كلما كانت الاستشارة أدق وأفضل
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-gray-card rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-navy-dark mb-6">البيانات الشخصية</h3>
                <div className="grid md:grid-cols-2 gap-6">
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
                      رقم الموبايل <span className="text-red-500">*</span>
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
                      المدينة / ميناء الوصول <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                    >
                      <option value="">اختر المدينة أو الميناء</option>
                      <option value="القاهرة">القاهرة</option>
                      <option value="الإسكندرية">الإسكندرية</option>
                      <option value="السويس">السويس</option>
                      <option value="دمياط">دمياط</option>
                      <option value="سفاجا">سفاجا</option>
                      <option value="العريش">العريش</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Operation Details */}
              <div className="bg-gray-card rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-navy-dark mb-6">تفاصيل العملية</h3>
                <div className="grid md:grid-cols-2 gap-6">
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
                      <option value="بحري">بحري</option>
                      <option value="جوي">جوي</option>
                      <option value="بري">بري</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Cargo Information */}
              <div className="bg-gray-card rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-navy-dark mb-6">معلومات الشحنة</h3>
                <div className="space-y-6">
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
                      placeholder="اكتب وصفًا تفصيليًا للبضاعة..."
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
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
                        عدد الطرود
                      </label>
                      <input
                        type="number"
                        name="packages"
                        value={formData.packages}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                        placeholder="50"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
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
                        HS Code (إن وجد)
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
              </div>

              {/* Contact Preferences */}
              <div className="bg-gray-card rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-navy-dark mb-6">تفضيلات التواصل</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-dark font-medium mb-2">
                      طريقة التواصل المفضلة <span className="text-red-500">*</span>
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
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
                      <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
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
                      <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                        <input
                          type="radio"
                          name="contactPreference"
                          value="email"
                          checked={formData.contactPreference === 'email'}
                          onChange={handleInputChange}
                          className="text-navy-light"
                        />
                        <Mail className="w-5 h-5 text-navy-light" />
                        <span>بريد إلك��روني</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-dark font-medium mb-2">
                      ملاحظات إضافية
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right"
                      placeholder="أي معلومات إضافية تريد مشاركتها معنا..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn-navy text-lg px-12 py-4"
                >
                  أرسل طلب الاستشارة المجانية
                </button>
                <p className="text-sm text-gray-text mt-4">
                  بإرسال هذا النموذج، أنت توافق على سياسة الخصوصية وشروط الاستخدام
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="bg-navy-dark text-white py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              تحتاج مساعدة فورية؟
            </h2>
            <p className="text-xl text-gray-200">
              تواصل معنا مباشرة للحصول على المساعدة السريعة
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <a
              href="tel:+201234567890"
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all text-center"
            >
              <Phone className="w-12 h-12 mx-auto mb-4 text-gray-200" />
              <h3 className="text-lg font-semibold mb-2">اتصل بنا</h3>
              <p className="text-gray-200">+20 10 1234 5678</p>
            </a>
            <a
              href="https://wa.me/201234567890"
              className="bg-status-success/20 backdrop-blur-sm rounded-xl p-6 hover:bg-status-success/30 transition-all text-center"
            >
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-200" />
              <h3 className="text-lg font-semibold mb-2">واتساب</h3>
              <p className="text-gray-200">رد فوري على استفساراتك</p>
            </a>
            <a
              href="mailto:info@customsclearance.com"
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all text-center"
            >
              <Mail className="w-12 h-12 mx-auto mb-4 text-gray-200" />
              <h3 className="text-lg font-semibold mb-2">بريد إلكتروني</h3>
              <p className="text-gray-200">info@customsclearance.com</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultation;
