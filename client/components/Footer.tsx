import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-light text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-navy-dark font-bold text-xl">تج</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">شركة التخليص الجمركي</h3>
                <p className="text-sm opacity-90">خدمات متميزة وسرعة في الإنجاز</p>
              </div>
            </div>
            <p className="text-gray-200 leading-relaxed">
              شركة رائدة في مجال التخليص الجمركي والاستشارات الجمركية في مصر، 
              نقدم خدمات متميزة مع فريق من الخبراء المتخصصين.
            </p>
            {/* Social Media */}
            <div className="flex space-x-4 space-x-reverse">
              <a
                href="#"
                className="w-10 h-10 bg-navy-hover rounded-lg flex items-center justify-center hover:bg-white hover:text-navy-light transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-navy-hover rounded-lg flex items-center justify-center hover:bg-white hover:text-navy-light transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-navy-hover rounded-lg flex items-center justify-center hover:bg-white hover:text-navy-light transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-200 hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-200 hover:text-white transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-200 hover:text-white transition-colors">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-200 hover:text-white transition-colors">
                  المدونة
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-200 hover:text-white transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-200 hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">خدماتنا</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/sea" className="text-gray-200 hover:text-white transition-colors">
                  التخليص البحري
                </Link>
              </li>
              <li>
                <Link to="/services/air" className="text-gray-200 hover:text-white transition-colors">
                  التخليص الجوي
                </Link>
              </li>
              <li>
                <Link to="/services/land" className="text-gray-200 hover:text-white transition-colors">
                  التخليص البري
                </Link>
              </li>
              <li>
                <Link to="/services/consultation" className="text-gray-200 hover:text-white transition-colors">
                  الاستشارات الجمركية
                </Link>
              </li>
              <li>
                <Link to="/services/free-zones" className="text-gray-200 hover:text-white transition-colors">
                  المناطق الحرة
                </Link>
              </li>
              <li>
                <Link to="/services/import-export" className="text-gray-200 hover:text-white transition-colors">
                  تخليص وارد وصادر
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">بيانات الاتصال</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 space-x-reverse">
                <Phone className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-200">+20 10 1234 5678</p>
                  <p className="text-gray-200">+20 12 3456 7890</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <Mail className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-200">info@customsclearance.com</p>
                  <p className="text-gray-200">support@customsclearance.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <MapPin className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                <p className="text-gray-200">
                  القاهرة، مصر<br />
                  ميناء الإسكندرية<br />
                  ميناء السويس
                </p>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <Clock className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-200">الأحد - الخميس: 9:00 ص - 6:00 م</p>
                  <p className="text-gray-200">الجمعة - السبت: 10:00 ص - 4:00 م</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-navy-medium">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-right">
              <p className="text-gray-200">
                © 2024 شركة التخليص الجمركي. جميع الحقوق محفوظة.
              </p>
            </div>
            <div className="flex space-x-6 space-x-reverse text-sm">
              <Link to="/privacy" className="text-gray-200 hover:text-white transition-colors">
                سياسة الخصوصية
              </Link>
              <Link to="/terms" className="text-gray-200 hover:text-white transition-colors">
                الشروط والأحكام
              </Link>
              <Link to="/legal" className="text-gray-200 hover:text-white transition-colors">
                التنويه القانوني
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
