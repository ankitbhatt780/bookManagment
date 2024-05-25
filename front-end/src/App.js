import React from "react";
import Singup from "./Components/Signin";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Components/Login";
import AddBook from "./Components/AddBook";
import BookTable from "./Components/BookTable";
import UpdateBook from "./Components/UpdateBooks";

function App() {
  return (
    <>
      {" "}
      <div className="text-3xl font-bold underline">
        <Routes>
          <Route path="/" element={<Singup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/booklist" element={<BookTable />} />
          <Route path="/updatebook/:id" element={<UpdateBook />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
