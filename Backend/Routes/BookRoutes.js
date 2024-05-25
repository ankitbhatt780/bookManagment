const {
  BookRegister,
  getAllBooks,
  getBookbyid,
  updateBooksbyId,
  deletebookByid,
} = require("../Controllers/BookController");

const express = require("express");

const router = express.Router();

router.route("/newBook").post(BookRegister);
router.route("/getAllBook").get(getAllBooks);
router.route("/getbookbyid/:id").get(getBookbyid);
router.route("/updatebookbyid/:id").patch(updateBooksbyId);
router.route("/deletebookbyid/:id").delete(deletebookByid);

module.exports = router;
