import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaSearchPlus, FaSearchMinus, FaTimes } from "react-icons/fa"; // Import icons

const Painting = () => {
  const { id } = useParams();
  const [painting, setPainting] = useState(null);
  const [paintings, setPaintings] = useState([]);
  const [subcategoryPaintings, setSubcategoryPaintings] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1); // State for zoom level
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPainting = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setPainting(response.data);
      } catch (error) {
        console.error("Error fetching painting:", error);
      }
    };

    const fetchPaintings = async () => {
      try {
        const response = await axios.get("/api/products");
        setPaintings(response.data);
      } catch (error) {
        console.error("Error fetching paintings:", error);
      }
    };

    fetchPainting();
    fetchPaintings();
  }, [id]);

  useEffect(() => {
    if (painting && paintings.length) {
      const filteredPaintings = paintings.filter(
        (p) => p.subcategory === painting.subcategory
      );
      setSubcategoryPaintings(filteredPaintings);
    }
  }, [painting, paintings]);

  const handlePrevious = () => {
    const currentIndex = subcategoryPaintings.findIndex(
      (p) => p.id === parseInt(id)
    );
    const previousIndex =
      currentIndex === 0 ? subcategoryPaintings.length - 1 : currentIndex - 1;
    const previousPainting = subcategoryPaintings[previousIndex];
    if (previousPainting) {
      navigate(`/painting/${previousPainting.id}`);
    }
  };

  const handleNext = () => {
    const currentIndex = subcategoryPaintings.findIndex(
      (p) => p.id === parseInt(id)
    );
    const nextIndex =
      currentIndex === subcategoryPaintings.length - 1 ? 0 : currentIndex + 1;
    const nextPainting = subcategoryPaintings[nextIndex];
    if (nextPainting) {
      navigate(`/painting/${nextPainting.id}`);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel - 0.1);
  };

  const handleClose = () => {
    navigate(`/works/${painting.subcategory.toLowerCase()}`);
  };

  if (!painting) return <div>Loading...</div>;

  const currentIndex =
    subcategoryPaintings.findIndex((p) => p.id === parseInt(id)) + 1;

  return (
    <div className="painting-container">
      <div className="painting-navigation">
        <span onClick={handlePrevious} className="nav-left">
          &#8592;
        </span>
        <span onClick={handleNext} className="nav-right">
          &#8594;
        </span>
      </div>
      <div class="header-controls">
        <div className="painting-index">
          {currentIndex} / {subcategoryPaintings.length}
        </div>
        <div className="zoom-controls">
          <FaSearchMinus onClick={handleZoomOut} className="zoom-icon" />
          <FaSearchPlus onClick={handleZoomIn} className="zoom-icon" />
          <FaTimes onClick={handleClose} className="zoom-icon" />
        </div>
      </div>
      <img
        src={painting.imageUrl}
        alt={painting.title}
        className="painting-image"
        style={{ transform: `scale(${zoomLevel})` }}
      />
      <div class="footer-controls">
        <div className="painting-details">
          <p>
            {painting.title} - {painting.technique} - {painting.description}
          </p>
          {/* <a href="#">More Info</a> */}
        </div>
      </div>
    </div>
  );
};

export default Painting;
