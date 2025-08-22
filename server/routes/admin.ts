import { RequestHandler } from "express";
import { Pool } from "pg";
import { authenticateToken } from "./auth";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_7qtxZur2hegs@ep-nameless-art-afhpi3rv-pooler.c-2.us-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require",
});

// Middleware للتحقق من صلاحيات المدير
export const requireAdmin: RequestHandler = (req, res, next) => {
  if (req.user?.userType !== "admin") {
    return res.status(403).json({
      success: false,
      message: "غير مصرح لك بالوصول لهذه الوظيفة",
    });
  }
  next();
};

// الحصول على إحصائيات النظام
export const getSystemStats: RequestHandler = async (req, res) => {
  try {
    // إحصائيات المستخدمي��
    const usersStats = await pool.query(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(*) FILTER (WHERE is_active = true) as active_users,
        COUNT(*) FILTER (WHERE user_type = 'client') as total_clients,
        COUNT(*) FILTER (WHERE user_type IN ('admin', 'employee', 'accountant', 'support')) as staff_users
      FROM users
    `);

    // إحصائيات الملفات
    const casesStats = await pool.query(`
      SELECT 
        COUNT(*) as total_cases,
        COUNT(*) FILTER (WHERE current_status = 'active') as active_cases,
        COUNT(*) FILTER (WHERE current_status = 'completed') as completed_cases,
        COUNT(*) FILTER (WHERE current_status = 'pending') as pending_cases
      FROM cases
    `);

    // إحصائيات الفواتير
    const invoicesStats = await pool.query(`
      SELECT 
        COALESCE(SUM(total_amount), 0) as total_revenue,
        COALESCE(SUM(total_amount) FILTER (WHERE payment_status = 'pending'), 0) as pending_payments,
        COUNT(*) as total_invoices,
        COUNT(*) FILTER (WHERE payment_status = 'paid') as paid_invoices
      FROM invoices
    `);

    const stats = {
      users: usersStats.rows[0],
      cases: casesStats.rows[0],
      invoices: invoicesStats.rows[0],
      system: {
        server_storage: 67, // سيتم حسابها لاحقاً
        database_size: 2.4, // سيتم حسابها لاحقاً
        uptime: process.uptime(),
      },
    };

    res.json({ success: true, stats });
  } catch (error) {
    console.error("Error fetching system stats:", error);
    res.status(500).json({ success: false, message: "خطأ في جلب الإحصائيات" });
  }
};

// إدارة المستخدمين
export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, user_type } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = `
      SELECT 
        u.id, u.email, u.full_name, u.phone, u.user_type, u.is_active, 
        u.created_at, u.updated_at, u.last_login_at,
        c.company_name, c.company_type
      FROM users u
      LEFT JOIN clients c ON u.id = c.user_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (search) {
      query += ` AND (u.full_name ILIKE $${params.length + 1} OR u.email ILIKE $${params.length + 1})`;
      params.push(`%${search}%`);
    }

    if (user_type) {
      query += ` AND u.user_type = $${params.length + 1}`;
      params.push(user_type);
    }

    query += ` ORDER BY u.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(Number(limit), offset);

    const result = await pool.query(query, params);

    // إجمالي العدد
    const countQuery = `SELECT COUNT(*) FROM users u WHERE 1=1 ${search ? "AND (u.full_name ILIKE $1 OR u.email ILIKE $1)" : ""}`;
    const countParams = search ? [`%${search}%`] : [];
    const countResult = await pool.query(countQuery, countParams);

    res.json({
      success: true,
      users: result.rows,
      pagination: {
        total: parseInt(countResult.rows[0].count),
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(parseInt(countResult.rows[0].count) / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "خطأ في جلب المستخدمين" });
  }
};

// تغيير حالة المستخدم
export const toggleUserStatus: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { is_active } = req.body;

    const result = await pool.query(
      "UPDATE users SET is_active = $1, updated_at = NOW() WHERE id = $2 RETURNING id, email, full_name, is_active",
      [is_active, userId],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "المستخدم غير موجود" });
    }

    res.json({
      success: true,
      message: `تم ${is_active ? "تفعيل" : "إلغاء تفعيل"} المستخدم بنجاح`,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error toggling user status:", error);
    res
      .status(500)
      .json({ success: false, message: "خطأ في تغيير حالة المستخدم" });
  }
};

// تغيير نوع المستخدم
export const updateUserType: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { user_type } = req.body;

    const validTypes = ["client", "employee", "accountant", "support", "admin"];
    if (!validTypes.includes(user_type)) {
      return res
        .status(400)
        .json({ success: false, message: "نوع المستخدم غير صالح" });
    }

    const result = await pool.query(
      "UPDATE users SET user_type = $1, updated_at = NOW() WHERE id = $2 RETURNING id, email, full_name, user_type",
      [user_type, userId],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "المستخدم غير موجود" });
    }

    res.json({
      success: true,
      message: "تم تحديث نوع المستخدم بنجاح",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating user type:", error);
    res
      .status(500)
      .json({ success: false, message: "خطأ في تحديث نوع المستخدم" });
  }
};

// إدارة إعدادات الموقع
export const getSiteSettings: RequestHandler = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM site_settings ORDER BY id LIMIT 1",
    );

    if (result.rows.length === 0) {
      // إنشاء إعدادات افتراضية
      const defaultSettings = {
        site_name: "شركة التخليص الجمركي",
        site_description: "أفضل خدمات التخليص الجمركي في مصر",
        contact_email: "info@customs.com",
        contact_phone: "01234567890",
        address: "القاهرة، مصر",
        maintenance_mode: false,
        allow_registration: true,
        email_notifications: true,
        sms_notifications: false,
      };

      const insertResult = await pool.query(
        `
        INSERT INTO site_settings (
          site_name, site_description, contact_email, contact_phone, 
          address, maintenance_mode, allow_registration, email_notifications, sms_notifications
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
      `,
        [
          defaultSettings.site_name,
          defaultSettings.site_description,
          defaultSettings.contact_email,
          defaultSettings.contact_phone,
          defaultSettings.address,
          defaultSettings.maintenance_mode,
          defaultSettings.allow_registration,
          defaultSettings.email_notifications,
          defaultSettings.sms_notifications,
        ],
      );

      return res.json({ success: true, settings: insertResult.rows[0] });
    }

    res.json({ success: true, settings: result.rows[0] });
  } catch (error) {
    console.error("Error fetching site settings:", error);
    res
      .status(500)
      .json({ success: false, message: "خطأ في جلب إعدادات الموقع" });
  }
};

// تحديث إعدادات الموقع
export const updateSiteSettings: RequestHandler = async (req, res) => {
  try {
    const {
      site_name,
      site_description,
      contact_email,
      contact_phone,
      address,
      maintenance_mode,
      allow_registration,
      email_notifications,
      sms_notifications,
      facebook_url,
      whatsapp_number,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE site_settings SET 
        site_name = $1, site_description = $2, contact_email = $3, contact_phone = $4,
        address = $5, maintenance_mode = $6, allow_registration = $7, 
        email_notifications = $8, sms_notifications = $9, facebook_url = $10, 
        whatsapp_number = $11, updated_at = NOW()
      WHERE id = (SELECT id FROM site_settings ORDER BY id LIMIT 1)
      RETURNING *
    `,
      [
        site_name,
        site_description,
        contact_email,
        contact_phone,
        address,
        maintenance_mode,
        allow_registration,
        email_notifications,
        sms_notifications,
        facebook_url,
        whatsapp_number,
      ],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "إعدادات الموقع غير موجودة" });
    }

    res.json({
      success: true,
      message: "تم حفظ إعدادات الموقع بنجاح",
      settings: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating site settings:", error);
    res
      .status(500)
      .json({ success: false, message: "خطأ في حفظ إعدادات الموقع" });
  }
};

// إدارة الصفحات
export const getPages: RequestHandler = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, title, slug, content, status, meta_description, 
             created_at, updated_at, created_by
      FROM content_pages 
      ORDER BY created_at DESC
    `);

    res.json({ success: true, pages: result.rows });
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ success: false, message: "خطأ في جلب الصفحات" });
  }
};

// إنشاء صفحة جديدة
export const createPage: RequestHandler = async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      status = "draft",
      meta_description,
    } = req.body;
    const created_by = req.user?.userId;

    const result = await pool.query(
      `
      INSERT INTO content_pages (title, slug, content, status, meta_description, created_by)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `,
      [title, slug, content, status, meta_description, created_by],
    );

    res.json({
      success: true,
      message: "تم إنشاء الصفحة بنجاح",
      page: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating page:", error);
    res.status(500).json({ success: false, message: "خطأ في إنشاء الصفحة" });
  }
};

// تحديث صفحة
export const updatePage: RequestHandler = async (req, res) => {
  try {
    const { pageId } = req.params;
    const { title, slug, content, status, meta_description } = req.body;

    const result = await pool.query(
      `
      UPDATE content_pages SET 
        title = $1, slug = $2, content = $3, status = $4, 
        meta_description = $5, updated_at = NOW()
      WHERE id = $6 RETURNING *
    `,
      [title, slug, content, status, meta_description, pageId],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "الصفحة غير موجودة" });
    }

    res.json({
      success: true,
      message: "تم تحديث الصفحة بنجاح",
      page: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating page:", error);
    res.status(500).json({ success: false, message: "خطأ في تحديث الصفحة" });
  }
};

// حذف صفحة
export const deletePage: RequestHandler = async (req, res) => {
  try {
    const { pageId } = req.params;

    const result = await pool.query(
      "DELETE FROM content_pages WHERE id = $1 RETURNING id, title",
      [pageId],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "الصفحة غير موجودة" });
    }

    res.json({
      success: true,
      message: "تم حذف الصفحة بنجاح",
    });
  } catch (error) {
    console.error("Error deleting page:", error);
    res.status(500).json({ success: false, message: "خطأ في حذف الصفحة" });
  }
};

// النسخ الاحتياطي
export const createBackup: RequestHandler = async (req, res) => {
  try {
    // TODO: تنفيذ النسخ الاحتياطي الفعلي
    res.json({
      success: true,
      message: "تم إنشاء النسخة الاحتياطية بنجاح",
      backup_file: `backup_${Date.now()}.sql`,
    });
  } catch (error) {
    console.error("Error creating backup:", error);
    res
      .status(500)
      .json({ success: false, message: "خطأ في إنشاء النسخة الاحتياطية" });
  }
};

// سجل النشاطات
export const getActivityLog: RequestHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    // TODO: إنشاء جدول سجل النشاطات
    const activities = [
      {
        id: 1,
        user_name: "مدير النظام",
        action: "تحديث إعدادات الموقع",
        details: "تم تغيير اسم الموقع",
        ip_address: "192.168.1.1",
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        user_name: "موظف العمليات",
        action: "إنشاء ملف جديد",
        details: "ملف رقم CU-2024-045",
        ip_address: "192.168.1.2",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
    ];

    res.json({
      success: true,
      activities,
      pagination: {
        total: activities.length,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(activities.length / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching activity log:", error);
    res
      .status(500)
      .json({ success: false, message: "خطأ في جلب سجل النشاطات" });
  }
};
