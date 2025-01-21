import express from "express";
import mysql from "mysql2";
import os from "os";

const app = express();
const port = 8080;
const version = "1.0.0";

let dbStatus = "";

// Environment variables for MySQL configuration
const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USERNAME || "hellom210",
  password: process.env.DB_PASSWORD || "hellom210",
  database: process.env.DB_NAME || "hellom210",
  port: Number(process.env.DB_PORT) || 3306,
};

// Falls Ctrl-C gedrückt oder Exit-Signal gesendet wird soll Applikation beenden.

function exitHandle(signal: Event): void {
  console.log(`Exiting because of ${signal}`);
  process.exit(0);
}

process.on("SIGINT", exitHandle);
process.on("SIGTERM", exitHandle);

// MySQL connection
const db = mysql.createConnection(dbConfig);
db.connect((err) => {
  dbStatus = err
    ? `Error: No Connection to ${dbConfig.host} on Port ${dbConfig.port}.`
    : `Success: Connected to ${dbConfig.database} on ${dbConfig.host}.`;
  
  if (err) { 
    console.log(err);
  } 
});

// Routes
app.get("/", (req, res) => {
  res.send(
    `<h1>Hellom210</h1>
    <strong>Version:</strong> ${version}<br> 
    <strong>Hostname:</strong> ${os.hostname()}<br>
    <strong>DB Status:</strong> ${dbStatus}`
  );
});

// Start server
app.listen(port, () => {
  console.log(
    `Server running on http://localhost:${port}! Press Ctrl-C to Exit.`
  );
});
