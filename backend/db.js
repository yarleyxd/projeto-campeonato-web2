const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const pastaDados = path.join(__dirname, "dados");

if (!fs.existsSync(pastaDados)) {
    fs.mkdirSync(pastaDados, { recursive: true });
}

const caminhoBanco = path.join(pastaDados, "campeonato.db");
const db = new Database(caminhoBanco);

db.pragma("foreign_keys = ON");

db.exec(`
    CREATE TABLE IF NOT EXISTS modalidades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS times (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE,
        cidade TEXT NOT NULL,
        fundacao INTEGER NOT NULL,
        tecnico TEXT NOT NULL,
        ativo INTEGER NOT NULL DEFAULT 1 CHECK (ativo IN (0, 1)),
        modalidade_id INTEGER NOT NULL,
        FOREIGN KEY (modalidade_id) REFERENCES modalidades(id)
    );
`);

module.exports = db;
