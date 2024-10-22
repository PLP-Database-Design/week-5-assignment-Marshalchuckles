// Step 1: Load dependencies and environment variables
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from the .env file

// Step 2: Initialize the Express application
const app = express();

// Step 3: Set up database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Step 4: Question 1 - Retrieve all patients
app.get('/patients', (req, res) => {
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Database query failed.');
    }
    res.json(results);
  });
});

// Step 5: Question 2 - Retrieve all providers
app.get('/providers', (req, res) => {
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Database query failed.');
    }
    res.json(results);
  });
});

// Step 6: Question 3 - Filter patients by first name
app.get('/patients/filter', (req, res) => {
  const { first_name } = req.query;
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  db.query(sql, [first_name], (err, results) => {
    if (err) {
      return res.status(500).send('Database query failed.');
    }
    res.json(results);
  });
});

// Step 7: Question 4 - Retrieve providers by specialty
app.get('/providers/specialty', (req, res) => {
  const { provider_specialty } = req.query;
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
  db.query(sql, [provider_specialty], (err, results) => {
    if (err) {
      return res.status(500).send('Database query failed.');
    }
    res.json(results);
  });
});

// Step 8: Listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
