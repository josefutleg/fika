const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const weather = require("openweather-apis");
const dotenv = require("dotenv");
const axios = require("axios");
const port = process.env.PORT || 8000;

const app = express();
app.use(bodyParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});
// const client_id = process.env.OPENWEATHER_ID;
const client_id = "0ae08f7627f5996929203dcc2863a178";

// https://api.openweathermap.org/data/2.5/forecast?id=5391959&lang=en&units=imperial&appid=0ae08f7627f5996929203dcc2863a178
function Weather(id, temp, timestamp, description) {
  (this.id = id),
    (this.temp = temp),
    (this.timestamp = timestamp),
    (this.description = description);
}

function CurrentWeather(temp, description) {
  (this.temp = temp), (this.description = description);
}

app.get("/", function(req, res) {
  let weatherArr = [];

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?id=5391959&lang=en&units=imperial&appid=${client_id}`
    )
    .then(response => {
      for (i in response.data.list) {
        let id = parseInt(i) + 1;
        let temp = response.data.list[i].main.temp;
        let timestamp = response.data.list[i].dt_txt;
        let description = response.data.list[i].weather[0].description;
        let c = new Weather(id, temp, timestamp, description);
        weatherArr.push(c);
      }
      console.log("sent");
      res.send(weatherArr);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/currentWeather", function(req, res) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?id=5391959&lang=en&units=imperial&appid=${client_id}`
    )
    .then(response => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

//openWeather Setup
weather.setAPPID(client_id);
weather.setLang("en");
//sf's coordinates
// weather.setCoordinate(37.773972, -122.431297);
//sf's city ID
weather.setCityId(5391959);
weather.setUnits("imperial");

app.listen(port);
console.log("Listening on " + port);
