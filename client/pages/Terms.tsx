import React from 'react';
import PlaceholderPage from '../components/PlaceholderPage';

const Terms = () => {
  return (
    <PlaceholderPage
      title="الشروط والأحكام"
      description="الشروط والأحكام الخاصة باستخدام خدماتنا والتعامل مع شركة التخليص الجمركي"
      suggestedContent={[
        "شروط استخدام الموقع الإلكتروني",
        "شروط وأحكام الخدمات الجمركية",
        "المسؤوليات والضمانات",
        "سياسة الدفع والاسترداد",
        "إنهاء الخدمة وحل النزاعات",
        "حقوق الملكية الفكرية",
        "القانون المطبق والاختصاص القضائي"
      ]}
    />
  );
};

export default Terms;
