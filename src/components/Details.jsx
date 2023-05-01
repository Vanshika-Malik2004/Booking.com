import React from "react";
import { useEffect, useState } from "react";
const Details = () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
    },
  };
  //all the varables are here
  const queryParams = new URLSearchParams(window.location.search);
  const productId = queryParams.get("id");
  const checkin = queryParams.get("checkin");
  const checkout = queryParams.get("checkout");
  const [obj, setObj] = useState(null);
  console.log(productId);

  const hotelDetails = async () => {
    const response = await fetch(
      `https://priceline-com-provider.p.rapidapi.com/v1/hotels/details?hotel_id=${productId}`,
      options
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    (async function () {
      const data = await hotelDetails();
      console.log(data);
      if (data) {
        setObj(data);
      }
    })();
  }, []);

  return <div>{obj && obj.name}</div>;
};

export default Details;
