const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const app = express();
const { authenticateUser } = require('./authMiddleware');

dotenv.config();

const dbString = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const pool = new Pool({
  connectionString: dbString,
});
app.use(express.json());
app.use(express.static('public'));

// Retrieve a list of available drinks
app.get('/drinks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM goodDrinks');
    res.json(result.rows).status(200);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});
// User Registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validate input data
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Check if the username already exists in the database
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Insert the new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, password]
    );

    res.status(201).json({ message: 'User registered successfully', userId: newUser.rows[0].id });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate input data
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Check if the user exists in the database
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if the password matches
    const matchedPassword = user.rows[0].password === password;

    if (!matchedPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Authentication successful
    const authToken = generateAuthToken(); // You can use a function to generate a secure authentication token
    //An authentication token is a unique string or token that is used to authenticate and identify a user. It is typically generated when a user logs in or successfully authenticates with the system

    // Store the authToken in a database or cache to maintain the user's authenticated state

    res.status(200).json({ message: 'Authentication successful', authToken });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/drinks/:drinkId/reviews', authenticateUser, async (req, res) => {
  // The authenticateUser middleware will be executed before this route handler
  // If the authentication is successful, the execution will reach this point
  // You can access the authenticated user information from req.user
  const { drinkId } = req.params;
  const { rating, reviewText } = req.body;

  // Validate input data (e.g., check if required fields are present)

  try {
    // Check if the drink exists in the database
    const drink = await pool.query('SELECT * FROM goodDrinks WHERE id = $1', [drinkId]);

    if (drink.rows.length === 0) {
      return res.status(404).json({ error: 'Drink not found' });
    }

    // Insert the review into the database, associating it with the authenticated user
    const newReview = await pool.query(
      'INSERT INTO userDrinkReviews (userId, drinkId, rating, reviewText) VALUES ($1, $2, $3, $4) RETURNING reviewId',
      [req.user.userId, drinkId, rating, reviewText]
    );

    res.status(200).json({ message: 'Review added successfully', reviewId: newReview.rows[0].reviewId });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve the drink history of a specific user
app.get('/users/:userId/drink-history', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      'SELECT goodDrinks.*, userDrinkReviews.rating, userDrinkReviews.reviewText ' +
      'FROM goodDrinks ' +
      'JOIN userDrinkReviews ON goodDrinks.id = userDrinkReviews.drinkId ' +
      'WHERE userDrinkReviews.userId = $1',
      [userId]
    );
    res.json(result.rows).status(200);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve the profile information of a specific user
app.get('/users/:userId/profile', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    res.json(result.rows[0]).status(200);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a review
app.put('/reviews/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  const { rating, reviewText } = req.body;

  // Validate input data (e.g., check if required fields are present)

  try {
    // Check if the review exists in the database
    const existingReview = await pool.query('SELECT * FROM userDrinkReviews WHERE reviewId = $1', [reviewId]);

    if (existingReview.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Update the review in the database
    await pool.query(
      'UPDATE userDrinkReviews SET rating = $1, reviewText = $2 WHERE reviewId = $3',
      [rating, reviewText, reviewId]
    );

    res.status(200).json({ message: 'Review updated successfully' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a review
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
  console.log(`We're listening on port ${PORT}`)
})