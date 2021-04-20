import React, { useState, useEffect } from 'react';

function Fit(props) {
  const [rating, setRating] = useState('');
  const buttons = ['1', '2', '3', '4', '5'];
  const handleClick = (e) => {
    console.log(e.target.value);
    if (e.target.value === '1') {
      setRating('Runs tight');
    }
    if (e.target.value === '2') {
      setRating('Runs slightly tight');
    }
    if (e.target.value === '3') {
      setRating('Perfect');
    }
    if (e.target.value === '4') {
      setRating('Runs slightly long');
    }
    if (e.target.value === '5') {
      setRating('Runs long');
    }
    props.handleComfort(Number(e.target.value));
  };

  return (
    <div>
      <div>
        <span className="bold">Fit: </span>
        <span>{rating}</span>
      </div>
      {buttons.map((button) =>
      <span key={button}>
        <label
          htmlFor={button}>
            {button}
        </label>
        <input
          type='radio'
          value={button}
          name='fit'
          onClick={handleClick}>
          </input>
      </span>)}
    </div>
  );
}

export default Fit;