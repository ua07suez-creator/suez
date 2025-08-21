import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Globe } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-navy-light text-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 space-x-reverse">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-navy-dark font-bold text-xl">تج</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold">شركة التخليص الجمركي</h1>
                <p className="text-xs opacity-90">خدمات متميزة وسرعة في الإنجاز</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            <Link
              to="/"
              className="hover:text-gray-200 transition-colors font-medium"
            >
              الرئيسية
            </Link>
            <Link
              to="/about"
              className="hover:text-gray-200 transition-colors font-medium"
            >
              من نحن
            </Link>
            <Link
              to="/services"
              className="hover:text-gray-200 transition-colors font-medium"
            >
              خدماتنا
            </Link>
            <Link
              to="/blog"
              className="hover:text-gray-200 transition-colors font-medium"
            >
              المدونة
            </Link>
            <Link
              to="/faq"
              className="hover:text-gray-200 transition-colors font-medium"
            >
              الأسئلة الشائعة
            </Link>
            <Link
              to="/contact"
              className="hover:text-gray-200 transition-colors font-medium"
            >
              اتصل بنا
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
            {/* Language Toggle */}
            <button className="flex items-center space-x-1 space-x-reverse text-sm hover:text-gray-200 transition-colors">
              <Globe className="w-4 h-4" />
              <span>العربية</span>
            </button>

            {/* Client Login */}
            <Link
              to="/login"
              className="border-2 border-white text-white hover:bg-white hover:text-navy-light px-4 py-2 rounded-lg transition-all font-medium"
            >
              دخول العملاء
            </Link>

            {/* Free Consultation CTA */}
            <Link
              to="/consultation"
              className="bg-white text-navy-light hover:bg-gray-100 px-4 py-2 rounded-lg transition-all font-semibold flex items-center space-x-2 space-x-reverse"
            >
              <Phone className="w-4 h-4" />
              <span>استشارة مجانية</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-navy-hover transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-navy-medium">
            <div className="py-4 space-y-4">
              <Link
                to="/"
                className="block hover:text-gray-200 transition-colors font-medium"
                onClick={toggleMenu}
              >
                الرئيسية
              </Link>
              <Link
                to="/about"
                className="block hover:text-gray-200 transition-colors font-medium"
                onClick={toggleMenu}
              >
                من نحن
              </Link>
              <Link
                to="/services"
                className="block hover:text-gray-200 transition-colors font-medium"
                onClick={toggleMenu}
              >
                خدماتنا
              </Link>
              <Link
                to="/blog"
                className="block hover:text-gray-200 transition-colors font-medium"
                onClick={toggleMenu}
              >
                المدونة
              </Link>
              <Link
                to="/faq"
                className="block hover:text-gray-200 transition-colors font-medium"
                onClick={toggleMenu}
              >
                الأسئلة الشائعة
              </Link>
              <Link
                to="/contact"
                className="block hover:text-gray-200 transition-colors font-medium"
                onClick={toggleMenu}
              >
                اتصل بنا
              </Link>
              
              {/* Mobile CTAs */}
              <div className="pt-4 border-t border-navy-medium space-y-3">
                <Link
                  to="/login"
                  className="block w-full text-center border-2 border-white text-white hover:bg-white hover:text-navy-light px-4 py-2 rounded-lg transition-all font-medium"
                  onClick={toggleMenu}
                >
                  دخول العملاء
                </Link>
                <Link
                  to="/consultation"
                  className="block w-full text-center bg-white text-navy-light hover:bg-gray-100 px-4 py-2 rounded-lg transition-all font-semibold"
                  onClick={toggleMenu}
                >
                  اطلب استشارة مجانية
                </Link>
                <button className="flex items-center justify-center w-full space-x-1 space-x-reverse text-sm hover:text-gray-200 transition-colors">
                  <Globe className="w-4 h-4" />
                  <span>تبديل اللغة</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
