import React from "react";
import travel from "../assets/travel.svg";
const LandingPage = () => {
  //ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  //"Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
  //"Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
  return (
    <div className="landing_page">
      <p className="title">Booking.com</p>
      <div className="container1">
        <h1>
          Experience the Art of <span>Hospitality</span>
        </h1>
        <p>
          Looking for the beast deals on hotels around the globe?Look no further
          than our hotel booking website.With our extensive network of hotels,
          you can find unbeatable prices on accomodations in popular
          destionations
        </p>
        <button className="start_btn">Let's Get Started</button>
      </div>
      <img src={travel} className="travel_img" />
    </div>
  );
};

export default LandingPage;
