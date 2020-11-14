import React from 'react'

const Rating = ({value, numReviews}) => {
  const totalStars = 5;
  const ratingStars = [];
  if (Number.isInteger(value)) { // true if 'value' is a whole number, false if 'value' is decimal
    // add whole stars 
    for (let i = 0; i < value; i++)
    ratingStars.push('fas fa-star');
  } else {
    // add whole stars 
    for (let i = 0; i < Math.floor(value); i++) // round down to the nearest whole number
    ratingStars.push('fas fa-star');

    // push half star
    ratingStars.push('fas fa-star-half-alt');
  }

  // the rest are empty stars
  while(ratingStars.length < totalStars)
  ratingStars.push('far fa-star');
  
  return (
    <span className='rating'>
      {ratingStars.length > 0 && ratingStars.map(star => (
        <i className={`${star} text-warning`}></i>
      ))}
      &nbsp;({numReviews})
    </span>
  )
}

export default Rating
