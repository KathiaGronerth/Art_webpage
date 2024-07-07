import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Homepage = () => {
  return (
    <div className="main-content">
      <div className="Homepage_header">
        <p>Carl Canga Art</p>
      </div>
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="carousel-arrow carousel-arrow-prev"
            ></button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="carousel-arrow carousel-arrow-next"
            ></button>
          )
        }
      >
        <div style={{ position: "relative" }}>
          <img
            src="/arts/vehicles/vehicles1.jpg"
            alt="Slide 1"
            width="1920"
            height="1080"
          />
          <div className="hero-text">
            <h1>The Submarine</h1>
            <p>
              Carl draws inspiration from industrial and historical artifacts,
              capturing the essence of maritime history through the depiction of
              a submarine sculpture.
            </p>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <img
            src="/arts/vehicles/vehicles2.jpg"
            alt="Slide 2"
            width="1920"
            height="1080"
          />
          <div className="hero-text">
            <h1>The Military Airplane</h1>
            <p>
              This artwork reflects Carl's fascination with aviation history and
              vintage aircraft.
            </p>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <img
            src="/arts/vehicles/vehicles3.jpg"
            alt="Slide 3"
            width="1920"
            height="1080"
          />
          <div className="hero-text">
            <h1>Early 20th Century Biplane</h1>
            <p>
              Carl pays homage to the early pioneers of aviation with this
              painting of a brightly colored biplane.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Homepage;
