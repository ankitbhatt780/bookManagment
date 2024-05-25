const mongoose = require("mongoose");

function dbConnect() {
  mongoose.connect("mongodb://127.0.0.1:27017/BookManagement").then(() => {
    console.log("data base is connnected");
  });
}
module.exports = dbConnect;
