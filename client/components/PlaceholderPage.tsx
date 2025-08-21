import React from 'react';
import { Link } from 'react-router-dom';
import { Construction, ArrowRight } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  suggestedContent?: string[];
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ 
  title, 
  description, 
  suggestedContent = [] 
}) => {
  return (
    <div className="section-spacing">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="w-24 h-24 bg-navy-light rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-12 h-12 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-navy-dark mb-4">
            {title}
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-text mb-8 leading-relaxed">
            {description}
          </p>

          {/* Under Development Notice */}
          <div className="bg-gray-card rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-navy-dark mb-4">
              🚧 هذه الصفحة قيد التطوير
            </h2>
            <p className="text-gray-text mb-6">
              نعمل حاليًا على إعداد محتوى متميز لهذه الصفحة. 
              في الوقت الحالي، يمكنكم التواصل معنا مباشرة للحصول على المعلومات التي تحتاجونها.
            </p>

            {/* Suggested Content */}
            {suggestedContent.length > 0 && (
              <div className="text-right mb-6">
                <h3 className="text-lg font-semibold text-navy-dark mb-3">
                  ما سنقدمه قريبًا:
                </h3>
                <ul className="space-y-2">
                  {suggestedContent.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 space-x-reverse text-gray-text">
                      <ArrowRight className="w-4 h-4 text-navy-light" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-navy text-center"
              >
                تواصل معنا
              </Link>
              <Link
                to="/consultation"
                className="btn-navy-outline text-center"
              >
                اطلب استشارة مجانية
              </Link>
            </div>
          </div>

          {/* Quick Access */}
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/"
              className="card-custom hover:shadow-md transition-shadow text-center"
            >
              <h3 className="text-lg font-semibold text-navy-dark mb-2">العودة للرئيسية</h3>
              <p className="text-gray-text text-sm">استكشف خدماتنا ومميزاتنا</p>
            </Link>
            
            <Link
              to="/contact"
              className="card-custom hover:shadow-md transition-shadow text-center"
            >
              <h3 className="text-lg font-semibold text-navy-dark mb-2">اتصل بنا</h3>
              <p className="text-gray-text text-sm">للاستفسارات والمساعدة</p>
            </Link>
            
            <a
              href="https://wa.me/201234567890"
              className="card-custom hover:shadow-md transition-shadow text-center"
            >
              <h3 className="text-lg font-semibold text-navy-dark mb-2">واتساب</h3>
              <p className="text-gray-text text-sm">تواصل فوري ومباشر</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
