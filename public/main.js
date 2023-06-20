// Register a new user
async function registerUser(username, email, password) {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
  
      const userData = await response.json();
      const userId = userData.userId;
      // You can store the user ID in the client-side storage or use it for subsequent requests
      return userId;
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error
    }
  }
  
  // Log in a user
  async function loginUser(username, password) {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
  
      const userData = await response.json();
      const token = userData.token;
      // You can store the session token in the client-side storage or use it for subsequent requests
      return token;
    } catch (error) {
      console.error('Error logging in user:', error);
      // Handle error
    }
  }
  
  // Add a review for a specific drink
  async function addReview(drinkId, rating, reviewText, token) {
    try {
      const response = await fetch(`/drinks/${drinkId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the session token in the request headers
        },
        body: JSON.stringify({ rating, reviewText }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
  
      const reviewData = await response.json();
      const reviewId = reviewData.reviewId;
      // Handle successful review addition
      console.log('Review added successfully. Review ID:', reviewId);
    } catch (error) {
      console.error('Error adding review:', error);
      // Handle error
    }
  }
  
  // Update a review
  async function updateReview(reviewId, rating, reviewText, token) {
    try {
      const response = await fetch(`/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the session token in the request headers
        },
        body: JSON.stringify({ rating, reviewText }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
  
      // Handle successful review update
      console.log('Review updated successfully.');
    } catch (error) {
      console.error('Error updating review:', error);
      // Handle error
    }
  }
  
  // Delete a review
  async function deleteReview(reviewId, token) {
    try {
      const response = await fetch(`/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Include the session token in the request headers
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
     // Handle successful review deletion
     console.log('Review deleted successfully.');
    } catch (error) {
      console.error('Error deleting review:', error);
      // Handle error
    }
  }
  
  // Example usage
  async function exampleUsage() {
    try {
      // Register a new user
      const username = 'johnDoe';
      const email = 'johndoe@example.com';
      const password = 'password123';
      const userId = await registerUser(username, email, password);
      console.log('User registered successfully. User ID:', userId);
  
      // Log in the user
      const token = await loginUser(username, password);
      console.log('User logged in successfully. Token:', token);
  
      // Add a review for a drink
      const drinkId = '12345'; // Specify the ID of the drink
      const rating = 4;
      const reviewText = 'Great drink!';
      await addReview(drinkId, rating, reviewText, token);
  
      // Update a review
      const reviewId = '67890'; // Specify the ID of the review
      const updatedRating = 5;
      const updatedReviewText = 'Excellent drink!';
      await updateReview(reviewId, updatedRating, updatedReviewText, token);
  
      // Delete a review
      const reviewIdToDelete = '12345'; // Specify the ID of the review to delete
      await deleteReview(reviewIdToDelete, token);
    } catch (error) {
      console.error('Example usage error:', error);
    }
  }
  
  // Run the example usage
  exampleUsage();