import React from 'react';

const Carousal = ({ sliderImg }) => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide  md:px-14 mt-3
    " data-ride="carousel">
      <ol className="carousel-indicators">
        {sliderImg.map((_, index) => (
          <li
            key={index}
            data-target="#carouselExampleIndicators"
            data-slide-to={index}
            className={index === 0 ? 'active' : ''}
          />
        ))}
      </ol>
      <div className="carousel-inner">
        {sliderImg.map((item, index) => (
          <div
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            key={index}
          >
            <img className="d-block img-fluid w-100 object-contain" src={item} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousal;
