import { Link,  useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Form, useForm } from "react-hook-form";
const API_URL = import.meta.env.VITE_API_URL;


const Register = ()=>{

const role = ["Admin", "Lawyer", "Client"];
const [selectedRole, setSelectedRole] = useState("Client")
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")

const {register, handleSubmit, formState:{errors}} = useForm();

const navigate = useNavigate();




const submitData = (data)=>{
  // console.log(data)

  const payLoad = {
    ...data, 
    password,
    role : selectedRole,
    
  }

  if(password !== confirmPassword){
    return toast.error("please enter correct password")
  }

  axios.post(`${API_URL}/auth/registration`, payLoad, {validateStatus :()=> true})
  .then((response)=>{
    let res = response.data;
  
   
    
    if(res.success === true){

      toast.success(res.message);

      if(res.newUser.role.toLowerCase() === "lawyer"){
        navigate('/profile')
      }else{
        navigate('/')
      }
    }else
    {
      toast.error(res.message)
    }
  }).catch((error)=>{
    console.log(error)
    toast.error(`server error ${error}`)
  })
}

    return(
  
              <>
      <div className="w-full h-screen flex bg-gray-100 ">
        <div className="w-1/2 h-screen flex justify-center items-center">
          <div className="w-1/2 h-screen flex flex-col justify-center ">
            <div className="flex font-serif gap-2 items-center justify-center">
              <i className="fa-solid fa-scale-balanced text-blue-500 text-2xl text-center"></i>
              <h1 className=" font-bold text-center text-2xl">
                LegalDesk
              </h1>
            </div>
            <div className="p-2">
              <h1 className="font-bold text-2xl  font-serif text-center  ">
                Welcome 
              </h1>
              <p className=" text-sm text-center text-gray-400    ">
                All Fields Required For Account Creation
              </p>
            </div>
            <div className = "py-2">
           {
            role.map((ele, index)=>{
              return(
                <button key={index} 
                className={ selectedRole === ele ? `w-1/3 text-gray-200 text-sm bg-gray-900 cursor-pointer py-1 rounded-xl transition-all`:
                   `w-1/3 text-gray-500 text-sm bg-gray-200 p-1 rounded-xl transition-all outline-gray-900 hover:text-gray-200 hover:bg-gray-900 focus:text-gray-200 focus:bg-gray-900 focus:outline-gray-900`} 
                    onClick={()=>{setSelectedRole(ele)}}> {ele} </button>
                
              )
           
            })
        }
            </div>

            <form className="flex flex-col  " onSubmit={handleSubmit(submitData)} >

              <label htmlFor="name" className="text-1">
                Full Name
              </label>
              <input
                id="name"
                placeholder="Rahul Singh"
                type="text"
                className=" w-full rounded-xl border-2 border-gray-200 p-1 outline-gray-800"
                {...register("name", { required: true })}
              />
              {/* include validation with required or other standard HTML validation rules */}
              {errors.name && (
                <span className="text-sm text-red-500">Full Name is required</span>
              )}

               <label htmlFor="name" className="text-1">
               Mobile Number
              </label>
              <input
                id="phone"
                placeholder="9310348923"
                type="number"
                className=" w-full rounded-xl border-2 border-gray-200 p-1 outline-gray-800"
                {...register("phone", { required: true, maxLength : 10 })}
              />
              {/* include validation with required or other standard HTML validation rules */}
              {errors.phone && (
                <span className="text-sm text-red-500">Enter a valid number</span>
              )}
           

              <label htmlFor="email" className="">
                Email
              </label>
              <input
                id="email"
                placeholder="📧 Enter your email"
                type="email"
                className=" w-full rounded-xl border-2 border-gray-200 p-1 outline-gray-800"
                {...register("email", { required: true })}
              />
              {/* include validation with required or other standard HTML validation rules */}
              {errors.email && (
                <span className="text-sm text-red-500">Email is required</span>
              )}

              <label htmlFor="password">Password</label>
              <input
                id="password"
                placeholder="🔒*******"
                type="password"
                className="  rounded-xl border-2 border-gray-200 p-1 outline-gray-800"
               onKeyUp={(e)=>{
               setPassword(e.target.value)
               }}
                
              />
            
             
                 <label htmlFor="password">Confirm Password</label>
              <input
                id="password"
                placeholder="🔒*******"
                type="password"
               className={password.length >0 ? password === confirmPassword ? "border-2 border-green-500 outline-gray-900 p-1 rounded-xl " : "border-2 border-red-500 p-1  rounded-xl " : "rounded-xl p-1 border-2 border-gray-200  "}
        
                    onKeyUp={(e)=>{
               setConfirmPassword(e.target.value)
               }}
          
              />

              <button
                className="w-full p-1 mt-2 bg-blue-600 rounded-xl text-gray-200 hover:bg-blue-700 hover:text-gray-100"
                type="submit"
              >
                Sign In
              </button>
            </form>
            <div className=" text-center text-gray-400 p-2">
              <p>
                 have an account?
                <Link to={"/"}>
                  <span className="text-sm text-blue-500 hover:font-bold cursor-pointer"> Log in</span>
                </Link>
              </p>

           
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
       
    )
}

export default Register;