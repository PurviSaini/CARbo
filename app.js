const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "carfuelconsump",
  user: "root",
  password: "",
});
var bodyParser = require("body-parser");
const port = 80;
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
// this request is for home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/cars", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/faq", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
// here the request for each card that is to be displayed is kept
app.get("/showCarDetail", (req, res) => {
  res.sendFile(path.join(__dirname, "/showCar.html"));
});
var make;
app.post("/fetch-model", function (req, res) {
  connection.connect();
  make = Object.keys(req.body)[0];
  connection.query(
    `select Model from fuelconsumptionratings where Make='${Object.keys(req.body)[0]
    }' `,
    (err, rows, fields) => {
      res.json({
        model: rows,
      });
    }
  );
});
// post , getInfo
app.post("/getInfo", (req, res) => {
  connection.connect();
  connection.query(
    `select * from fuelconsumptionratings where Make='${make}' and Model='${Object.keys(req.body)[0]
    }'`,
    (err, rows, fields) => {
      res.json({
        model: rows,
      });
    }
  );
});

app.listen(port, () => {
  console.log("listening on port 80");
});
