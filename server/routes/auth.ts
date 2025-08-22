import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@shared/customs-types";

// توصيل قاعدة البيانات (سنستخدم pg)
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_7qtxZur2hegs@ep-nameless-art-afhpi3rv-pooler.c-2.us-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require",
});

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";

// تسجيل الدخول
export const loginHandler: RequestHandler = async (req, res) => {
  try {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      const response: LoginResponse = {
        success: false,
        message: "البريد الإلكتروني وكلمة المرور مطلوبان",
      };
      return res.status(400).json(response);
    }

    // البحث عن المستخدم
    const userQuery =
      "SELECT * FROM users WHERE email = $1 AND is_active = true";
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      const response: LoginResponse = {
        success: false,
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      };
      return res.status(401).json(response);
    }

    const user = userResult.rows[0];

    // التحقق من كلمة المرور
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      const response: LoginResponse = {
        success: false,
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      };
      return res.status(401).json(response);
    }

    // إنشاء JWT Token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userType: user.user_type,
      },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    // البحث عن بيانات العميل إذا كان المستخدم عميل
    let client = null;
    if (user.user_type === "client") {
      const clientQuery = "SELECT * FROM clients WHERE user_id = $1";
      const clientResult = await pool.query(clientQuery, [user.id]);
      if (clientResult.rows.length > 0) {
        client = clientResult.rows[0];
      }
    }

    // إزالة كلمة المرور من الاستجابة
    const { password_hash, ...userWithoutPassword } = user;

    const response: LoginResponse = {
      success: true,
      user: userWithoutPassword,
      client,
      token,
      message: "تم تسجيل الدخول بنجاح",
    };

    res.json(response);
  } catch (error) {
    console.error("خطأ في تسجيل الدخول:", error);
    const response: LoginResponse = {
      success: false,
      message: "حدث خطأ في الخادم",
    };
    res.status(500).json(response);
  }
};

// التسجيل
export const registerHandler: RequestHandler = async (req, res) => {
  try {
    const {
      email,
      password,
      full_name,
      phone,
      company_name,
      company_type,
      tax_number,
      commercial_register,
      address,
      city,
    }: RegisterRequest = req.body;

    if (!email || !password || !full_name || !company_type) {
      const response: RegisterResponse = {
        success: false,
        message: "البريد الإلكتروني وكلمة المرور والاسم ونوع الشركة مطلوبة",
      };
      return res.status(400).json(response);
    }

    // التحقق من وجود البريد الإلكتروني
    const existingUserQuery = "SELECT id FROM users WHERE email = $1";
    const existingUserResult = await pool.query(existingUserQuery, [email]);

    if (existingUserResult.rows.length > 0) {
      const response: RegisterResponse = {
        success: false,
        message: "البريد الإلكتروني مستخدم بالفعل",
      };
      return res.status(400).json(response);
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // بداية المعاملة
    await pool.query("BEGIN");

    try {
      // إدراج المستخدم
      const userInsertQuery = `
        INSERT INTO users (email, password_hash, full_name, phone, user_type)
        VALUES ($1, $2, $3, $4, 'client')
        RETURNING id, email, full_name, phone, user_type, is_active, created_at, updated_at
      `;
      const userResult = await pool.query(userInsertQuery, [
        email,
        hashedPassword,
        full_name,
        phone,
      ]);
      const newUser = userResult.rows[0];

      // إدراج بيانات العميل
      const clientInsertQuery = `
        INSERT INTO clients (user_id, company_name, company_type, tax_number, commercial_register, address, city, country)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'Egypt')
        RETURNING *
      `;
      const clientResult = await pool.query(clientInsertQuery, [
        newUser.id,
        company_name,
        company_type,
        tax_number,
        commercial_register,
        address,
        city || "القاهرة",
      ]);

      // تأكيد المعاملة
      await pool.query("COMMIT");

      const response: RegisterResponse = {
        success: true,
        user: newUser,
        message: "تم إنشاء الحساب بنجاح",
      };

      res.status(201).json(response);
    } catch (error) {
      // إلغاء المعاملة في حالة الخطأ
      await pool.query("ROLLBACK");
      throw error;
    }
  } catch (error) {
    console.error("خطأ في التسجيل:", error);
    const response: RegisterResponse = {
      success: false,
      message: "حدث خطأ في إنشاء الحساب",
    };
    res.status(500).json(response);
  }
};

// التحقق من صحة الرمز ال��ميز (Middleware)
export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "رمز المصادقة مطلوب" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "رمز المصادقة غير صالح" });
    }

    req.user = decoded;
    next();
  });
};

// الحصول على بيانات المستخدم الحالي
export const getCurrentUserHandler: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "غير مصرح" });
    }

    const userQuery =
      "SELECT id, email, full_name, phone, user_type, is_active, created_at, updated_at FROM users WHERE id = $1";
    const userResult = await pool.query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "المستخدم غير موجود" });
    }

    const user = userResult.rows[0];

    // البحث عن بيانات العميل إذا كان المست��دم عميل
    let client = null;
    if (user.user_type === "client") {
      const clientQuery = "SELECT * FROM clients WHERE user_id = $1";
      const clientResult = await pool.query(clientQuery, [user.id]);
      if (clientResult.rows.length > 0) {
        client = clientResult.rows[0];
      }
    }

    res.json({
      success: true,
      user,
      client,
    });
  } catch (error) {
    console.error("خطأ في الحصول على بيانات المستخدم:", error);
    res.status(500).json({ success: false, message: "حدث خطأ في الخادم" });
  }
};
