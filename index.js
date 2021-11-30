const express = require("express"),
  morgan = require("morgan"),
  Models = require("./models.js");
const app = express();
const mongoose = require("mongoose");
const Stocks = Models.Stocks;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { check, validationResult } = require("express-validator");

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Welcome to the Sports MarketPlace");
});

// main page returning list of stocks
app.get("/stocks", (req, res) => {
  Stocks.find()
    .then((stocks) => {
      res.status(201).json(stocks);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error" + err);
    });
});

// register a new user
app.post("/users", [
  check("name", "Name is required").not().isEmpty(),
  check(
    "username",
    "Username must be at least 5 alphanumeric characters"
  ).matches(/^[a-zA-Z0-9]{5}$/, "i"),
  check("password", "Must be"),
]);

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("It is alive on " + port + "!");
});

// app.listen(8080, () => {
//   console.log("Your app is listening on port 8080.");
// });
