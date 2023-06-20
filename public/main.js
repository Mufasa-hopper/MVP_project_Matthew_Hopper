// Add a review for a specific drink
async function addReview(drinkId, rating, reviewText) {
  try {
    const response = await fetch('/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ drinkId, rating, reviewText }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const reviewData = await response.json();
    const reviewId = reviewData.reviewId;
    const reviewListItem = document.createElement('li');
    reviewListItem.textContent = `Review ID: ${reviewId}, Rating: ${rating}, Text: ${reviewText}`;

    const reviewList = document.getElementById('review-list');
    reviewList.appendChild(reviewListItem);

    console.log('Review added successfully. Review ID:', reviewId);
  } catch (error) {
    console.error('Error adding review:', error);
    // Handle error
  }
}
  
  // Update a review
  async function updateReview(reviewId, rating, reviewText) {
    try {
      const response = await fetch(`/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
  async function deleteReview(reviewId) {
    try {
      const response = await fetch(`/reviews/${reviewId}`, {
        method: 'DELETE',
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
  
  // Get references to the review form
  const reviewForm = document.getElementById('review-form');
  
  // Add event listener for review form submission
  reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    // Get user input values from the review form
    const drinkIdInput = document.getElementById('drink-id-input');
    const ratingInput = document.getElementById('rating-input');
    const reviewTextInput = document.getElementById('review-text-input');
  
    const drinkId = drinkIdInput.value;
    const rating = ratingInput.value;
    const reviewText = reviewTextInput.value;
  
    try {
      // Add a review for a drink
      await addReview(drinkId, rating, reviewText);
      console.log('Review added successfully.');
  
      // Clear the review form
      drinkIdInput.value = '';
      ratingInput.value = '';
      reviewTextInput.value = '';
  
      // Display success message to the user
      const successMessage = document.getElementById('success-message');
      successMessage.textContent = 'Review submitted successfully!';
      successMessage.style.display = 'block';
    } catch (error) {
      console.error('Error adding review:', error);
      // Display error message to the user
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'Review submission failed. Please try again.';
      errorMessage.style.display = 'block';
    }
  });
  
  // Example usage
  async function exampleUsage() {
    try {
      // Add a review for a drink
      const drinkId = '12345'; // Specify the ID of the drink
      const rating = 4;
      const reviewText = 'Great drink';
      await addReview(drinkId, rating, reviewText);

      // Update a review
      const reviewId = '67890'; // Specify the ID of the review
      const updatedRating = 5;
      const updatedReviewText = 'Excellent drink!';
      await updateReview(reviewId, updatedRating, updatedReviewText);
  
      // Delete a review
      const reviewIdToDelete = '12345'; // Specify the ID of the review to delete
      await deleteReview(reviewIdToDelete);
    } catch (error) {
      console.error('Example usage error:', error);
    }
  }
  
  // Run the example usage
  exampleUsage();