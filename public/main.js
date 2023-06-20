async function addReview(drinkId, rating, reviewText) {
  try {
    const response = await fetch(`/drinks/${drinkId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, reviewText }),
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
    reviewForm.reset(); // Reset the form inputs
  } catch (err) {
    console.error('Error adding review:', err);
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
  
  
  const reviewForm = document.getElementById('review-form');
reviewForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from submitting and page refreshing

  const drinkIdInput = document.getElementById('drink-id-input');
  const ratingInput = document.getElementById('rating-input');
  const reviewTextInput = document.getElementById('review-text-input');

  const drinkId = drinkIdInput.value;
  const rating = ratingInput.value;
  const reviewText = reviewTextInput.value;

  addReview(drinkId, rating, reviewText); // Call the addReview function with the input values
  
});

// Add event listeners for the "Update Review" buttons
const updateButtons = document.getElementsByClassName('update-review-button');
for (const button of updateButtons) {
  button.addEventListener('click', (event) => {
    const reviewId = event.target.dataset.reviewId;

    // Get the updated rating and review text from the user
    const updatedRating = prompt('Enter the updated rating:');
    const updatedReviewText = prompt('Enter the updated review text:');

    updateReview(reviewId, updatedRating, updatedReviewText); // Call the updateReview function with the updated values
  });
}

// Add event listeners for the "Delete Review" buttons
const deleteButtons = document.getElementsByClassName('delete-review-button');
for (const button of deleteButtons) {
  button.addEventListener('click', (event) => {
    const reviewId = event.target.dataset.reviewId;

    deleteReview(reviewId); // Call the deleteReview function
  });
}
  
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