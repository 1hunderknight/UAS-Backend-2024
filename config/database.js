// import mysql
const mysql = require("mysql");

// import dotenv dan menjalankan method config
require("dotenv").config();

// destructing object process.env
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

/**
 * Membuat koneksi database menggunakan method createConnection
 * Method menerima parameter object: host, user, password, database
 */
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

/**
 * Menghubungkan ke database menggunakan method connect
 * Menerima parameter callback
 */
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }

  console.log("Connected to database");

  // Tambahkan event listener untuk menangani kesalahan koneksi
  db.on("error", (err) => {
    console.error("Database error: " + err.message);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Coba untuk melakukan reconnect jika koneksi terputus
      db.connect((err) => {
        if (err) {
          console.error("Reconnect error: " + err.stack);
        } else {
          console.log("Reconnected to database");
        }
      });
    } else {
      throw err;
    }
  });
});

module.exports = db;
