import React, { useState } from 'react';
import { saveRating } from '../services/api'
import { Rating } from '../services/types'

interface StarRatingProps {
  initialRating?: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0); // New state for hover

  const handleClick = async (newRating: number) => {
    console.log(newRating)
    setRating(newRating);
    onRatingChange(newRating);
    await saveRating({ count: rating })
  };

  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= rating; // Check against actual rating
    return (
      <span
        key={starValue}
        className={`star ${isFilled ? 'filled' : ''}`}
        onClick={() => handleClick(starValue)}
        onMouseEnter={() => setHoverRating(starValue)} // Use hoverRating
        onMouseLeave={() => setHoverRating(0)} // Reset hoverRating
      >
        ★
      </span>
    );
  });

  return (
    <div className="star-rating">
      {stars}
    </div>
  );
};

export default StarRating;
