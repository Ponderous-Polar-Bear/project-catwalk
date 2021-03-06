import React, { useState, useEffect } from 'react';

function Quality(props) {
  const [rating, setRating] = useState('');
  const buttons = ['1', '2', '3', '4', '5'];
  const handleClick = (e) => {
    if (e.target.value === '1') {
      setRating('Poor');
    }
    if (e.target.value === '2') {
      setRating('Below Average');
    }
    if (e.target.value === '3') {
      setRating('What I expected');
    }
    if (e.target.value === '4') {
      setRating('Pretty Great');
    }
    if (e.target.value === '5') {
      setRating('Perfect');
    }
    props.handleQuality(Number(e.target.value));
  };

  return (
    <div>
      <div>
        <span className="bold">Quality: </span>
        <span>{rating}</span>
      </div>
      <div className="radioContainer">
        {buttons.map((button) =>
        <span key={button} className='addReview radio'>
          <label
            htmlFor={button}>
              {button}
          </label>
          <input
            required
            required
            type='radio'
            value={button}
            name='quality'
            onClick={handleClick}>
            </input>
        </span>)}
      </div>
    </div>
  );
}

export default Quality;
