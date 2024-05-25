import { Link } from "react-router-dom";
// import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

function Singup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/user/signup",
        userInfo
      );
      console.log(res);
      if (res.status === 200) {
        // localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("signup Successful ");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.msg) {
        toast.error(err.response.data.msg);
      } else {
        toast.error("An error occurred during sign up");
      }
    }
    reset();
  };
  const passwordRemeber = () => {
    toast("Pl.remember Password!", {
      icon: "",
    });
  };
  const myStyle = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1529539795054-3c162aab037a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW58ZW58MHx8MHx8fDA%3D')",
    background: "cover",
  };
  return (
    <div style={myStyle}>
      <div className="flex h-screen justify-center  items-center  ">
        <div className="border-2 shadow-lg px-20 py-10 rounded-md modal-box bg-slate-100 ">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            {/* if there is a button in form, it will close the modal */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            <div className=" item-center justify-center text-center  container rounded-md">
              <h1 className="  mt-5 text-2xl">Signup</h1>
              <h3 className="mt-5">Name</h3>
              <input
                type="text"
                placeholder="name"
                className="rounded-md border-black border  "
                {...register("name", { required: "Name is required" })}
              />

              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}

              <h3 className="mt-5 ">Email</h3>
              <input
                type="email"
                placeholder="email"
                className="rounded-md   border-black border "
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <h3 className="mt-5">Password</h3>
              <input
                onClick={passwordRemeber}
                type="password"
                className=" rounded-md  border-black border"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />

              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <br />
              <button
                type="submit"
                className="mt-5 text-blue-500   hover:text-pink-300 "
              >
                Signup
              </button>
              <br />
              <div
                className=""
                // onClick={() =>
                //   document.getElementById("my_modal_3").showModal()
                // }
              >
                have account ? {""}{" "}
                <button
                  className="  text-blue-500 cursor-pointer hover:text-pink-300 mt-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Singup;
