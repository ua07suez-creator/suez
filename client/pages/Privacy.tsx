import React from 'react';
import PlaceholderPage from '../components/PlaceholderPage';

const Privacy = () => {
  return (
    <PlaceholderPage
      title="سياسة الخصوصية"
      description="نحن ملتزمون بحماية خصوصيتكم وبياناتكم الشخصية. تعرفوا على كيفية جمع واستخدام وحماية معلوماتكم"
      suggestedContent={[
        "كيفية جمع البيانات الشخصية",
        "استخدامات البيانات المجمعة",
        "مشاركة البيانات مع الأطراف الثالثة",
        "إجراءات الأمان وحماية البيانات",
        "حقوقكم في البيانات الشخصية",
        "سياسة ملفات تعريف الارتباط (Cookies)",
        "كيفية التواصل بشأن الخصوصية"
      ]}
    />
  );
};

export default Privacy;
