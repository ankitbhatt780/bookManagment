const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnect = require("./DbConnection");
const bookRouter = require("./Routes/BookRoutes");
const userRouter = require("./Routes/UserRoutes");
const app = express();
dbConnect();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", bookRouter);
app.use("/user", userRouter);

const PORT = 8080;
app.listen(PORT, () => console.log("server is running at the  " + PORT));
