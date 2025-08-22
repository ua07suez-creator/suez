import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  FileText, 
  Shield, 
  Clock, 
  DollarSign, 
  Users, 
  MessageSquare,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

export default function SystemWelcome() {
  const features = [
    {
      icon: FileText,
      title: 'إدارة الملفات',
      description: 'تتبع ومتابعة جميع ملفات التخليص الجمركي'
    },
    {
      icon: MessageSquare,
      title: 'نظام المراسلة',
      description: 'تواصل مباشر بين العملاء وفريق العمل'
    },
    {
      icon: DollarSign,
      title: 'إدارة الفواتير',
      description: 'نظام متكامل للفواتير والمدفوعات'
    },
    {
      icon: Shield,
      title: 'لوحة تحكم إدارية',
      description: 'إدا��ة شاملة للعمليات والموظفين'
    },
    {
      icon: Clock,
      title: 'تتبع الحالة',
      description: 'متابعة حالة الملفات في الوقت الفعلي'
    },
    {
      icon: Users,
      title: 'إدارة العملاء',
      description: 'نظام شامل لإدارة بيانات العملاء'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-navy-light/5 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            نظام إدارة التخليص الجمركي
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            نظام متكامل لإدارة عمليات التخليص الجمركي مع واجهات متقدمة للعملاء والإدارة
          </p>
        </div>

        {/* أزرار الوصول */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/login">
            <Button className="btn-navy text-lg px-8 py-4">
              دخول النظام
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </Link>
          
          <Link to="/register">
            <Button variant="outline" className="btn-navy-outline text-lg px-8 py-4">
              إنشاء حساب جديد
            </Button>
          </Link>
        </div>

        {/* المميزات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="card-custom hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <div className="p-3 bg-navy-light/10 rounded-lg">
                      <Icon className="h-6 w-6 text-navy-light" />
                    </div>
                    <h3 className="text-xl font-semibold text-navy-dark">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-text">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ملخص النظام */}
        <Card className="bg-navy-light text-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  نظام شامل ومتكامل
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span>واجهة عميل متقدمة لمتابعة الملفات</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span>لوحة تحكم إدارية شاملة</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span>نظام مراسلة وإشعارات فوري</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span>إدارة متكاملة للفواتير والمدفوعات</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span>تقارير وإحصائيات مفصلة</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-4">
                  ابدأ استخدام النظام الآن
                </h4>
                <p className="mb-6 opacity-90">
                  سجل دخولك للوصول إلى جميع الميزات المتقدمة
                </p>
                <Link to="/login">
                  <Button variant="secondary" className="bg-white text-navy-light hover:bg-gray-100">
                    دخول النظام
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
