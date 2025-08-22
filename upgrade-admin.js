const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_7qtxZur2hegs@ep-nameless-art-afhpi3rv-pooler.c-2.us-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require",
});

async function upgradeToAdmin() {
  try {
    const result = await pool.query(
      "UPDATE users SET user_type = 'admin' WHERE email = 'admin@customs.com' RETURNING *",
    );

    console.log("User upgraded to admin:", result.rows[0]);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await pool.end();
  }
}

upgradeToAdmin();
