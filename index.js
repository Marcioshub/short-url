const express = require("express");
const redis = require("redis");
const path = require("path");
const client = redis.createClient();
require("dotenv").config();
require("colors");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "/client/build")));

client.on("connect", function () {
  console.log("Connected".green);
});

const values = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

function getRandomUrl() {
  return `${values[Math.floor(Math.random() * 36)]}${
    values[Math.floor(Math.random() * 36)]
  }${values[Math.floor(Math.random() * 36)]}${
    values[Math.floor(Math.random() * 36)]
  }`;
}

// add url to redis
app.post("/api/add", (req, res, next) => {
  try {
    const { url } = req.body;
    let id = getRandomUrl();

    // key, expiry (24hrs), data
    client.setex(id, 86400, url);

    res.json({
      success: true,
      data: `${process.env.url}/${id}`,
    });
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// get single url from redis
app.get("/api/url/:id", (req, res, next) => {
  client.get(req.params.id, function (err, url) {
    if (!url) {
      // console.log("Url does not exist OR has expired");
      res.json({
        success: false,
        message: "Url does not exist OR has expired",
      });
    } else {
      // console.log(url);
      res.json({
        success: true,
        data: url,
      });
    }
  });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(process.env.PORT, () =>
  console.log("Server listening on port", process.env.PORT)
);
