import React from "react";
import about1 from "../public/about1.jpg";
import about2 from "../public/about2.jpg";

const About = () => {
  return (
    <div className="about">
      <p>About the Artist</p>
      <div className="content">
        <div className="images">
          <img src={about1} alt="Carl_Canga" />
          <img src={about2} alt="Carl_Canga" />
        </div>
        <div className="description">
          <p style={{ fontWeight: "bold" }}>What can I tell you?</p>
          <p>
            I was born in Missouri, and have lived in Austin, Texas since 2005.
            In the 90s I worked as a traditional special effects animator on ten
            feature films including Lion King, Hunchback of Notre Dame, Iron
            Giant then switched to computer game artist (both in Los Angeles and
            Texas). I spend my spare time oil painting in my studio or painting
            on location outdoors in all kinds of weather.
          </p>
          <p>I am a member of the Outdoor Painters Society.</p>
          <p>
            Recent awards: 2023 - Honorable Mention, Outdoor Painters Society
            Associates Show
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
