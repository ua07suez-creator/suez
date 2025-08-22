import { RequestHandler } from "express";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_7qtxZur2hegs@ep-nameless-art-afhpi3rv-pooler.c-2.us-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require",
});

// ترقية مستخدم إلى admin
export const upgradeToAdmin: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "البريد الإلكتروني مطلوب"
      });
    }

    const result = await pool.query(
      "UPDATE users SET user_type = 'admin', updated_at = NOW() WHERE email = $1 RETURNING id, email, full_name, user_type",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "المستخدم غير موجود"
      });
    }

    res.json({
      success: true,
      message: "تم ترقية المستخدم إلى مدير بنجاح",
      user: result.rows[0]
    });
  } catch (error) {
    console.error("Error upgrading user:", error);
    res.status(500).json({
      success: false,
      message: "خطأ في ترقية المستخدم"
    });
  }
};
