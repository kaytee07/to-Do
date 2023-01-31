import "./style.css";
import DOM from "./dom";
require("bootstrap-icons/font/bootstrap-icons.css");

DOM.init();

const Amadeus = require("amadeus");

 const amadeus = new Amadeus({
   clientId: "DDUJUvAhRb34GcvuA6SuY1z5vnfigCYa",
   clientSecret: "BaPMQAXG5GTYlf3i",
 });

amadeus.shopping.flightOffersSearch
  .get({
    originLocationCode: "SYD",
    destinationLocationCode: "BKK",
    departureDate: "2022-06-01",
    adults: "2",
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (responseError) {
    console.log(responseError.code);
  });
