const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Iteration #1: The Celebrity Model
const celebritySchema = new Schema(
  {
    name: {
      type: String,
      unique: true},
      // unique: true -> Ideally, should be unique, but its up to you
    occupation: String,
    catchPhrase: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports = Celebrity;
