import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../../data/jobs.db');

let db;

export async function getDatabase() {
  if (!db) {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    await db.configure('busyTimeout', 1000);
  }
  return db;
}

export async function initDatabase() {
  const database = await getDatabase();
  
  // Users table
  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Jobs table
  await database.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      title TEXT NOT NULL,
      link TEXT,
      status TEXT DEFAULT 'Saved',
      applicationDate DATETIME,
      keyContacts TEXT,
      salaryExpectations TEXT,
      notes TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  console.log('Database initialized');
}
