import bcrypt from "bcrypt";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_7qtxZur2hegs@ep-nameless-art-afhpi3rv-pooler.c-2.us-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require",
});

async function createAdminUser() {
  try {
    const email = "admin@customs.com";
    const password = "admin123"; // كلمة مرور واضحة للأدمن
    const fullName = "مدير النظام";

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // التحقق من وجود المستخدم
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      console.log("Admin user already exists!");
      return;
    }

    // إنشاء المستخدم
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, full_name, user_type, is_active)
       VALUES ($1, $2, $3, 'admin', true)
       RETURNING id, email, full_name, user_type`,
      [email, hashedPassword, fullName]
    );

    console.log("Admin user created successfully:", result.rows[0]);
    console.log("\nAdmin Login Credentials:");
    console.log("Email: admin@customs.com");
    console.log("Password: admin123");

  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await pool.end();
  }
}

createAdminUser();
