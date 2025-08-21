import React from 'react';
import { Shield, Award, Users, Eye, Target, Heart, CheckCircle, Star, Globe, Clock, Truck, Ship } from 'lucide-react';

const About = () => {
  const companyValues = [
    {
      icon: Shield,
      title: "الأمانة والثقة",
      description: "نتعامل مع بضائعكم ومستنداتكم بأعلى درجات الأمانة والشفافية"
    },
    {
      icon: Clock,
      title: "السرعة والدقة",
      description: "التزام بالمواعيد المحددة مع ضمان دقة العمل في كل التفاصيل"
    },
    {
      icon: Users,
      title: "الخدمة المتميزة",
      description: "فريق محترف يقدم خدمة عملاء ��ستثنائية على مدار الساعة"
    },
    {
      icon: Target,
      title: "التميز والجودة",
      description: "نسعى دائماً لتقديم أفضل الحلول وأعلى معايير الجودة"
    }
  ];

  const teamMembers = [
    {
      name: "أحمد محمد علي",
      position: "المدير العام",
      experience: "20+ سنة خبرة",
      description: "خبير في القوانين الجمركية المصرية والدولية",
      image: "👨‍💼"
    },
    {
      name: "فاطمة حسن أحمد",
      position: "مدير العمليات",
      experience: "15+ سنة خبرة",
      description: "متخصصة في التخليص البحري والجوي",
      image: "👩‍💼"
    },
    {
      name: "محمد عبدالله",
      position: "رئيس قسم التخليص",
      experience: "12+ سنة خبرة",
      description: "خبير في المناطق الحرة والاستثمارية",
      image: "👨‍💼"
    },
    {
      name: "نورا إبراهيم",
      position: "مسؤولة خدمة العملاء",
      experience: "8+ سنوات خبرة",
      description: "متخصصة في متابعة العملاء والدعم التقني",
      image: "👩‍💼"
    }
  ];

  const achievements = [
    {
      icon: Ship,
      number: "5000+",
      label: "شحنة مُخلصة بنجاح",
      description: "عبر جميع الموانئ والمطارات المصرية"
    },
    {
      icon: Users,
      number: "500+",
      label: "عميل راضٍ",
      description: "من الشركات والمؤسسات الكبرى"
    },
    {
      icon: Award,
      number: "15+",
      label: "سنة خبرة",
      description: "في مجال التخليص الجمركي"
    },
    {
      icon: Globe,
      number: "99%",
      label: "معدل النجاح",
      description: "في إتمام عمليات التخليص"
    }
  ];

  const certifications = [
    {
      title: "ترخيص مزاولة المهنة",
      authority: "مصلحة الجمارك المصرية",
      year: "2024",
      description: "ترخيص رسمي لممارسة أعمال التخليص الجمركي"
    },
    {
      title: "عضوية جمعية المخلصين",
      authority: "جمعية المخلصين الجمركيين",
      year: "2024",
      description: "عضوية فعالة في الجمعية المهنية"
    },
    {
      title: "شهادة الجودة ISO",
      authority: "الهيئة المصرية للمواصفات",
      year: "2023",
      description: "شهادة جودة في الخدمات اللوجستية"
    },
    {
      title: "اعتماد غرفة التجارة",
      authority: "غرفة التجارة المصرية",
      year: "2024",
      description: "اعتماد كشركة معتمدة للتخليص الجمركي"
    }
  ];

  const ports = [
    { name: "ميناء الإسكندرية", type: "بحري", status: "مكتب دائم" },
    { name: "ميناء السويس", type: "بحري", status: "مكتب دائم" },
    { name: "ميناء دمياط", type: "بحري", status: "تغطية شاملة" },
    { name: "مطار القاهرة", type: "جوي", status: "مكتب دائم" },
    { name: "مطار برج العرب", type: "جوي", status: "تغطية شاملة" },
    { name: "منفذ رفح", type: "بري", status: "تغطية شاملة" }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-navy-light text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              من نحن
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              شركة رائدة في مجال التخليص الجمركي مع خبرة تمتد لأكثر من 15 عاماً في خدمة 
              القطاع التجاري والصناعي في مصر
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-dark mb-6">
                قصتنا
              </h2>
              <div className="space-y-4 text-gray-text leading-relaxed">
                <p>
                  تأسست شركة التخليص الجمركي في عام 2008 بهدف تقديم خدمات تخليص جمركي متميزة 
                  للشركات والمؤسسات العاملة في مجال الاستيراد والتصدير في مصر.
                </p>
                <p>
                  بدأنا كفريق صغير من المتخصصين في مجال الجمارك، واليوم أصبحنا واحدة م�� أكبر 
                  الشركات المتخصصة في التخليص الجمركي مع فروع في أهم الموانئ والمطارات المصرية.
                </p>
                <p>
                  نفخر بأننا ساعدنا آلاف الشركات في تسهيل عمليات الاستيراد والتصدير، 
                  وقدمنا لهم خدمات استثنائية ساهمت في نمو أعمالهم وتوسعها.
                </p>
              </div>
            </div>
            <div className="bg-gray-card rounded-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="text-center">
                      <Icon className="w-12 h-12 mx-auto mb-3 text-navy-light" />
                      <div className="text-2xl font-bold text-navy-dark mb-1">
                        {achievement.number}
                      </div>
                      <div className="text-sm font-medium text-gray-dark mb-1">
                        {achievement.label}
                      </div>
                      <div className="text-xs text-gray-text">
                        {achievement.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-card section-spacing">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-xl p-8 text-center">
              <Eye className="w-16 h-16 mx-auto mb-4 text-navy-light" />
              <h3 className="text-2xl font-bold text-navy-dark mb-4">رؤيتنا</h3>
              <p className="text-gray-text leading-relaxed">
                أن نصبح الشريك الأول والأكثر ثقة للشركات في مجال التخليص الجمركي، 
                ونساهم في تطوير التجارة الخارجية المصرية.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-xl p-8 text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-navy-light" />
              <h3 className="text-2xl font-bold text-navy-dark mb-4">رسالتنا</h3>
              <p className="text-gray-text leading-relaxed">
                تقديم خدمات تخليص جمركي متميزة وسريعة ودقيقة، مع الالتزام بأعلى معايير 
                الجودة والشفافية في التعامل مع عملائنا.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white rounded-xl p-8 text-center">
              <Heart className="w-16 h-16 mx-auto mb-4 text-navy-light" />
              <h3 className="text-2xl font-bold text-navy-dark mb-4">قيمنا</h3>
              <p className="text-gray-text leading-relaxed">
                الأمانة والثقة والشفافية والتميز في الخدمة، مع الالتزام بالمواعيد 
                والحرص على مصالح عملائنا في المقام الأول.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-dark mb-4">
              قيمنا الأساسية
            </h2>
            <p className="text-xl text-gray-text max-w-3xl mx-auto">
              نؤمن بمجموعة من القيم الأساسية التي توجه عملنا وتحدد طريقة تعاملنا مع عملائنا وشركائنا
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-navy-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-dark mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-text leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-card section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-dark mb-4">
              فريق الخبراء
            </h2>
            <p className="text-xl text-gray-text max-w-3xl mx-auto">
              فريق من الخبراء المتخصصين في مجال التخليص الجمركي مع سنوات طويلة من الخبرة
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-semibold text-navy-dark mb-1">
                  {member.name}
                </h3>
                <p className="text-navy-light font-medium mb-2">
                  {member.position}
                </p>
                <p className="text-sm text-gray-text mb-3">
                  {member.experience}
                </p>
                <p className="text-sm text-gray-text leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-dark mb-4">
              التراخيص والاعتمادات
            </h2>
            <p className="text-xl text-gray-text max-w-3xl mx-auto">
              نحتفظ بجميع التراخيص والاعتمادات المطلوبة لممارسة أعمال التخليص الجمركي في مصر
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-navy-light rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-navy-dark mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-navy-light font-medium mb-1">
                  {cert.authority}
                </p>
                <p className="text-xs text-gray-text mb-3">
                  عام {cert.year}
                </p>
                <p className="text-sm text-gray-text leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="bg-navy-light text-white section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              نطاق تغطيتنا
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              نقدم خدماتنا في جميع الموانئ والمطارات والمنافذ البرية الرئيسية في مصر
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ports.map((port, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center space-x-3 space-x-reverse mb-3">
                  {port.type === 'بحري' && <Ship className="w-6 h-6" />}
                  {port.type === 'جوي' && <Globe className="w-6 h-6" />}
                  {port.type === 'بري' && <Truck className="w-6 h-6" />}
                  <h3 className="text-lg font-semibold">{port.name}</h3>
                </div>
                <p className="text-gray-200 text-sm mb-2">نوع الميناء: {port.type}</p>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-200">{port.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-dark mb-4">
              لماذا تختارنا؟
            </h2>
            <p className="text-xl text-gray-text max-w-3xl mx-auto">
              ما يميزنا عن المنافسين ويجعلنا الخيار الأول لآلاف العملاء
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-status-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-dark mb-2">
                سرعة في الإنجاز
              </h3>
              <p className="text-gray-text">
                نضمن أسرع أوقات التخليص مع الحفاظ على أعلى معايير الجودة والدقة
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-status-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-dark mb-2">
                فريق محترف
              </h3>
              <p className="text-gray-text">
                مخلصين جمركيين معتمدين مع خبرة واسعة في التعامل مع جميع أنواع البضائع
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-status-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-dark mb-2">
                أمان وثقة
              </h3>
              <p className="text-gray-text">
                ضمانات شاملة وتأمين على جميع العملي��ت مع حماية كاملة لمستنداتكم
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy-dark text-white section-spacing">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            ابدأ التعامل معنا اليوم
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            انضم إلى مئات الشركات الراضية عن خدماتنا واحصل على أفضل حلول التخليص الجمركي
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-navy-dark hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              احصل على عرض سعر
            </a>
            <a
              href="/consultation"
              className="border-2 border-white text-white hover:bg-white hover:text-navy-dark font-semibold px-8 py-4 rounded-lg transition-all"
            >
              استشارة مجانية
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
