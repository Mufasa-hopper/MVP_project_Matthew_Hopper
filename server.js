const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const dbString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: dbString,
});

app.use(express.json());
app.use(express.static('public'));

// Retrieve a list of available drinks
app.get('/goodDrinks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM goodDrinks');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new drink review
app.post('/drinks/:drinkId/reviews', async (req, res) => {
  const { drinkId, rating, reviewText } = req.body;

  try {
    // Check if the drink exists in the database
    const drink = await pool.query('SELECT * FROM goodDrinks WHERE id = $1', [drinkId]);

    if (drink.rows.length === 0) {
      return res.status(404).send('Drink not found');
    }

    // Insert the review into the database
    const newReview = await pool.query(
      'INSERT INTO userDrinkReviews (drinkId, rating, reviewText) VALUES ($1, $2, $3) RETURNING reviewId',
      [drinkId, rating, reviewText]
    );

    res.status(201).send('Review added successfully');
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Read a specific drink review
app.get('/reviews/:reviewId', async (req, res) => {
  const { reviewId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM userDrinkReviews WHERE reviewId = $1', [reviewId]);

    if (result.rows.length === 0) {
      return res.status(404).send('Review not Found');
    } else {
    res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a drink review
app.put('/reviews/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  const { rating, reviewText } = req.body;

  try {
    // Check if the review exists in the database
    const existingReview = await pool.query('SELECT * FROM userDrinkReviews WHERE reviewId = $1', [reviewId]);

    if (existingReview.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    } else {

    // Update the review in the database
    await pool.query(
      'UPDATE userDrinkReviews SET rating = $1, reviewText = $2 WHERE reviewId = $3',
      [rating, reviewText, reviewId])
      res.status(200).json({ message: 'Review updated successfully' });
    }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Delete a drink review
  app.delete('/reviews/:reviewId', async (req, res) => {
    const { reviewId } = req.params;
  
    try {
      // Check if the review exists in the database
      const existingReview = await pool.query('SELECT * FROM userDrinkReviews WHERE reviewId = $1', [reviewId]);
  
      if (existingReview.rows.length === 0) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      // Delete the review from the database
      await pool.query('DELETE FROM userDrinkReviews WHERE reviewId = $1', [reviewId]);
  
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  