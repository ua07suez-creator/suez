import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowLeft, Search, Tag } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "دليل شامل للتخليص الجمركي في مصر 2024",
      excerpt: "كل ما تحتاج معرفته عن إجراءات التخليص الجمركي الجديدة وأحدث التطورات في القوانين المصرية",
      content: "محتوى المقال الكامل...",
      category: "تعليم جمركي",
      author: "أحمد محمد علي",
      date: "2024-01-15",
      readTime: "8 دقائق",
      tags: ["تخليص جمركي", "قوانين", "إجراءات"],
      featured: true
    },
    {
      id: 2,
      title: "التحديثات الجديدة في قانون الجمارك المصري",
      excerpt: "آخر التعديلات على قانون الجمارك وأثرها على المستوردين والمصدرين",
      content: "محتوى المقال الكامل...",
      category: "تحديثات تشريعية",
      author: "فاطمة حسن",
      date: "2024-01-10",
      readTime: "6 دقائق",
      tags: ["قانون الجمارك", "تحديثات", "تشريعات"],
      featured: false
    },
    {
      id: 3,
      title: "نصائح لتوفير التكاليف في التخليص الجمركي",
      excerpt: "طرق عملية لتقليل تكاليف التخليص الجمركي والرسوم المستحقة",
      content: "محتوى المقال الكامل...",
      category: "نصائح للمستوردين",
      author: "محمد عبدالله",
      date: "2024-01-08",
      readTime: "5 دقائق",
      tags: ["توفير تكاليف", "نصائح", "استيراد"],
      featured: false
    },
    {
      id: 4,
      title: "المستندات المطلوبة للتخليص الجمركي",
      excerpt: "قائمة شاملة بجميع المستندات المطلوبة حسب نوع البضاعة ووسيلة النقل",
      content: "محتوى المقال الكامل...",
      category: "تعليم جمركي",
      author: "نورا إبراهيم",
      date: "2024-01-05",
      readTime: "7 دقائق",
      tags: ["مستندات", "أوراق", "متطلبات"],
      featured: true
    },
    {
      id: 5,
      title: "كيفية التعامل مع المناطق الحرة في مصر",
      excerpt: "دليل متكامل للاستفادة من المناطق الحرة والحوافز الاستثمارية المتاحة",
      content: "محتوى المقال الكامل...",
      category: "نصائح للمستوردين",
      author: "أحمد محمد علي",
      date: "2024-01-03",
      readTime: "9 دقائق",
      tags: ["مناطق حرة", "استثمار", "حوافز"],
      featured: false
    },
    {
      id: 6,
      title: "أخطاء شائعة في إجراءات الاستيراد وكيفية تجنبها",
      excerpt: "تعرف على أكثر الأخطاء شيوعاً التي يقع فيها المستوردون وطرق تجنبها",
      content: "محتوى المقال الكامل...",
      category: "نصائح للمستوردين",
      author: "فاطمة حسن",
      date: "2024-01-01",
      readTime: "6 دقائق",
      tags: ["أخطاء شائعة", "استيراد", "تجنب مشاكل"],
      featured: false
    }
  ];

  const categories = ["الكل", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "الكل" || post.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 5);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-navy-light text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              مدونة التخليص الجمركي
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              مقالات ونصائح متخصصة في مجال التخليص الجمركي والتجارة الدولية لمساعدتكم في أعمالكم
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
                placeholder="ابحث في المقالات..."
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
          </div>
        </div>
      </section>

      <div className="section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Posts */}
              {selectedCategory === "الكل" && featuredPosts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-navy-dark mb-6 flex items-center space-x-2 space-x-reverse">
                    <span>المقالات المميزة</span>
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs">⭐</span>
                    </div>
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {featuredPosts.map((post) => (
                      <div key={post.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center space-x-2 space-x-reverse mb-3">
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              مميز
                            </span>
                            <span className="bg-navy-light/10 text-navy-light text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-navy-dark mb-3 leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-gray-text mb-4 leading-relaxed">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <User className="w-4 h-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-4 space-x-reverse">
                              <div className="flex items-center space-x-1 space-x-reverse">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.date).toLocaleDateString('ar-EG')}</span>
                              </div>
                              <div className="flex items-center space-x-1 space-x-reverse">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <button className="text-navy-light hover:text-navy-hover font-medium flex items-center space-x-1 space-x-reverse">
                              <span>اقرأ المزيد</span>
                              <ArrowLeft className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Posts */}
              <div>
                <h2 className="text-2xl font-bold text-navy-dark mb-6">
                  {selectedCategory === "الكل" ? "جميع المقالات" : selectedCategory}
                  <span className="text-gray-text text-lg font-normal mr-2">
                    ({filteredPosts.length} مقال)
                  </span>
                </h2>
                
                {filteredPosts.length > 0 ? (
                  <div className="space-y-6">
                    {filteredPosts.map((post) => (
                      <article key={post.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                        <div className="flex items-center space-x-2 space-x-reverse mb-3">
                          <span className="bg-navy-light/10 text-navy-light text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {post.category}
                          </span>
                          {post.featured && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              مميز
                            </span>
                          )}
                        </div>
                        
                        <h2 className="text-2xl font-semibold text-navy-dark mb-3 leading-tight hover:text-navy-light transition-colors cursor-pointer">
                          {post.title}
                        </h2>
                        
                        <p className="text-gray-text mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <User className="w-4 h-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(post.date).toLocaleDateString('ar-EG')}</span>
                            </div>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded flex items-center space-x-1 space-x-reverse">
                                <Tag className="w-3 h-3" />
                                <span>{tag}</span>
                              </span>
                            ))}
                          </div>
                          <button className="text-navy-light hover:text-navy-hover font-medium flex items-center space-x-1 space-x-reverse">
                            <span>اقرأ المقال كاملاً</span>
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-dark mb-2">
                      لم نجد أي مقالات
                    </h3>
                    <p className="text-gray-text mb-6">
                      جرب البحث بكلم��ت مختلفة أو اختر فئة أخرى
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('الكل');
                      }}
                      className="btn-navy-outline"
                    >
                      عرض جميع المقالات
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Recent Posts */}
              <div className="bg-gray-card rounded-xl p-6">
                <h3 className="text-xl font-semibold text-navy-dark mb-4">
                  أحدث المقالات
                </h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-medium text-navy-dark mb-2 leading-tight hover:text-navy-light transition-colors cursor-pointer">
                        {post.title.length > 60 ? post.title.substring(0, 60) + '...' : post.title}
                      </h4>
                      <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString('ar-EG')}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-navy-dark mb-4">
                  الفئات
                </h3>
                <div className="space-y-2">
                  {categories.slice(1).map((category) => {
                    const count = blogPosts.filter(post => post.category === category).length;
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-right p-2 rounded-lg transition-colors flex items-center justify-between ${
                          selectedCategory === category
                            ? 'bg-navy-light text-white'
                            : 'text-gray-text hover:bg-gray-100'
                        }`}
                      >
                        <span>{category}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          selectedCategory === category
                            ? 'bg-white/20'
                            : 'bg-gray-200'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-navy-light text-white rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  اشترك في النشرة الإخبارية
                </h3>
                <p className="text-gray-200 mb-4 text-sm">
                  احصل على آخر المقالات والنصائح في مجال التخليص الجمركي
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="بريدك الإلكتروني"
                    className="w-full px-4 py-2 rounded-lg text-gray-dark text-right"
                  />
                  <button className="w-full bg-white text-navy-light hover:bg-gray-100 font-semibold py-2 rounded-lg transition-colors">
                    اشترك الآن
                  </button>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-navy-dark mb-2">
                  تحتاج مساعدة؟
                </h3>
                <p className="text-gray-text text-sm mb-4">
                  تواصل معنا للحصول على استشارة مجانية
                </p>
                <a
                  href="/consultation"
                  className="btn-navy w-full text-center"
                >
                  استشارة مجانية
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
