import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function BookTable() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  async function getAllBooks() {
    let result = await fetch("http://localhost:8080/api/getAllBook");
    if (result.status === 200) {
      result = await result.json();
      setBooks(result);
    }
  }
  async function deletebook(id) {
    console.log(id);
    let result = await fetch("http://localhost:8080/api/deletebookbyid/" + id, {
      method: "DELETE",
    });
    toast.success("deleted SuccessFull");
    // console.log("res", result);
    getAllBooks();
  }

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              S.no
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Author
            </th>
            <th scope="col" className="px-6 py-3">
              Genre
            </th>
            <th scope="col" className="px-6 py-3">
              PublishedYear
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="p-5">
          {books.map((book, index) => (
            <tr
              key={index + 1}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>
              <td className="px-6 py-4">{book.title}</td>
              <td className="px-6 py-4">{book.author}</td>
              <td className="px-6 py-4">{book.genre}</td>
              <td className="px-6 py-4">{book.PublishedYear}</td>
              <td className="px-6 py-4">
                <div>
                  <Link to={`/updatebook/${book._id}`}>
                    <button className="btn text-white bg-blue-600 p-2 rounded-md m-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="btn text-white bg-red-600 p-2 rounded-md m-2"
                    onClick={() => {
                      deletebook(book._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        className="btn bg-blue-500 text-white rounded-md p-2 mt-60"
        onClick={() => navigate("/addbook")}
      >
        Back
      </button>
    </div>
  );
}

export default BookTable;
