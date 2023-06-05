import React from "react";
import backpacking from "../assets/backpacking.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Forms = () => {
  //here are all the variables, useStates
  const [city, setCity] = useState("mumbai");
  const [checkout, setCheckout] = useState("2023-5-18");
  const [checkin, setCheckin] = useState("2023-5-10");
  const [maxprice, setMaxprice] = useState("");
  const [minprice, setMinprice] = useState("");
  const [arr, setArr] = useState([]);
  const [count, setCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [checkDate, setCheckDate] = useState(0);
  const [n, setn] = useState(0);
  //here we hav all the methods options too be attached to fetch requests
  //option for cityID fetch
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
    },
  };
  //option for hotel Details
  const options2 = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY_HOTEL,
      "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
    },
  };
  //check function to check if the entered vales are correct
  const check = (checkin, checkout) => {
    let today = new Date();
    let checkin_date = new Date(checkin);
    let checkout_date = new Date(checkout);
    if (checkin_date >= today && checkout_date >= checkin_date) {
      return true;
    }
    return false;
  };
  //for printing the rating
  const starRating = (n) => {
    let items = [];
    for (let i = 0; i < n; i++) {
      items.push(<span className="fa fa-star checked"></span>);
    }
    return <div className="starRating">{items}</div>;
  };
  //here we have the functions that returns the city id
  const func_cityId = async (cityName) => {
    const response = await fetch(
      `https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations?name=${cityName}&search_type=ALL`,
      options
    );
    const data = await response.json();
    console.log(data);
    return data[0].cityID;
  };
  //here is the function that returns the hotels list
  const hotelDetails = async (id, checkin, checkout) => {
    const response = await fetch(
      `https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?date_checkout=${checkout}&sort_order=HDR&location_id=${id}&date_checkin=${checkin}&amenities_ids=FINTRNT%2CFBRKFST&rooms_number=1&star_rating_ids=3.0%2C3.5%2C4.0%2C4.5%2C5.0`,
      options2
    );
    const data = await response.json();
    return data;
  };
  const handleSubmit = async (e) => {
    setArr([]);
    setIsFetching(true);
    e.preventDefault();
    if (check(checkin, checkout)) {
      setCheckDate(0);
      setn(n + 1);
      setCount(count + 1);
    } else {
      setArr([]);
      setCheckDate(1);
    }
  };
  //useEffect
  useEffect(() => {
    (async function () {
      try {
        const cityID = await func_cityId(city);
        console.log(cityID);
        const hotel_list = await hotelDetails(cityID, checkin, checkout);
        const hotel_arr = await hotel_list.hotels;
        console.log(hotel_list);
        const final_list = hotel_arr.filter(
          (h) =>
            Number(h.ratesSummary.minPrice) >= Number(minprice) &&
            Number(h.ratesSummary.minPrice) <= Number(maxprice)
        );
        console.log(final_list);
        if (final_list) {
          setIsFetching(false);
          setArr(final_list);

          console.log(arr);
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [count]);
  return (
    <div className="form_container">
      <div className="container2">
        <div className="forms_div">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>
              City
              <br />
              <input
                className="city"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              ></input>
            </label>
            <label>
              Max-price
              <br />
              <input
                className="max_price"
                onChange={(e) => {
                  setMaxprice(e.target.value);
                }}
              ></input>
            </label>
            <label>
              Min-price
              <br />
              <input
                className="min-price"
                onChange={(e) => {
                  setMinprice(e.target.value);
                }}
              ></input>
            </label>
            <label>
              checkIn
              <br />
              <input
                type="date"
                className="checkin"
                onChange={(e) => {
                  setCheckin(e.target.value);
                }}
              ></input>
            </label>
            <label>
              checkout
              <br />
              <input
                type="date"
                className="checkout"
                onChange={(e) => {
                  setCheckout(e.target.value);
                }}
              ></input>
            </label>
            <br />
            <button className="submit_btn">Submit</button>
          </form>
        </div>
        <img src={backpacking} className="manRun"></img>
      </div>
      <div className="hotel_list">
        {/* Fixing this, problem: no return statement */}
        {isFetching ? "Loading..." : null}
        {arr.length > 0 && n
          ? arr.map((h, i) => (
              <div className="hotel" key={i}>
                <img src={h.thumbnailUrl} className="hotel_img" />
                <div className="hotel_content">
                  {" "}
                  <h3>{h.name}</h3>
                  <p>{h.location.address.addressLine1}</p>
                  <div>{starRating(h.starRating)}</div>
                  <h3 classList="price">{`$ ${h.ratesSummary.minPrice}`}</h3>
                  <Link
                    className="book_btn"
                    key={i}
                    to={`/Details?id=${arr[i].hotelId}&checkin=${checkin}&checkout=${checkout}&price=${h.ratesSummary.minPrice}&lat=${h.location.latitude}&lon=${h.location.longitude}`}
                  >
                    book now
                  </Link>
                </div>
              </div>
            ))
          : "NO RESULTS FOUND YET"}
        {checkDate ? (
          <div className="error">
            Please enter the checkin checkout dates correctly
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Forms;
