import React, { useState, useEffect } from 'react';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: 'Jane Doe',
      reviewText: 'The food was amazing! Highly recommended.',
      rating: 5,
    },
    // Add more default reviews here if needed
  ]);

  useEffect(() => {
    // Fetch reviews data from an API or database
    const fetchReviews = async () => {
      // Replace with your data fetching logic
      // const response = await fetch('/api/reviews');
      // const data = await response.json();
      // setReviews(data);

      // Example usage with hardcoded data
      const data = [
        {
          id: 2,
          userName: 'John Smith',
          reviewText: 'Great service and delicious food.',
          rating: 4,
        },
      ];
      setReviews((prevReviews) => [...prevReviews, ...data]);
    };
    fetchReviews();
  }, []);

  return (
    <div className="reviews-container">
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="review-header">
            <strong>{review.userName}</strong>
          </div>
          <div className="review-body">
            <p>{review.reviewText}</p>
            <div className="rating">Rating: {review.rating}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
