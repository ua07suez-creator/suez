import { RequestHandler } from "express";
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 
    'postgresql://neondb_owner:npg_7qtxZur2hegs@ep-nameless-art-afhpi3rv-pooler.c-2.us-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require'
});

// اختبار الاتصال بقاعدة البيانات
export const testConnection: RequestHandler = async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      success: true, 
      message: 'Database connection successful', 
      time: result.rows[0].now 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed',
      error: error.message 
    });
  }
};

// اختبار المستخدمين
export const testUsers: RequestHandler = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, full_name, user_type FROM users LIMIT 5');
    res.json({ 
      success: true, 
      users: result.rows 
    });
  } catch (error) {
    console.error('Users query error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Users query failed',
      error: error.message 
    });
  }
};

// تسجيل دخول بسيط بدون bcrypt للاختبار
export const simpleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt:', { email, password });
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required'
      });
    }

    // البحث عن المستخدم
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const userResult = await pool.query(userQuery, [email]);
    
    console.log('User query result:', userResult.rows.length);

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = userResult.rows[0];
    console.log('Found user:', { id: user.id, email: user.email, type: user.user_type });

    // للاختبار: قبول كلمة مرور "test123"
    if (password === 'test123') {
      return res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          user_type: user.user_type
        },
        message: 'Login successful (test mode)'
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid password (use test123 for testing)'
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed',
      error: error.message 
    });
  }
};
