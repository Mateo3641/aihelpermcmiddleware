import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000
});

db.connect()
  .then(() => console.log("✅ ¡Pool conectado a PostgreSQL en Supabase!"))
  .catch(err => console.error("❌ Error de conexión al Pool:", err));
