import * as SQLite from 'expo-sqlite';

export const initDB = async () => {
  const db = await SQLite.openDatabaseAsync('appData.db');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS imc_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      weight REAL,
      height REAL,
      imc REAL,
      date TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS orders_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      order_details TEXT,
      date TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);
};