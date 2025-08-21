import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const faqData: FAQItem[] = [
    // عام
    {
      id: 1,
      question: "ما هي خدمات التخليص الجمركي التي تقدمونها؟",
      answer: "نقدم خدمات شاملة تشمل التخليص البحري والجوي والبري، تخليص الو��ردات والصادرات، التعامل مع المناطق الحرة، والاستشارات الجمركية. نعمل في جميع الموانئ والمطارات المصرية الرئيسية.",
      category: "عام",
      keywords: ["خدمات", "تخليص", "بحري", "جوي", "بري", "واردات", "صادرات", "مناطق حرة"]
    },
    {
      id: 2,
      question: "كم من الوقت يستغرق التخليص الجمركي؟",
      answer: "يختلف وقت التخليص حسب نوع البضاعة ووسيلة النقل. في المتوسط: التخليص الجوي 24-48 ساعة، البحري 3-5 أيام، البري 1-2 يوم. هذا يعتمد على اكتمال المستندات والحصول على الموافقات المطلوبة.",
      category: "أوقات التخليص",
      keywords: ["وقت", "مدة", "تخليص", "ساعة", "يوم", "جوي", "بحري", "بري"]
    },
    {
      id: 3,
      question: "ما هي المستندات المطلوبة للتخليص؟",
      answer: "المستندات الأساسية تشمل: الفاتورة التجارية، قائمة التعبئة، شهادة المنشأ، بوليصة الشحن، تفويض التخليص، رقم تسجيل المستورد. قد تتطلب بعض البضائع مستندات إضافية مثل شهادات الجودة أو التراخيص الخاصة.",
      category: "المستندات",
      keywords: ["مستندات", "فاتورة", "شهادة", "بوليصة", "تفويض", "أوراق"]
    },
    
    // التكاليف
    {
      id: 4,
      question: "كيف يتم حساب رسوم التخليص الجمركي؟",
      answer: "تشمل التكاليف: الرسوم الجمركية (حسب نوع البضاعة)، ضريبة القيمة المضافة، رسوم الخدمات، أتعاب التخليص. نقدم عروض أسعار مفصلة قبل البدء في العمل مع شفافية كاملة في التكاليف.",
      category: "التكاليف والرسوم",
      keywords: ["رسوم", "تكلفة", "سعر", "ضريبة", "أتعاب", "حساب"]
    },
    {
      id: 5,
      question: "هل هناك رسوم خفية أو إضافية؟",
      answer: "لا، نلتزم بالشفافية الكاملة. جميع الرسوم والتكاليف موضحة في عرض السعر المبدئي. أي رسوم إضافية (مثل رسوم الفحص أو التأخير) يتم إبلاغكم بها مسبقاً وبموافقتكم.",
      category: "التكاليف والرسوم",
      keywords: ["رسوم خفية", "شفافية", "تكاليف إضافية", "عرض سعر"]
    },
    
    // المستندات
    {
      id: 6,
      question: "ماذا لو كانت المستندات ناقصة أو خاطئة؟",
      answer: "نقوم بمراجعة جميع المستندات قبل التقديم للجمارك. في حالة وجود نقص أو أخطاء، نتواصل معكم فوراً لتصحيحها. نساعدكم في الحصول على المستندات الناقصة وتصحيح الأخطاء.",
      category: "المستندات",
      keywords: ["مستندات ناقصة", "أخطاء", "مراجعة", "تصحيح"]
    },
    {
      id: 7,
      question: "هل يمكن إرسال المستندات إلكترونياً؟",
      answer: "نعم، نقبل المستندات الإلكترونية المسح الضوئي بجودة عالية. يمكن إرسالها عبر البريد الإلكتروني أو واتساب أو رفعها عبر موقعنا الإلكتروني. نحتفظ بنسخ احتياطية آمنة من جميع المستندات.",
      category: "المستندات",
      keywords: ["مستندات إلكتر��نية", "مسح ضوئي", "بريد", "واتساب", "رفع"]
    },
    
    // البضائع
    {
      id: 8,
      question: "هل تتعاملون مع جميع أنواع البضائع؟",
      answer: "نعم، نتعامل مع معظم أنواع البضائع بما في ذلك المواد الغذائية، الأدوية، الآلات، المواد الكيماوية، المنسوجات، والإلكترونيات. للبضائع الخاصة أو الخطرة، نقدم استشارة مسبقة للتأكد من الإجراءات المطلوبة.",
      category: "أنواع البضائع",
      keywords: ["بضائع", "غذائية", "أدوية", "آلات", "كيماوية", "منسوجات", "إلكترونيات"]
    },
    {
      id: 9,
      question: "كيف يتم التعامل مع البضائع القابلة للتلف؟",
      answer: "للبضائع القابلة للتلف نقدم خدمة تخليص سريع وأولوية في المعالجة. نتعامل مع التخزين المبرد عند الحاجة ونضمن أسرع إجراءات ممكنة للحفاظ على جودة البضاعة.",
      category: "أنواع البضائع",
      keywords: ["قابلة للتلف", "سريع", "مبرد", "جودة", "أولوية"]
    },
    
    // الموانئ
    {
      id: 10,
      question: "في أي موانئ تقدمون خدماتكم؟",
      answer: "نقدم خدماتنا في جميع الموانئ المصرية الرئيسية: ميناء الإسكندرية، السويس، دمياط، سفاجا، مطار القاهرة، مطار برج العرب، والمنافذ البرية مثل رفح وطابا والسلوم.",
      category: "الموانئ والمطارات",
      keywords: ["موانئ", "إسكندرية", "سويس", "دمياط", "سفاجا", "القاهرة", "رفح", "طابا"]
    },
    {
      id: 11,
      question: "هل لديكم مكاتب في جميع الموانئ؟",
      answer: "لدينا مكاتب دائمة في الموانئ الرئيسية (الإسكندرية، السويس، مطار القاهرة) وشبكة من الممثلين المعتمدين في باقي المواقع لضمان تقديم خدمة متميزة في كل مكان.",
      category: "الموانئ والمطارات",
      keywords: ["مكاتب", "دائمة", "ممثلين", "خدمة"]
    },
    
    // المناطق الحرة
    {
      id: 12,
      question: "ما هي خدماتكم في المناطق الحرة؟",
      answer: "نقدم خدمات شاملة في المناطق الحرة تشمل: الإدخال والإخراج، التخزين، التصنيع، إعادة التصدير، والتحويل للسوق المحلي. نتعامل مع جميع المناطق الحرة في مصر.",
      category: "المناطق الحرة",
      keywords: ["مناطق حرة", "إدخال", "إخراج", "تخزين", "تصنيع", "إعادة تصدير"]
    },
    
    // الدفع
    {
      id: 13,
      question: "ما هي طرق الدفع المتاحة؟",
      answer: "نقبل الدفع نقداً، بالتحويل البنكي، الشيكات، وحالياً نعمل على توفير الدفع الإلكتروني. يمكن الدفع على دفعات حسب طبيعة العملية وبالاتفاق المسبق.",
      category: "الدفع والفوترة",
      keywords: ["دفع", "تحويل بنكي", "شيكات", "إلكتروني", "دفعات"]
    },
    {
      id: 14,
      question: "متى يتم دفع رسوم التخليص؟",
      answer: "عادة يتم الدفع قبل إتمام عملية التخليص أو حسب الاتفاق المسبق. للعملاء الدائمين، يمكن ترتيب ��ظام فوترة شهرية. جميع الفواتير تصدر بتفاصيل واضحة لجميع الرسوم.",
      category: "الدفع والفوترة",
      keywords: ["وقت الدفع", "فوترة شهرية", "فواتير", "عملاء دائمين"]
    },
    
    // خدمة العملاء
    {
      id: 15,
      question: "كيف يمكنني متابعة حالة شحنتي؟",
      answer: "يمكنكم متابعة حالة الشحنة عبر: الاتصال المباشر، واتساب، البريد الإلكتروني، أو من خلال بوابة العملاء على موقعنا. نرسل تحديثات دورية في كل مرحلة من مراحل التخليص.",
      category: "خدمة العملاء",
      keywords: ["متابعة", "حالة شحنة", "واتساب", "بوابة", "تحديثات"]
    },
    {
      id: 16,
      question: "هل خدمة العملاء متاحة على مدار الساعة؟",
      answer: "خدمة العملاء متاحة من الأحد للخميس 9 ص - 6 م، والجمعة والسبت 10 ص - 4 م. للحالات الطارئة، يمكن التواصل عبر واتساب على مدار الساعة.",
      category: "خدمة العملاء",
      keywords: ["ساعا�� العمل", "طوارئ", "واتساب", "متاح"]
    }
  ];

  const categories = ["الكل", ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQs = useMemo(() => {
    return faqData.filter(item => {
      const matchesCategory = selectedCategory === "الكل" || item.category === selectedCategory;
      const matchesSearch = searchTerm === "" || 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const toggleExpand = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-navy-light text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              الأسئلة الشائعة
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              أجوبة شاملة على أكثر الأسئلة شيوعاً حول خدمات التخليص الجمركي والإجراءات المطلوبة
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-card">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="ابحث في الأسئلة الشائعة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-light focus:border-transparent text-right text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-navy-light text-white'
                      : 'bg-white text-gray-text hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center mt-6">
              <p className="text-gray-text">
                عرض {filteredFAQs.length} من {faqData.length} سؤال
                {searchTerm && ` لـ "${searchTerm}"`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full p-6 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-navy-dark mb-2">
                          {item.question}
                        </h3>
                        <span className="text-sm text-navy-light bg-navy-light/10 px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <div className="mr-4">
                        {expandedItems.has(item.id) ? (
                          <ChevronUp className="w-6 h-6 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </button>
                    
                    {expandedItems.has(item.id) && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <p className="text-gray-text leading-relaxed pt-4">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-dark mb-2">
                  لم نجد أي نتائج
                </h3>
                <p className="text-gray-text mb-6">
                  جرب البحث بكلمات مختلفة أو اختر فئة أخرى
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('الكل');
                  }}
                  className="btn-navy-outline"
                >
                  عرض جميع الأسئلة
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-navy-dark text-white section-spacing">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              لم تجد إجابة لسؤالك؟
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              فريق خدمة العملاء جاهز لم��اعدتك والإجابة على جميع استفساراتك
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a
              href="tel:+201234567890"
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all text-center group"
            >
              <Phone className="w-12 h-12 mx-auto mb-4 text-gray-200 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">اتصل بنا</h3>
              <p className="text-gray-200">+20 10 1234 5678</p>
            </a>
            
            <a
              href="https://wa.me/201234567890"
              className="bg-status-success/20 backdrop-blur-sm rounded-xl p-6 hover:bg-status-success/30 transition-all text-center group"
            >
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-200 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">واتساب</h3>
              <p className="text-gray-200">رد فوري على استفساراتك</p>
            </a>
            
            <a
              href="mailto:support@customsclearance.com"
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all text-center group"
            >
              <Mail className="w-12 h-12 mx-auto mb-4 text-gray-200 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">بريد إلكتروني</h3>
              <p className="text-gray-200">support@customsclearance.com</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
