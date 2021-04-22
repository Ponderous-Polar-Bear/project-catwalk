import React, { useState, useEffect } from 'react';
import OverallRating from './OverallRating.jsx';
import Recommend from './Recommend.jsx';
import Comfort from './Comfort.jsx';
import Fit from './Fit.jsx';
import Length from './Length.jsx';
import Quality from './Quality.jsx';
import postReview from './helpers/postReview.js';

function AddReview(props) {
  const [isRecommended, setIsRecommended] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [fit, setFit] = useState(0);
  const [length, setLength] = useState(0);
  const [quality, setQuality] = useState(0);
  const [charMin, setCharMin] = useState(50);
  const [review, setReview] = useState('');
  const [summary, setSummary] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState([]);
  const [filesSRC, setFilesSRC] = useState([]);

  const recommended = (boolean) => {
    setIsRecommended(boolean);
  };

  const handleStarRating = (number) => {
    const rating = number;
    setStarRating(rating);
  };

  const handleComfort = (number) => {
    setComfort(number);
  };
  const handleLength = (number) => {
    setLength(number);
  };
  const handleFit = (number) => {
    setFit(number);
  };
  const handleQuality = (number) => {
    setQuality(number);
  };
  const handleSummary = (e) => {
    const text = e.target.value;
    setSummary(text);
  };
  const handleReviewChange = (e) => {
    const text = e.target.value;
    setReview(text);
    let min = 50 - text.length;
    if (min < 0) {
      min = 0;
    }
    setCharMin(min);
  };
  const handleName = (e) => {
    const text = e.target.value;
    setName(text);
  };
  const handleEmail = (e) => {
    const text = e.target.value;
    setEmail(text);
  };

  const handleFiles = (e) => {
    const imgCont = document.getElementById('reviewIMG');
    const img = document.createElement('img');
    for (let i = 0; i < e.target.files.length; i += 1) {
      img.src = URL.createObjectURL(e.target.files[i]);
      img.className = 'reviewIMG';
      imgCont.appendChild(img);
      if (files.length < 5) {
        setFiles(files.concat(e.target.files[i]));
      }
      if (filesSRC.length < 5) {
        setFilesSRC(filesSRC.concat(img.src));
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // const data = new FormData();
    // files.forEach(file => {
    //   data.append('file', file);
    // });
    const photos = files.map(file => {
      return `urlplaceholder/${file.name}`;
    });
    const info = {
      product_id: props.product.id,
      rating: Number(starRating),
      summary: summary,
      body: review,
      recommend: isRecommended,
      name: name,
      email: email,
      characteristics: {
        Comfort: Number(comfort),
        Quality: Number(quality),
        Length: Number(length),
        Fit: Number(fit),
      },
      photos: photos,
    };
    postReview(info);
    // const data = new FormData()
    // for (var i = 0; i < files.length; i++) {
    //   data.append('file', files[i]);

  // axios.post('/reviews', data, auth)
    // }
  };

  return (
    <div className='addReview overlay'>
      <h1>Write Your Review</h1>
      <h3>About the {props.product.name}
      </h3>
      <div id='writeReviewContainer'>
        <div className='writeReview'>
          <form
            onSubmit={onSubmit}
            id='addReview'>
            <OverallRating handleStarRating={handleStarRating} />
            <div className='summaryContainer'>
              <label className='bold'>
                Review Summary: <br></br>
                <textarea
                  type='text'
                  placeholder='Best purchase ever!'
                  maxLength='60'
                  onChange={handleSummary}>
                </textarea>
              </label><br></br>
              <label className='bold'>
                Review: <br></br>
                <textarea
                  type='textArea'
                  placeholder='Why did you like the product or not?'
                  maxLength='1000'
                  minLength='50'
                  onChange={handleReviewChange} >
                </textarea>
              </label><br></br>
              <span className='reviewMinCharacters'>
                {charMin > 50
                  ? 'Minimum Reached'
                  : `Minimum required characters left: ${charMin}`}
              </span><br></br>
              <label className='bold'>
                NickName: <br></br>
                <input
                  type='text'
                  placeholder='jackson11!'
                  maxLength='60'
                  onChange={handleName}></input>
              </label><br></br>
                <span
                  className='reviewMinCharacters'>
                    For privacy reasons, do not use your full name or email address
                  </span><br></br>
              <label className='bold'>
                Email: <br></br>
                <input
                  type='text'
                  placeholder='jackson11@email.com'
                  maxLength='60'
                  onChange={handleEmail}></input>
              </label><br></br>
                <span
                  className='reviewMinCharacters'>
                    For authentication reasons, you will not be emailed
                  </span><br></br>
              <span className='bold'>Do you recommend this product?</span><br></br>
              <Recommend
              recommended={recommended}
              className='pointer' />
              <Comfort
              handleComfort={handleComfort}
              className='pointer' />
              <Fit
              handleFit={handleFit}
              className='pointer' />
              <Length
              handleLength={handleLength}
              className='pointer' />
              <Quality
              handleQuality={handleQuality}
              className='pointer' />
              <input
              type='file'
              name='files'
              accept='image/*'
              className='form-control'
              multiple
              onChange={handleFiles}></input>
              <div id='reviewIMG'>

              </div>
            </div>
            <input type='submit'></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddReview;
