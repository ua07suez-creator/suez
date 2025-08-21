import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, ArrowRight } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="section-spacing">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="text-8xl lg:text-9xl font-bold text-navy-light mb-6">
            404
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-navy-dark mb-4">
            الصفحة غير موجودة
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-text mb-8 leading-relaxed">
            عذراً، الصفحة التي تبحث عنها غير متاحة أو قد تكون قد تم نقلها.
            يمكنك العودة للصفحة الرئيسية أو استخدام القوائم للتنقل.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/"
              className="btn-navy flex items-center justify-center space-x-2 space-x-reverse"
            >
              <Home className="w-5 h-5" />
              <span>العودة للرئيسية</span>
            </Link>
            <Link
              to="/contact"
              className="btn-navy-outline text-center"
            >
              اتصل بنا
            </Link>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/services"
              className="card-custom hover:shadow-md transition-shadow text-center"
            >
              <h3 className="text-lg font-semibold text-navy-dark mb-2">خدماتنا</h3>
              <p className="text-gray-text text-sm">اكتشف خدمات التخليص الجمركي</p>
            </Link>

            <Link
              to="/about"
              className="card-custom hover:shadow-md transition-shadow text-center"
            >
              <h3 className="text-lg font-semibold text-navy-dark mb-2">من نحن</h3>
              <p className="text-gray-text text-sm">تعرف على شركتنا وخبرتنا</p>
            </Link>

            <Link
              to="/consultation"
              className="card-custom hover:shadow-md transition-shadow text-center"
            >
              <h3 className="text-lg font-semibold text-navy-dark mb-2">استشارة مجانية</h3>
              <p className="text-gray-text text-sm">احصل على استشارة من خبرائنا</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
