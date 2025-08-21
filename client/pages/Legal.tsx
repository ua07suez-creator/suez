import React from 'react';
import PlaceholderPage from '../components/PlaceholderPage';

const Legal = () => {
  return (
    <PlaceholderPage
      title="التنويه القانوني"
      description="المعلومات القانونية والتراخيص والاعتمادات الخاصة بشركة التخليص الجمركي في مصر"
      suggestedContent={[
        "تراخيص ممارسة المهنة",
        "الاعتمادات من الجهات الحكومية",
        "عضوية الجمعيات المهنية",
        "الالتزام بالقوانين المصرية",
        "شهادات الجودة والاعتماد",
        "التأمين على الأعمال والمسؤولية",
        "معلومات التسجيل التجاري"
      ]}
    />
  );
};

export default Legal;
