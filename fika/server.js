const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const weather = require("openweather-apis");
const dotenv = require("dotenv");
const axios = require("axios");
const mongojs = require("mongojs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 8000;

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const databaseUrl = "fika_db";
const collections = ["users, notes, projects, tasks, events"];
const db = mongojs(databaseUrl, collections);

db.on("error", function (error) {
  console.log("database error:", error);
});

dotenv.config();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

function verifyWebToken(req, res, next) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decod) => {
      if (err) {
        res.status(403).json({
          message: "Wrong Turn"
        });
      } else {
        res.status(403).json({
          message: "No Token"
        });
      }
    });
  }
}

app.get("/", function (req, res) {
  res.send(
    "routes available: login : post -> /login, signup : post -> /signup, get all the pets: get -> /pets, get one pet: get -> /pets/:id, update a pet: post -> /pets/update/:id, deleting a pet: post -> /pets/:id, creating a pet: post -> /pets"
  );
});

var userId, username;
app.post("/login", function (req, res) {
  // console.log(username + " " + password)
  db.users.findOne(
    {
      username: req.body.username
    },
    function (error, result) {
      if (!result) return res.status(404).json({ error: "user not found" });

      if (!bcrypt.compareSync(req.body.password, result.password))
        return res.status(401).json({ error: "incorrect password " });

      const payload = {
        _id: result._id,
        username: result.username
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "4h"
      });
      console.log(result);
      userId = result._id;
      username = result.username;

      return res.json({
        message: "successfuly authenticated",
        token: token,
        username: result.username,
        userId: result._id,
        // score: result.score,
        // currentGame: result.currentGame,
        // input: result.input,
        // vote: result.vote
      });
    }
  );
});

app.post("/signup", function (req, res) {
  db.users.findOne(
    {
      username: req.body.username
    },
    function (error, result) {
      if (result) return res.status(404).json({ error: "user already exists" });

      if (!req.body.password)
        return res.status(401).json({ error: "you need a password" });

      if (req.body.password.length <= 5)
        return res
          .status(401)
          .json({ error: "password length must be greater than 5" });

      console.log("got to line 92");

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          db.users.insert(
            {
              username: req.body.username,
              password: hash
            },
            function (error, user) {
              console.log("got to line 101");

              // Log any errors
              if (error) {
                res.send(error);
              } else {
                res.json({
                  message: "successfully signed up! log in to start playing!"
                });
              }
            }
          );
        });
      });
    }
  );
});

//find user's notes
app.get("/notes/user/:id", function (req, res) {

  db.notes.find(
    {
      "userId": `${req.params.id}`
    },
    function (error, result) {
      if (error) {
        res.send(error);
      } else {
        res.json(result);
        console.log(result)
      }
    }
  );
});

//delete note
app.post('/note-remove/:id', function (req, res) {
  //curl -X POST http://localhost:3001/pets/5bb2de27c385cb3290b0e598

  db.notes.remove({
    "_id": mongojs.ObjectID(req.params.id)
  }, function (error, removed) {
    if (error) {
      res.send(error);
    } else {
      res.json(req.params.id);
      console.log("deleted");
    }
  });
});

app.post("/new-note", function (req, res) {
  console.log(req.body)
  db.notes.insert(req.body, function (error, newNote) {
    // Log any errors
    if (error) {
      res.send(error);
    } else {
      res.json(newNote);
      console.log("saved");
    }
  });

  // })
})

app.post("/signup", function (req, res) {
  db.users.findOne(
    {
      username: req.body.username
    },
    function (error, result) {
      if (result) return res.status(404).json({ error: "user already exists" });

      if (!req.body.password)
        return res.status(401).json({ error: "you need a password" });

      if (req.body.password.length <= 5)
        return res
          .status(401)
          .json({ error: "password length must be greater than 5" });

      console.log("got to line 92");

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          db.users.insert(
            {
              username: req.body.username,
              password: hash
            },
            function (error, user) {
              console.log("got to line 101");

              // Log any errors
              if (error) {
                res.send(error);
              } else {
                res.json({
                  message: "successfully signed up! log in to start playing!"
                });
              }
            }
          );
        });
      });
    }
  );
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

app.get("/", function (req, res) {
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

app.get("/currentWeather", function (req, res) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?id=5391959&lang=en&units=imperial&appid=${client_id}`
    )
    .then(response => {
      // console.log(response.data);
      let w = new CurrentWeather(
        response.data.main.temp,
        response.data.weather[0].main
      );
      console.log(w);
      res.json(w);
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
