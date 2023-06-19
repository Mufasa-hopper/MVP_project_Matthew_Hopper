const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const app = express();

dotenv.config();

const dbString = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const pool = new Pool({
  connectionString: dbString,
});

app.use(express.static('public'));

app.get('/goodDrinks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM goodDrinks');
    res.json(result.rows).status(200);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});