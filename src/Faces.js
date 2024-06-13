import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Faces = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/products", {
          params: { subcategory: "Faces" },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handlePaintingClick = (id) => {
    navigate(`/painting/${id}`);
  };

  return (
    <div className="container-category">
      <p>Faces</p>
      <div className="works">
        {products.map((product) => (
          <div
            className="work-item"
            key={product.id}
            onClick={() => handlePaintingClick(product.id)}
          >
            <img src={product.imageUrl} alt={product.title} />
            <div className="work-overlay">
              <div className="work-details">
                <p>{product.title}</p>
                <p>{product.technique}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faces;
