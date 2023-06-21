// Add a review to the webpage
function addReviewToPage(reviewId, rating, reviewText) {
  const reviewList = document.getElementById('reviews');
  const reviewHTML = `<li>Review ID: ${reviewId}, Rating: ${rating}, Text: ${reviewText}</li>`;
  reviewList.innerHTML += reviewHTML;
}

// Handle the form submission for adding a review
async function handleReviewFormSubmission(event) {
  event.preventDefault(); // Prevent the form from submitting and page refreshing

  const drinkIdInput = document.getElementById('drink-id-input');
  const ratingInput = document.getElementById('rating-input');
  const reviewTextInput = document.getElementById('review-text-input');

  const drinkId = drinkIdInput.value;
  const rating = ratingInput.value;
  const reviewText = reviewTextInput.value;

  try {
    // Add the review to the database
    await addReview(drinkId, rating, reviewText);
    console.log('Review added successfully.');

    // Add the review to the webpage
    addReviewToPage(drinkId, rating, reviewText);

    // Reset the form inputs
    reviewForm.reset();
  } catch (error) {
    console.error('Error adding review:', error);
  }
}

// Update a review
async function handleUpdateReview(event) {
  const reviewId = event.target.dataset.reviewId;

  // Get the updated rating and review text from the user
  const updatedRating = prompt('Enter the updated rating:');
  const updatedReviewText = prompt('Enter the updated review text:');

  try {
    // Update the review in the database
    await updateReview(reviewId, updatedRating, updatedReviewText);
    console.log('Review updated successfully.');

    // Update the review on the webpage
    const reviewElement = document.querySelector(`li[data-review-id="${reviewId}"]`);
    if (reviewElement) {
      reviewElement.innerHTML = `Review ID: ${reviewId}, Rating: ${updatedRating}, Text: ${updatedReviewText}`;
    }
  } catch (error) {
    console.error('Error updating review:', error);
  }
}

// Delete a review
async function handleDeleteReview(event) {
  const reviewId = event.target.dataset.reviewId;

  try {
    // Delete the review from the database
    await deleteReview(reviewId);
    console.log('Review deleted successfully.');

    // Remove the review from the webpage
    const reviewElement = document.querySelector(`li[data-review-id="${reviewId}"]`);
    if (reviewElement) {
      reviewElement.remove();
    }
  } catch (error) {
    console.error('Error deleting review:', error);
  }
}

// Add event listener for the review form submission
reviewForm.addEventListener('submit', handleReviewFormSubmission);

// Add event listeners for the "Update Review" buttons
const updateButtons = document.getElementsByClassName('update-review-button');
for (const button of updateButtons) {
  button.addEventListener('click', handleUpdateReview);
}

// Add event listeners for the "Delete Review" buttons
const deleteButtons = document.getElementsByClassName('delete-review-button');
for (const button of deleteButtons) {
  button.addEventListener('click', handleDeleteReview);
}

// const registrationForm = document.getElementById('registration-form');

// registrationForm.addEventListener('submit', async (event) => {
//   event.preventDefault(); // Prevent form submission

//   // Registration form handling code...

//   registrationForm.reset();
// });