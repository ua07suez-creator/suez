import React from 'react';
import PlaceholderPage from '../components/PlaceholderPage';

const Login = () => {
  return (
    <PlaceholderPage
      title="دخول العملاء"
      description="صفحة تسجيل الدخول الآمنة لعملائنا للوصول إلى بوابة العميل ومتابعة ملفاتهم وطلباتهم"
      suggestedContent={[
        "نظام تسجيل دخول آمن مع كلمة مرور",
        "بوابة العميل الشخصية",
        "متابعة حالة الملفات والطلبات",
        "تحميل ورفع المستندات",
        "عرض الفواتير والمدفوعات",
        "دردشة مباشرة مع فريق الدعم",
        "تحديثات فورية عبر البريد والرسائل"
      ]}
    />
  );
};

export default Login;
