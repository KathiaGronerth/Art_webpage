import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./Header";
import Homepage from "./Homepage";
import About from "./About";
import Vehicles from "./Vehicles";
import Outdoors from "./Outdoors";
import Faces from "./Faces";
import Painting from "./Painting";
import Contact from "./Contact";
import Footer from "./Footer";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";

const AppContent = () => {
  const location = useLocation();
  const showHeader =
    !location.pathname.startsWith("/painting/") &&
    !location.pathname.startsWith("/admin") &&
    !location.pathname.startsWith("/login");
  const showFooter =
    !location.pathname.startsWith("/admin") &&
    !location.pathname.startsWith("/login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <div className="container">
        {showHeader && <Header />}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/works/vehicles" element={<Vehicles />} />
          <Route path="/works/outdoors" element={<Outdoors />} />
          <Route path="/works/faces" element={<Faces />} />
          <Route path="/painting/:id" element={<Painting />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/admin"
            element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </div>
      {showFooter && <Footer />}
    </>
  );
};

export default AppContent;
