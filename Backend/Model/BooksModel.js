const { model, Schema } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: "String",
      required: "true",
      unique: "true",
    },
    author: {
      type: "String",
      required: "true",
    },
    genre: {
      type: "String",
      required: "true",
    },
    PublishedYear: {
      type: "Number",
      required: "true",
    },
  },
  { timestamps: true }
);

const BooksModel = model("books", bookSchema);
module.exports = { BooksModel };
