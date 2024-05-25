import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// import axios from "axios";
// import toast from "react-hot-toast";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function UpdateBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getData(id);
  }, [id]);

  const getData = async (id) => {
    // console.log("id", id);
    try {
      let result = await fetch("http://localhost:8080/api/getbookbyid/" + id, {
        method: "GET",
        headers: { "Content-Type": "Application/json" },
      });
      result = await result.json();
      console.log("data", result);
      if (result) {
        setValue("title", result.title);
        setValue("author", result.author);
        setValue("genre", result.genre);
        setValue("PublishedYear", result.PublishedYear);
      }
    } catch (err) {
      console.log(err);
    }
  };
  async function onSubmit(value) {
    console.log("val", value);
    try {
      let result = await fetch(
        `http://localhost:8080/api/updatebookbyid/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ value }),
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("result", result);
      result = await result.json();
      console.log("result", result);
      if (result.status === 200) {
        navigate("/booklist");
      }
    } catch (err) {
      console.log(err);
    }
  }
  const myStyle = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1529539795054-3c162aab037a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW58ZW58MHx8MHx8fDA%3D')",
    background: "cover",
  };
  return (
    <div>
      <div className="flex h-screen justify-center  items-center  ">
        <div className="border-2 shadow-lg px-20 py-10 rounded-md modal-box bg-slate-100 ">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            {/* if there is a button in form, it will close the modal */}

            <div className=" item-center justify-center text-center  container rounded-md">
              <h1 className="  mt-5 ">Update Book</h1>
              <h3 className="mt-5">title</h3>
              <input
                autoFocus
                type="text"
                placeholder="title"
                className="rounded-md border-black border"
                {...register("title", {
                  required: "  title is required",
                })}
              />

              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}

              <h3 className="mt-5 ">author</h3>
              <input
                type="text"
                placeholder="author"
                className="rounded-md   border-black border "
                {...register("author", { required: "author is required" })}
              />
              {errors.author && (
                <p className="text-red-500">{errors.author.message}</p>
              )}
              <h3 className="mt-5">genre </h3>
              <input
                type="text"
                className=" rounded-md  border-black border"
                placeholder="genre"
                {...register("genre", { required: "genre is required" })}
              />
              {errors.genre && (
                <p className="text-red-500">{errors.genre.message}</p>
              )}
              <h3 className="mt-5">Year of Publish </h3>
              <input
                type="text"
                className=" rounded-md  border-black border"
                placeholder="Year of Publish "
                {...register("PublishedYear", {
                  required: "PublishedYear  is required",
                })}
              />
              {errors.PublishedYear && (
                <p className="text-red-500">{errors.PublishedYear.message}</p>
              )}
              <br />
              <button
                type="submit"
                className="mt-5 text-white  p-4 bg-blue-500  rounded-md hover:text-pink-800 "
              >
                Update
              </button>
              <br />
              <button
                className="btn bg-blue-800 text-white rounded-md mt-5"
                onClick={() => navigate("/booklist")}
              >
                GoToBookList
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBook;
