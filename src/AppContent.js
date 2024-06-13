import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import Homepage from "./Homepage";
import About from "./About";
import Airplanes from "./Airplanes";
import Outdoors from "./Outdoors";
import Faces from "./Faces";
import Painting from "./Painting";
import Contact from "./Contact";

const AppContent = () => {
  const location = useLocation();
  const showHeader = !location.pathname.startsWith("/painting/");

  return (
    <div className="container">
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/works/airplanes" element={<Airplanes />} />
        <Route path="/works/outdoors" element={<Outdoors />} />
        <Route path="/works/faces" element={<Faces />} />
        <Route path="/painting/:id" element={<Painting />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default AppContent;
