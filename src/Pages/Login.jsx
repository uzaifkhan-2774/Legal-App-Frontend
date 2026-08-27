import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  
  const navigate = useNavigate();
  const [isLawyer, setIsLawyer] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);

    axios
      .post(`${API_URL}/auth/login`, data, {
        validateStatus: () => true,
      })
      .then((response) => {
        // console.log(response);
        let res = response.data;

        console.log(res);

        if (res.success === true) {
          toast.success(res.message);
          localStorage.setItem("user", JSON.stringify(res))
        

          if (res.result.role === "Admin") {
            navigate("/admin-dashboard");
          }
           else if (res.result.role === "Lawyer") {
            navigate("/lawyer-dashboard");
          }
           else  {
            navigate("/client-dashboard");
          }
         }
          else {

            if( res.message === "Create Your Lawyer Profile First."){
          
              setIsLawyer(true)
            }else{
              setIsLawyer(false)
            } 
            toast.error(res.message)
          }
        
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error("server error")

  });
   }

  return (
    <>
      <div className="w-full h-screen flex bg-gray-100 ">
        <div className="w-1/2 h-screen flex justify-center items-center">
          <div className="w-1/2 h-screen flex flex-col justify-center ">
            <div className="flex font-serif gap-2 items-center justify-center">
              <i className="fa-solid fa-scale-balanced text-blue-500 text-2xl text-center"></i>
              <h1 className="bg-grey-900 font-bold text-center text-2xl">
                LegalDesk
              </h1>
            </div>
            <div className="p-2">
              <h1 className="font-bold text-3xl  font-serif text-center  ">
                Welcome Back
              </h1>
              <p className="text-center text-gray-500 p-2   ">
                Sign in to your account{" "}
              </p>
            </div>

            <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}
              <label htmlFor="email" className="">
                Email
              </label>
              <input
                id="email"
                placeholder="📧 Enter your email"
                type="email"
                className=" w-full rounded-md border-2 border-gray-200 p-1 outline-gray-200"
                {...register("email", { required: true })}
              />
              {/* include validation with required or other standard HTML validation rules */}
              {errors.email && (
                <span style={{ color: "red" }}>email is required</span>
              )}

              <label htmlFor="password">Password</label>
              <input
                id="password"
                placeholder="🔒 Enter your password"
                type="password"
                className="  rounded-md border-2 border-gray-200 p-1 outline-gray-200"
                {...register("password", { required: true })}
              />
              {/* errors will return when field validation fails  */}
              {errors.password && (
                <span style={{ color: "red" }}>password is required</span>
              )}

              <button
                className="w-full p-1 mt-2 bg-blue-600 rounded-md text-gray-200 hover:bg-blue-700"
                type="submit"
              >
                Sign In
              </button>
            </form>
            <div className=" text-center text-gray-400 p-2">
              <p>
                Don't have an account?
                <Link to={"/register"}>
                  <span className="text-blue-500 hover:font-bold cursor-pointer">Register</span>
                </Link>
              </p>

              {isLawyer ? (
                <p>
                  Complete your lawyer profile!
                  <Link to={"/profile"}>
                    <span className=" mt-4 text-blue-500 hover:font-bold cursor-pointer">Profile</span>
                  </Link>
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="bg-gray-900 w-1/2 h-screen flex justify-center items-center">
          <div className="  h-screen flex flex-col items-center justify-center gap-2 ">
            <i className="fa-solid fa-scale-balanced text-blue-500 text-2xl text-center"></i>
            <h1 className="font-serif text-gray-300 text-2xl">
              Justice, Simplified
            </h1>
            <p className="text-gray-400 text-center text-sm w-1/2">
              AI-powered legal case management, Contact with top laywers,
              analyze your case, and get justice faster.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
