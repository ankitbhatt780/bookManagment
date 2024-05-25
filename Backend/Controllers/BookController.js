const { BooksModel } = require("../Model/BooksModel");

async function BookRegister(req, res) {
  const { title, author, genre, PublishedYear } = req.body;
  //   console.log("Ankit", req.body);
  if (!title || !author || !genre || !PublishedYear) {
    return res.status(404).json({ msg: "pl.Enter the all required Fields" });
  }

  try {
    const PreRegister = await BooksModel.findOne({ title: title });
    if (PreRegister) {
      return res.status(500).json({ msg: "Book is already registerd" });
    } else {
      const book = await BooksModel.create({
        title: title,
        author: author,
        genre: genre,
        PublishedYear: PublishedYear,
      });
      //   console.log(book);
      return res.status(200).json(book);
    }
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function getAllBooks(req, res) {
  try {
    const book = await BooksModel.find();
    return res.status(200).json(book);
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function getBookbyid(req, res) {
  const id = req.params.id;
  // console.log(id);
  try {
    const book = await BooksModel.findById(id);
    // console.log(book);
    return res.status(200).json(book);
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function updateBooksbyId(req, res) {
  const { id } = req.params;
  try {
    const book = await BooksModel.findByIdAndUpdate(id, req.body);
    // console.log(book);
    if (!book) {
      return res.status(400).json({ msg: "Cannot find books id" });
    } else {
      return res.status(200).json({ msg: "success" });
    }
  } catch (err) {}
}
async function deletebookByid(req, res) {
  try {
    const { id } = req.params;
    // console.log("id", id);
    const book = await BooksModel.findByIdAndDelete(id);
    // console.log(book);
    return res.status(200).json({ msg: "success" });
  } catch (err) {
    return res.status(401).json(err);
  }
}

module.exports = {
  BookRegister,
  getAllBooks,
  getBookbyid,
  updateBooksbyId,
  deletebookByid,
};
