import React, { useState, useEffect } from 'react';
import brain from '../../assets/brain.png';
import './index.css';

function MinskyLab() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (imageLoaded) {
      document.querySelector('.fade-in').classList.add('fade-in-start');
    }
  }, [imageLoaded]);

  return (
    <div className='con'>
        <img className="homepage-img"
          src={brain}
          alt=""
          className={`fade-in ${imageLoaded ? 'fade-in-start' : ''}`}
          onLoad={() => setImageLoaded(true)}
        />
      <div className="desc">
        <div className="info fontSize">
          <p>
            At Minsky Lab, we believe that the power of machine learning (ML) 
            should be accessible to everyone. Our diverse and dedicated team is 
            committed to breaking down the barriers to entry in the world of artificial 
            intelligence. 
          </p>
          <p>
            With a unique blend of skill, passion, and innovation, we have created 
            an intuitive ML-powered platform that enables users from all backgrounds 
            to extract insights from their datasets with ease. 
          </p>
          <p>
            Join us on our mission to bring the transformative potential of ML to the 
            fingertips of the global community!
          </p>
        </div>
      </div>
    </div>
  );
}

export default MinskyLab;
