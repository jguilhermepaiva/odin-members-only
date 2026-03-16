require("dotenv").config();
const { Client } = require("pg");

// O SQL que define seu schema
const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  membership_status BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
`;

async function main() {
  console.log("⏳ Iniciando a povoação do banco...");

  // No Railway, a DATABASE_URL já vem com tudo que precisamos
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("❌ Erro: DATABASE_URL não encontrada no .env");
    process.exit(1);
  }

  const client = new Client({
    connectionString: connectionString,
    // SSL é obrigatório para conexões externas no Railway
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log("✅ Conectado ao banco de dados.");
    
    await client.query(SQL);
    console.log("✨ Tabelas criadas com sucesso!");
    
  } catch (err) {
    console.error("❌ Erro ao povoar o banco:", err);
  } finally {
    await client.end();
    console.log("🔌 Conexão encerrada.");
  }
}

main();