import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FaBeer } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import Carousel from "nuka-carousel";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import "swiper/css";
const Details = () => {
  //all the varables are here
  const queryParams = new URLSearchParams(window.location.search);
  const productId = queryParams.get("id");
  const checkin = queryParams.get("checkin");
  const checkout = queryParams.get("checkout");
  const price = queryParams.get("price");
  const lati = parseFloat(queryParams.get("lat"));
  const longi = parseFloat(queryParams.get("lon"));
  console.log(longi);
  console.log(typeof longi);
  const [obj, setObj] = useState(null);
  const [imgarray, setImgarray] = useState([]);
  const [features, setFeatures] = useState([]);
  console.log(productId);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const center = useMemo(() => ({ lat: lati, lng: longi }), []);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
    },
  };

  const hotelDetails = async () => {
    const response = await fetch(
      `https://priceline-com-provider.p.rapidapi.com/v1/hotels/details?hotel_id=${productId}`,
      options
    );
    const data = await response.json();
    return data;
  };

  //for printing the rating
  const starRating = (n) => {
    let items = [];
    for (let i = 0; i < n; i++) {
      items.push(<span className="fa fa-star checked"></span>);
    }
    return <div className="starRating">{items}</div>;
  };
  useEffect(() => {
    (async function () {
      const data = await hotelDetails();
      console.log(data);
      if (data) {
        setObj(data);
        setFeatures(data.hotelFeatures.features);
        setImgarray(
          data.images.filter((h) => {
            return data.images.indexOf(h) < 10;
          })
        );
        console.log(imgarray.length);
        console.log(obj.location.longitude);
        console.log(obj.location.latitude);
      }
    })();
  }, []);

  return (
    <div className="container3">
      <nav className="navbar">
        <h2 className="title2">Booking.com</h2>
        <div className="navFlex">
          <Link to="/">
            <h3>Home</h3>
          </Link>
          <Link to="/forms">
            {" "}
            <h3>Search</h3>
          </Link>
        </div>
      </nav>
      <div className="images">
        <Carousel dragging={true} autoplay={true}>
          {obj
            ? imgarray.map((h, i) => (
                <img
                  src={h.imageUrl}
                  key={i}
                  className="hotel_img_container3"
                ></img>
              ))
            : null}
        </Carousel>
      </div>
      <div className="container3_div_first">
        <div className="heading_price">
          <h1>{obj && obj.name}</h1>
          <div className="price">
            <h2>{`$ ${price}`}</h2>
            <p>per night</p>
          </div>
        </div>
        <div>{obj && starRating(obj.starRating)}</div>
        <p>{obj && obj.description}</p>
      </div>
      <div className="container3_div_second">
        <h1>Facilities</h1>
        <div className="facilities_list">
          {features &&
            features.map((h, i) => {
              return (
                <div key={i} className="facility">
                  <FontAwesomeIcon icon={faCheck} />

                  <p>{h}</p>
                </div>
              );
            })}
        </div>
      </div>
      <div className="container3_div_third">
        <div className="container3_div_third_content">
          <h2>
            <FaMapMarkerAlt className="locationIcon" />
            Location
          </h2>
          <p>
            You can now locate your favourite hotels and stays on the
            map.Discover the tourist attractions near your stay .{" "}
          </p>
        </div>
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={16}
          >
            <Marker position={{ lat: lati, lng: longi }}></Marker>
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default Details;
