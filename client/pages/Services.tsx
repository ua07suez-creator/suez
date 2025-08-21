import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Ship, 
  Plane, 
  Truck, 
  FileText, 
  Globe, 
  CheckCircle,
  Clock,
  Star,
  ArrowLeft,
  MapPin,
  Shield,
  Zap
} from 'lucide-react';

const Services = () => {
  const mainServices = [
    {
      id: 'sea-freight',
      icon: Ship,
      title: "التخليص البحري",
      subtitle: "Sea Freight Clearance",
      description: "خدمات تخليص جمركي شاملة للشحن البحري عبر جميع الموانئ المصرية مع ضمان السرعة والدقة",
      features: [
        "تخليص الحاويات الكاملة FCL",
        "تخليص الشحنات المجمعة LCL", 
        "التعامل مع البضائع الكبيرة والث��يلة",
        "خدمات الفحص والمعاينة"
      ],
      ports: ["ميناء الإسكندرية", "ميناء السويس", "ميناء دمياط", "ميناء سفاجا"],
      averageTime: "3-5 أيام",
      specialties: ["المواد الخام", "الآلات الثقيلة", "السيارات", "المنتجات الصناعية"],
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      id: 'air-freight',
      icon: Plane,
      title: "التخليص الجوي",
      subtitle: "Air Freight Clearance",
      description: "تخليص سريع ودقيق للبضائع المستوردة والمصدرة عبر المطارات مع أولوية للشحنات العاجلة",
      features: [
        "تخليص الشحن السريع Express",
        "البضائع القابلة للتلف",
        "الشحنات عالية القيمة",
        "خدمة 24 ساعة للطوارئ"
      ],
      ports: ["مطار القاهرة الدولي", "مطار برج العرب", "مطار شرم الشيخ", "مطار أسوان"],
      averageTime: "24-48 ساعة",
      specialties: ["الإلكترونيات", "الأدوية", "المجوهرات", "قطع الغيار"],
      bgColor: "bg-sky-50",
      iconColor: "text-sky-600"
    },
    {
      id: 'land-freight',
      icon: Truck,
      title: "التخليص البري",
      subtitle: "Land Freight Clearance",
      description: "خدمات التخليص الجمركي للشحن البري عبر المنافذ الحدودية مع التركيز على التجارة العربية",
      features: [
        "تخليص الشاحنات والمقطورات",
        "النقل المبرد والخاص",
        "البضائع الخطرة المرخصة",
        "التنسيق مع الدول المجاورة"
      ],
      ports: ["منفذ رفح", "منفذ طابا", "منفذ السلوم", "منفذ قسطل"],
      averageTime: "1-2 يوم",
      specialties: ["المنتجات الزراعية", "مواد البناء", "المنسوجات", "الوقود"],
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 'consultation',
      icon: FileText,
      title: "الاستشارات الجمركية",
      subtitle: "Customs Consultation",
      description: "استشارات متخصصة في القوانين والإجراءات الجمركية لضمان الامتثال وتجنب المشاكل",
      features: [
        "تصنيف البضائع HS Code",
        "حساب الرسوم والضرائب",
        "مراجعة المستندات",
        "التدريب والتأهيل"
      ],
      ports: ["جميع المواقع", "استشارات عن بُعد", "زيارات ميدانية", "ورش عمل"],
      averageTime: "فوري - أسبوع",
      specialties: ["القوانين الجمركية", "اتفاقيات التجارة", "النزاعات الجمركية", "التخطيط الضريبي"],
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      id: 'free-zones',
      icon: Globe,
      title: "المناطق الحرة",
      subtitle: "Free Zones Services",
      description: "خدمات متخصصة للتعامل مع المناطق الحرة والاستثمارية مع فهم عميق للقوانين الخاصة",
      features: [
        "الإدخال والإخراج",
        "التخزين والتصنيع",
        "إعادة التصدير",
        "التحويل للسوق المحلي"
      ],
      ports: ["منطقة السويس الحرة", "منطقة الإسكندرية", "منطقة القاهرة", "منطقة دمياط"],
      averageTime: "2-4 أيام",
      specialties: ["التصنيع", "التجميع", "التوزيع", "الخدمات اللوجستية"],
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      id: 'import-export',
      icon: CheckCircle,
      title: "تخليص وارد وصادر",
      subtitle: "Import & Export Clearance",
      description: "خدمات شاملة للواردات والصادرات مع متابعة دقيقة لجميع مراحل العملية من البداية للنهاية",
      features: [
        "إجراءات الاستيراد الكاملة",
        "تسهيل الصادرات",
        "ترانزيت البضائع",
        "الشحن متعدد الوسائط"
      ],
      ports: ["جميع المنافذ", "خدمة متكاملة", "متابعة شاملة", "تقارير دورية"],
      averageTime: "حسب نوع البضاعة",
      specialties: ["جميع أنواع البضائع", "التجارة الدولية", "اللوجستيات", "إدارة سلسلة التوريد"],
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600"
    }
  ];

  const additionalServices = [
    {
      icon: Shield,
      title: "التأمين على البضائع",
      description: "تأمين شامل على البضائع أثناء عمليات التخليص والنقل"
    },
    {
      icon: FileText,
      title: "إعداد المستندات",
      description: "إعداد وتجهيز جميع المستندات المطلوبة للتخليص الجمركي"
    },
    {
      icon: Zap,
      title: "التخليص السريع",
      description: "خدمة تخليص عاجل للشحنات الحساسة والطارئة"
    },
    {
      icon: MapPin,
      title: "تتبع الشحنات",
      description: "نظام تتبع متقدم لمعرفة موقع وحالة شحنتك في كل وقت"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "استلام الطلب",
      description: "تقديم طلب التخليص مع المستندات الأولية"
    },
    {
      step: "02",
      title: "مراجعة المستندات",
      description: "فحص وتدقيق جميع المستندات والأوراق المطلوبة"
    },
    {
      step: "03",
      title: "التقديم للجمارك",
      description: "تقديم الإقرار الجمركي والمتابعة مع الجهات المختصة"
    },
    {
      step: "04",
      title: "الفحص والمعاينة",
      description: "تسهيل عملية الفحص الجمركي وحل أي مشاكل"
    },
    {
      step: "05",
      title: "دفع الرسوم",
      description: "حساب ودفع جميع الرسوم والضرائب المستحقة"
    },
    {
      step: "06",
      title: "الإفراج والتسليم",
      description: "الحصول على الإفراج وتسليم البضائع للعميل"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-navy-light text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              خدماتنا المتميزة
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              مجموعة شاملة من خدمات التخليص الجمركي والاستشارات المتخصصة لتلبية جميع احتياجاتكم التجارية
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Clock className="w-12 h-12 mx-auto mb-4 text-gray-200" />
                <h3 className="text-lg font-semibold mb-2">سرعة في التنفيذ</h3>
                <p className="text-gray-200">أسرع أوقات التخليص في السوق</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Shield className="w-12 h-12 mx-auto mb-4 text-gray-200" />
                <h3 className="text-lg font-semibold mb-2">أمان وضمان</h3>
                <p className="text-gray-200">ضمانات شاملة على جميع العمليات</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-12 h-12 mx-auto mb-4 text-gray-200" />
                <h3 className="text-lg font-semibold mb-2">جودة متميزة</h3>
                <p className="text-gray-200">معايير عالية في الخدمة والدقة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-dark mb-4">
              خدماتنا الرئيسية
            </h2>
            <p className="text-xl text-gray-text max-w-3xl mx-auto">
              نقدم خدمات متكاملة في جميع مجالات التخليص الجمركي
            </p>
          </div>
          
          <div className="space-y-12">
            {mainServices.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={service.id} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                    <div className={`${service.bgColor} rounded-2xl p-8 h-full flex items-center justify-center`}>
                      <Icon className={`w-32 h-32 ${service.iconColor}`} />
                    </div>
                  </div>
                  
                  <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                    <div className={`flex items-center space-x-3 space-x-reverse mb-4`}>
                      <div className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${service.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-navy-dark">{service.title}</h3>
                        <p className="text-sm text-gray-text">{service.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-text mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-navy-dark mb-3">المميزات الرئيسية:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-2 space-x-reverse text-sm">
                              <CheckCircle className="w-4 h-4 text-status-success flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-navy-dark mb-3">نطاق التغط��ة:</h4>
                        <ul className="space-y-2">
                          {service.ports.slice(0, 4).map((port, idx) => (
                            <li key={idx} className="flex items-center space-x-2 space-x-reverse text-sm">
                              <MapPin className="w-4 h-4 text-navy-light flex-shrink-0" />
                              <span>{port}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-card rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <Clock className="w-6 h-6 mx-auto mb-2 text-navy-light" />
                          <p className="text-sm font-medium text-navy-dark">متوسط وقت التخليص</p>
                          <p className="text-lg font-bold text-navy-light">{service.averageTime}</p>
                        </div>
                        <div>
                          <Star className="w-6 h-6 mx-auto mb-2 text-navy-light" />
                          <p className="text-sm font-medium text-navy-dark">التخصصات الرئيسية</p>
                          <p className="text-sm text-gray-text">{service.specialties.slice(0, 2).join(', ')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4 space-x-reverse">
                      <Link
                        to="/contact"
                        className="btn-navy flex items-center space-x-2 space-x-reverse"
                      >
                        <span>اطلب عرض سعر</span>
                        <ArrowLeft className="w-4 h-4" />
                      </Link>
                      <Link
                        to="/consultation"
                        className="btn-navy-outline"
                      >
                        استشارة مجانية
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gray-card section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-dark mb-4">
              خدمات إضافية
            </h2>
            <p className="text-xl text-gray-text max-w-3xl mx-auto">
              خدمات مساندة لضمان تجربة متكاملة وسلسة
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="w-14 h-14 bg-navy-light rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy-dark mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-text text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-dark mb-4">
              مراحل عملية التخليص
            </h2>
            <p className="text-xl text-gray-text max-w-3xl mx-auto">
              خطوات واضحة ومنظمة لضمان سير العمل بكفاءة عالية
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-16 h-16 bg-navy-light rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-navy-dark mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-text leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-gray-300 -translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy-dark text-white section-spacing">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            جاهز لبدء خدمة التخليص الجمركي؟
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر مخصص لاحتياجاتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-navy-dark hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              احصل على عرض سعر
            </Link>
            <Link
              to="/consultation"
              className="border-2 border-white text-white hover:bg-white hover:text-navy-dark font-semibold px-8 py-4 rounded-lg transition-all"
            >
              استشارة مجانية
            </Link>
            <a
              href="https://wa.me/201234567890"
              className="bg-status-success hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              واتساب مباشر
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
