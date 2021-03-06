import React, { useState } from 'react';

function ReviewThumbnails (props) {
  const [showModal, setModal] = useState(false);
  const [img, setImg] = useState('');
  const handleClick = (e) => {
    const show = !showModal;
    setModal(show);
    setImg(e.target.src);
  };

  return (
    <div>
      {showModal
        ? <div>
          <img className="reviewsPhotos modal" src={img} onClick={handleClick}/>
        </div>
        : null}
      {props.photos.map((photo, index) => <img className="reviewsPhotos" src={photo.url} key={index} onClick={handleClick} alt="User Image"/>)}
    </div>
  );
}


export default ReviewThumbnails;