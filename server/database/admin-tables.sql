-- جدول إعدادات الموقع
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  site_name VARCHAR(255) NOT NULL DEFAULT 'شركة التخليص الجمركي',
  site_description TEXT,
  site_logo VARCHAR(500),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  address TEXT,
  facebook_url VARCHAR(500),
  whatsapp_number VARCHAR(50),
  twitter_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  maintenance_mode BOOLEAN DEFAULT FALSE,
  allow_registration BOOLEAN DEFAULT TRUE,
  email_notifications BOOLEAN DEFAULT TRUE,
  sms_notifications BOOLEAN DEFAULT FALSE,
  google_analytics_id VARCHAR(100),
  meta_keywords TEXT,
  meta_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول إدارة المحتوى والصفحات
CREATE TABLE IF NOT EXISTS content_pages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'private')),
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT,
  featured_image VARCHAR(500),
  template VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  is_homepage BOOLEAN DEFAULT FALSE,
  show_in_menu BOOLEAN DEFAULT TRUE,
  parent_id INTEGER REFERENCES content_pages(id),
  created_by INTEGER REFERENCES users(id),
  updated_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الأخبار والمقالات
CREATE TABLE IF NOT EXISTS news_articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'private')),
  featured_image VARCHAR(500),
  category_id INTEGER,
  tags TEXT[],
  views_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  publish_date TIMESTAMP,
  created_by INTEGER REFERENCES users(id),
  updated_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول فئات الأخبار
CREATE TABLE IF NOT EXISTS news_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7), -- لون hex
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الخدمات
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  icon VARCHAR(100),
  featured_image VARCHAR(500),
  price_from DECIMAL(10,2),
  price_to DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'EGP',
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  meta_title VARCHAR(255),
  meta_description TEXT,
  features TEXT[], -- مميزات الخدمة
  created_by INTEGER REFERENCES users(id),
  updated_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول إدارة الملفات والوسائط
CREATE TABLE IF NOT EXISTS media_files (
  id SERIAL PRIMARY KEY,
  original_name VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_type VARCHAR(100),
  mime_type VARCHAR(100),
  file_size BIGINT,
  width INTEGER,
  height INTEGER,
  alt_text VARCHAR(255),
  title VARCHAR(255),
  description TEXT,
  folder_path VARCHAR(500),
  is_public BOOLEAN DEFAULT TRUE,
  uploaded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول سجل النشاطات
CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50), -- users, cases, pages, etc.
  entity_id INTEGER,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول النسخ الاحتياطية
CREATE TABLE IF NOT EXISTS backups (
  id SERIAL PRIMARY KEY,
  backup_name VARCHAR(255) NOT NULL,
  backup_type VARCHAR(50) NOT NULL, -- database, files, full
  file_path VARCHAR(500),
  file_size BIGINT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- جدول إعدادات البريد الإلكتروني
CREATE TABLE IF NOT EXISTS email_settings (
  id SERIAL PRIMARY KEY,
  smtp_host VARCHAR(255),
  smtp_port INTEGER DEFAULT 587,
  smtp_username VARCHAR(255),
  smtp_password VARCHAR(255),
  smtp_security VARCHAR(10) DEFAULT 'tls', -- tls, ssl, none
  from_email VARCHAR(255),
  from_name VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول قوالب البريد الإلكتروني
CREATE TABLE IF NOT EXISTS email_templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  subject VARCHAR(255),
  body TEXT,
  variables TEXT[], -- متغيرات القالب
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول إعدادات النوتيفيكيشن
CREATE TABLE IF NOT EXISTS notification_settings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  email_notifications BOOLEAN DEFAULT TRUE,
  sms_notifications BOOLEAN DEFAULT FALSE,
  push_notifications BOOLEAN DEFAULT TRUE,
  case_updates BOOLEAN DEFAULT TRUE,
  payment_reminders BOOLEAN DEFAULT TRUE,
  marketing_emails BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول المجلدات (للملفات)
CREATE TABLE IF NOT EXISTS media_folders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  path VARCHAR(500) NOT NULL,
  parent_id INTEGER REFERENCES media_folders(id),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- فهارس للأداء
CREATE INDEX IF NOT EXISTS idx_content_pages_slug ON content_pages(slug);
CREATE INDEX IF NOT EXISTS idx_content_pages_status ON content_pages(status);
CREATE INDEX IF NOT EXISTS idx_news_articles_slug ON news_articles(slug);
CREATE INDEX IF NOT EXISTS idx_news_articles_status ON news_articles(status);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_media_files_path ON media_files(file_path);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON activity_logs(created_at);

-- إدراج إعدادات افتراضية
INSERT INTO site_settings (
  site_name, site_description, contact_email, contact_phone, address
) VALUES (
  'شركة التخليص الجمركي',
  'أفضل خدمات التخليص الجمركي في مصر مع فريق من الخبراء المعتمدين',
  'info@customs.com',
  '01234567890',
  'القاهرة، مصر'
) ON CONFLICT DO NOTHING;

-- إدراج صفحات افتراضية
INSERT INTO content_pages (title, slug, content, status, show_in_menu) VALUES
('الرئيسية', 'home', 'محتوى الصفحة الرئيسية...', 'published', false),
('من نحن', 'about', 'محتوى صفحة من نحن...', 'published', true),
('خدماتنا', 'services', 'محتوى صفحة الخدمات...', 'published', true),
('اتصل بنا', 'contact', 'محتوى صفحة التواصل...', 'published', true),
('سياسة الخصوصية', 'privacy', 'محتوى سياسة الخصوصية...', 'published', false),
('الشروط والأحكام', 'terms', 'محتوى الشروط والأحكام...', 'published', false)
ON CONFLICT (slug) DO NOTHING;

-- إدراج خدمات افتراضية
INSERT INTO services (title, slug, description, short_description, is_active, is_featured) VALUES
('التخليص البحري', 'sea-clearance', 'خدمات تخليص جمركي شاملة للشحن البحري', 'تخليص جمركي للشحن البحري', true, true),
('التخليص الجوي', 'air-clearance', 'تخليص سريع ودقيق للبضائع عبر المطارات', 'تخليص جمركي للشحن الجوي', true, true),
('التخليص البري', 'land-clearance', 'خدمات التخليص الجمركي للشحن البري', 'تخليص جمركي للشحن البري', true, true),
('الاستشارات الجمركية', 'customs-consulting', 'استشارات متخصصة في القوانين الجمركية', 'استشارات جمركية متخصصة', true, false),
('المناطق الحرة', 'free-zones', 'خدمات متخصصة للتعامل مع المناطق الحرة', 'خدمات المناطق الحرة', true, false),
('تخليص وارد وصادر', 'import-export', 'خدمات شاملة للواردات والصادرات', 'خدمات الاستيراد والتصدير', true, true)
ON CONFLICT (slug) DO NOTHING;

-- إدراج فئات أخبار افتراضية
INSERT INTO news_categories (name, slug, description, color) VALUES
('أخبار الجمارك', 'customs-news', 'آخر أخبار مصلحة الجمارك', '#2563EB'),
('القوانين واللوائح', 'laws-regulations', 'تحديثات القوانين والتشريعات', '#DC2626'),
('نصائح التخليص', 'clearance-tips', 'نصائح ومعلومات مفيدة للعملاء', '#059669'),
('أخبار الشركة', 'company-news', 'أخبار وفعاليات الشركة', '#7C3AED')
ON CONFLICT (slug) DO NOTHING;
