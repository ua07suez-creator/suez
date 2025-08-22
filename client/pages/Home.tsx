import React from 'react';
import { Link } from 'react-router-dom';
import SystemWelcome from '../components/SystemWelcome';
import {
  Ship,
  Plane,
  Truck,
  FileText,
  Clock,
  Shield,
  Users,
  CheckCircle,
  Star,
  MessageCircle,
  ArrowLeft,
  Globe,
  Award,
  Zap,
  Eye,
  Target
} from 'lucide-react';

const Home = () => {
  // Sample data for sections
  const stats = [
    { number: "5000+", label: "شحنة مخدومة", icon: Ship },
    { number: "15+", label: "سنة خبرة", icon: Award },
    { number: "48", label: "ساعة متوسط التخليص", icon: Clock },
    { number: "99%", label: "معدل رضا العملاء", icon: Star }
  ];

  const services = [
    {
      icon: Ship,
      title: "التخليص البحري",
      description: "خدمات تخليص جمركي شاملة للشحن البحري عبر جميع الموانئ المصرية",
      features: ["ميناء الإسكندرية", "ميناء السويس", "ميناء دمياط"]
    },
    {
      icon: Plane,
      title: "التخليص الجوي",
      description: "تخليص سريع ودقيق للبضائع المستوردة والمصدرة عبر المطارات",
      features: ["مطار القاهرة", "مطار برج العرب", "الشحن السريع"]
    },
    {
      icon: Truck,
      title: "التخليص البري",
      description: "خدمات التخليص الجمركي للشحن البري عبر المنافذ الحدودية",
      features: ["رفح", "طابا", "السلوم"]
    },
    {
      icon: FileText,
      title: "الاستشارات الجمركي��",
      description: "استشارات متخصصة في القوانين والإجراءات الجمركية",
      features: ["تصنيف البضائع", "حساب الرسوم", "المستندات"]
    },
    {
      icon: Globe,
      title: "المناطق الحرة",
      description: "خدمات متخصصة للتعامل مع المناطق الحرة والاستثمارية",
      features: ["منطقة السويس", "منطقة الإسكندرية", "منطقة القاهرة"]
    },
    {
      icon: CheckCircle,
      title: "تخليص وارد وصادر",
      description: "خدمات شاملة للواردات والصادرات مع متابعة دقيقة",
      features: ["واردات", "صادرات", "ترانزيت"]
    }
  ];

  const advantages = [
    {
      icon: Zap,
      title: "سرعة في الإنجاز",
      description: "نضمن أسرع أوقات التخليص مع الحفاظ على الدقة والجودة"
    },
    {
      icon: Eye,
      title: "شفافية كاملة",
      description: "تحديثات فورية ومتابعة مباشرة لجميع مراحل التخليص"
    },
    {
      icon: Users,
      title: "فريق خبير",
      description: "خبراء مخل��ين جمركيين معتمدين مع سنوات من الخبرة"
    },
    {
      icon: Shield,
      title: "أمان وثقة",
      description: "ضمانات شاملة وتعامل آمن مع جميع المستندات والبضائع"
    },
    {
      icon: Target,
      title: "خبرة محلية",
      description: "معرفة عميقة بالقوانين المصرية وعلاقات ممتازة مع الجهات الجمركية"
    },
    {
      icon: MessageCircle,
      title: "دعم 24/7",
      description: "خدمة عملاء متاحة على مدار الساعة للرد على استفساراتكم"
    }
  ];

  const workSteps = [
    {
      number: "01",
      title: "طلب استشارة",
      description: "اتصل بنا أو أرسل طلب استشارة مجانية عبر الموقع"
    },
    {
      number: "02", 
      title: "استلام المستندات",
      description: "نستلم ونراجع جميع المستندات المطلوبة للتخليص"
    },
    {
      number: "03",
      title: "تقديم للجمارك", 
      description: "نقوم بتقديم الأوراق للجهات الجمركية والمتابعة"
    },
    {
      number: "04",
      title: "الإفراج والتسليم",
      description: "الحصول على الإفراج الجمركي وتسليم البضائع"
    }
  ];

  const testimonials = [
    {
      name: "محمد أحمد",
      company: "شركة التجارة الدولية",
      content: "خدمة ممتازة وسرعة في الإنجاز. تم تخليص شحنتنا في وقت قياسي مع أسعار منافسة.",
      rating: 5
    },
    {
      name: "��اطمة علي",
      company: "مؤسسة الاستيراد والتصدير",
      content: "فريق محترف وخبرة واسعة. نتعامل معهم منذ سنوات ولم نواجه أي مشاكل.",
      rating: 5
    },
    {
      name: "أحمد حسن",
      company: "شركة الصناعات الغذائية",
      content: "شفافية في التعامل ومتابعة مستمرة. ننصح بالتعامل معهم بقوة.",
      rating: 5
    }
  ];

  const partners = [
    "مصلحة الجمارك المصرية",
    "غرفة التجارة المصرية", 
    "اتحاد المستوردين",
    "جمعية المخلصين الجمركيين",
    "هيئة الاستثمار",
    "وزارة التجارة والصناعة"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-light to-navy-medium text-white section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="block">خدمات التخليص</span>
                <span className="block text-gray-200">الجمركي الأسرع</span>
                <span className="block">في مصر</span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                نقدم خدمات تخليص جمركي متميزة مع ضمان السرعة والدقة والشفافية الكاملة. 
                فريق من الخبراء المعتمدين لخدمة جميع احتياجاتكم الجمركية.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/consultation"
                  className="btn-navy-outline hover:bg-white hover:text-navy-light text-center"
                >
                  اطلب استشارة مجانية
                </Link>
                <a
                  href="https://wa.me/201234567890"
                  className="bg-status-success hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-center flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>واتساب مباشر</span>
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.slice(0, 4).map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center">
                        <Icon className="w-8 h-8 mx-auto mb-2 text-gray-200" />
                        <div className="text-2xl font-bold">{stat.number}</div>
                        <div className="text-sm text-gray-200">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-gray-card py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-navy-light" />
                  <div className="text-3xl font-bold text-navy-dark mb-2">{stat.number}</div>
                  <div className="text-gray-text font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-dark mb-4">
              خدماتنا المتميزة
            </h2>
            <p className="text-xl text-gray-text max-w-3xl mx-auto">
              نقدم مجموعة شاملة من خدمات التخليص الجمركي والاستشارات المتخصصة
              لتلبية جميع احتياجاتكم التجارية
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="card-custom group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-4 space-x-reverse mb-4">
                    <div className="w-12 h-12 bg-navy-light rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-navy-dark">{service.title}</h3>
                  </div>
                  <p className="text-gray-text mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 space-x-reverse text-sm text-gray-text">
                        <CheckCircle className="w-4 h-4 text-status-success" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-navy-light hover:text-navy-hover font-medium flex items-center space-x-2 space-x-reverse group"
                  >
                    <span>اعرف المزيد</span>
                    <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="bg-gray-card section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-dark mb-4">
              لماذا تختارنا؟
            </h2>
            <p className="text-xl text-gray-text max-w-3xl mx-auto">
              نتميز بالخبرة والكفاءة والالتزام بأعلى معايير الجودة في خدمات التخليص الجمركي
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-navy-light rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-dark mb-2">{advantage.title}</h3>
                  <p className="text-gray-text leading-relaxed">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Work Steps Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-dark mb-4">
              خطوات العمل
            </h2>
            <p className="text-xl text-gray-text max-w-3xl mx-auto">
              عملية بسيطة وواضحة لضمان تخليص سريع وآمن لبضائعكم
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-navy-light rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  {index < workSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-300 -translate-x-10"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-navy-dark mb-2">{step.title}</h3>
                <p className="text-gray-text leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-navy-light text-white section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              آراء عملائنا
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              شهادات حقيقية من عملائنا الذين وثقوا بنا لتقديم خدمات التخليص الجمركي
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex space-x-1 space-x-reverse mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-200 mb-4 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-300">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-gray-card py-12">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-navy-dark mb-4">
              شركاء النجاح
            </h2>
            <p className="text-gray-text">نعمل مع أفضل المؤسسات والجهات الحكومية</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Award className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-xs text-gray-text font-medium">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Welcome Section */}
      <SystemWelcome />

      {/* Final CTA Section */}
      <section className="bg-navy-dark text-white section-spacing">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            ابدأ رحلتك معنا اليوم
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            احصل على استشارة مجانية وعرض سعر مخصص لاحتياجاتك. 
            فريقنا جاهز لخدمتكم على مدار الساعة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-navy-dark hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              احصل على عرض سعر
            </Link>
            <a
              href="https://wa.me/201234567890"
              className="bg-status-success hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors flex items-center justify-center space-x-2 space-x-reverse"
            >
              <MessageCircle className="w-5 h-5" />
              <span>تواصل عبر واتساب</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
