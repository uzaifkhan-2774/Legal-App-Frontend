import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const LawyerProfile = () => {

  const {register, handleSubmit, formState:{errors}} = useForm()
  const nevigate = useNavigate();

  const submitData = async (data)=>{
   console.log(data);

   const payload = {
    email : data.Email,
    BarCounsileId : data.BarCounsileId,
    Degree : data.Degree,
    LawyerType : data.LawyerType,
    experienceYears : Number(data.Experience),
    TotalCases : Number(data.TotalCases),
    WinCases : Number(data.WinCases),
    LostCases : Number(data.LostCases),
    WinRatio : Number(data.WinCases),
    Minfee : Number(data.Minfee),
    Maxfee : Number(data.Maxfee)

   }

   try{

   const response =  await axios.post(`${API_URL}/lawyer/createLawyerProfile`, payload, {validateStatus : ()=> true})
      let res = response.data;

      if(res.success === true){
        toast.success(res.message);
        nevigate('/')
      }else{
        toast.error(res.message)
      }
   }catch (error){
    console.log(error)
    toast.error("server error")
   }
  
   }

  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100">
        <div className="flex flex-col gap-4 justify-center items-center font-serif">
          <div className="flex gap-2 justify-center items-center">
            <i className="fa-solid fa-scale-balanced text-blue-500 text-2xl text-center"></i>
            <h1 className=" font-bold  text-2xl">LegalDesk</h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Lawyer Profile Setup</h1>
            <p className="text-md text-gray-700">
              Complete Your Professional Details
            </p>
          </div>
      
              <form onSubmit={handleSubmit(submitData)} className="w-[60%] bg-gray-50 border border-gray-300 rounded-sm font-sans p-4 outline-1 outline-gray-200 flex flex-col gap-3">
            <div className=" w-full flex justify-center items-center gap-3">
              <div className=" w-1/3">
                <label
                  htmlFor="Email"
                  className="text-sm font-semibold text-gray-700 "
                >
                  Email
                </label>
                <input
                  type="text"
                  id="Email"
                  placeholder="✉ xyz@gmail.com"
                  className=" w-full p-1 text-sm mt-1 text-gray-500 font-semibold bg-gray-100  border border-gray-300 rounded-sm "
                  {...register("Email", {required:true})}
                />
                {errors.Email && <span className=" mt-0 text-xs text-red-600">This field is required</span>}
              </div>
              <div className=" w-1/3">
                <label
                  htmlFor="bar council id"
                  className="text-sm font-semibold text-gray-700 "
                >
                  Bar Council ID
                </label>
                <input
                  type="text"
                  id="bar council id"
                  placeholder="⚖︎ MH/1234/2020"
                  className=" w-full p-1 text-sm mt-1 text-gray-500 font-semibold bg-gray-100  border border-gray-300 rounded-sm "
                  {...register("BarCounsileId", {required:true})}
                />
                {errors.BarCounsileId && <span className=" text-xs text-red-600">This field is required</span>}
              </div>
              <div className=" w-1/3">
                <label
                  htmlFor="degree"
                  className="text-sm font-semibold text-gray-700 "
                >
                  Degree
                </label>
                <input
                  type="text"
                  id="degree"
                  placeholder="🎓 LL.B / LL.M"
                  className=" w-full p-1 mt-1 text-sm text-gray-500 font-semibold bg-gray-100  border border-gray-300 rounded-sm"
                   {...register("Degree", {required:true})}
                />
                {errors.Degree && <span className=" text-xs text-red-600">This field is required</span>}
              </div>
            </div>

            <div className=" w-full flex justify-center items-center gap-3">
              <div className=" w-1/2">
                <label
                  htmlFor="degSpecializationree"
                  className="text-sm font-semibold text-gray-700 "
                >
                  Specialization
                </label>
                <select
                  name="Specialization"
                  type="text"
                  id="Specialization"
                  className=" w-full p-1 mt-1 text-sm text-gray-500 font-semibold bg-gray-100  border border-gray-300 rounded-sm"
                  {...register("LawyerType", {required:true})}
                >
                  <option value={""}>select specialization</option>
                  <option value={"Criminal"}>Criminal</option>
                  <option value={"Civil"}>Civil</option>
                  <option value={"Corporate"}>Corporate</option>
                  <option value={"Property"}>Property</option>
                  <option value={"Cyber"}>Cyber</option>
                </select>
                {errors.LawyerType && <span className=" text-xs text-red-600">This field is required</span>}
              </div>
              <div className=" w-1/2 ">
                <label
                  htmlFor="exp"
                  className="text-sm font-semibold text-gray-700 "
                >
                  Experience (year)
                </label>
                <input
                  type="number"
                  id="exp"
                  placeholder="⏳ 0"
                  className=" w-full p-1 text-sm mt-1 text-gray-500 font-semibold bg-gray-100  border border-gray-300 rounded-sm "
                 {...register("Experience", {required:true})} 
                />
                {errors.Experience && <span className=" text-xs text-red-600">This field is required</span>}
              </div>
            </div>
            <div className=" w-full flex justify-center items-center gap-3">
              <div className=" w-1/3">
                <label
                  htmlFor="Total Cases"
                  className="text-sm font-semibold text-gray-700 "
                >
                  Total Cases
                </label>
                <input
                  type="number"
                  id="Total Cases"
                  placeholder="0"
                  className=" w-full p-1 text-sm mt-1 text-gray-500 font-semibold bg-gray-100  border border-gray-300 rounded-sm "
                  {...register("TotalCases", {required:true})}
                />
                {errors.TotalCases && <span className=" text-xs text-red-600">This field is required</span>}
              </div>
              <div className=" w-1/3 ">
                <label
                  htmlFor="Won"
                  className="text-sm font-semibold text-gray-700 "
                >
                  Won
                </label>
                <input
                  type="number"
                  id="Won"
                  placeholder="0"
                  className=" w-full p-1 mt-1 text-sm text-gray-500 font-semibold bg-gray-100  border border-gray-300 rounded-sm"
                    {...register("WinCases", {required:true})}
                />
                {errors.WinCases && <span className=" text-xs text-red-600">This field is required</span>}
              </div>
                 <div className=" w-1/3">
                <label
                  htmlFor="Lost"
                  className="text-sm font-semibold text-gray-700 "
                >
                  Lost
                </label>
                <input
                  type="number"
                  id="Lost"
                  placeholder="0"
                  className=" w-full p-1 text-sm mt-1 text-gray-500 font-semibold bg-gray-100  border border-gray-300 rounded-sm "
                 {...register("LostCases", {required:true})}
                />
                {errors.LostCases && <span className=" text-xs text-red-600">This field is required</span>}
              </div>
            </div>
            <div className=" w-full flex justify-center items-center gap-3">
              <div className=" w-1/2">
                <label
                  htmlFor="Min Fee"
                  className="text-sm font-semibold text-gray-700 "
                >
                  Min Fee (₹)
                </label>
                <input
                  type="text"
                  id="Min Fee"
                  placeholder="0 (₹)"
                  className=" w-full p-1 text-sm mt-1 text-gray-500 font-semibold bg-gray-100  border border-gray-300 rounded-sm "
                  {...register("Minfee", {required:true})}
                />
                {errors.Minfee && <span className=" text-xs text-red-600">This field is required</span>}
              </div>
              <div className=" w-1/2 ">
                <label
                  htmlFor="Max Fee"
                  className="text-sm font-semibold text-gray-700 "
                >
                  Max Fee (₹)
                </label>
                <input
                  type="text"
                  id="Max Fee"
                  placeholder="0 (₹)"
                  className=" w-full p-1 mt-1 text-sm text-gray-500 font-semibold bg-gray-100  border border-gray-300 rounded-sm"
                  {...register("Maxfee", {required:true})}
                />
                {errors.Maxfee && <span className=" text-xs text-red-600">This field is required</span>}
              </div>
            </div>
            <div className="w-full">
              <button type="submit" className=" w-full bg-blue-500 hover:bg-blue-600 transition-all text-gray-50 p-2 text-center border rounded-sm text-sm">Submit For Approval</button>
            </div>
          </form>
      
        </div>
      </div>
    </>
  );
};

export default LawyerProfile;
