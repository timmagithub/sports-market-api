const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//player API plan
let stockSchema = mongoose.Schema({
  playerId: { type: String, required: true },
  player: { type: String, required: true },
  image: { type: String, required: true },
  position: { type: String, required: true },
  team: { type: String, required: true },
  projectedOutput: { type: Number, required: true },
  currentOutput: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  pastPrices: [Number],
});

//user API plan
let userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: Date,
  funds: Number,
  portfolio: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  tagline: { type: String },
  watchList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
});

//hash password for security
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

//validate password entry
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

let Users = mongoose.model("Users", userSchema);
let Stocks = mongoose.model("Stocks", stockSchema);

module.exports.Users = Users;
module.exports.Stocks = Stocks;
