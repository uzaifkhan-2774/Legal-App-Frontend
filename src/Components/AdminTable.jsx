import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";


const getStatuscolor = (status) => {
  if (status === "APPROVED") return "bg-green-100 text-green-600";
  if (status === "PENDING") return "bg-yellow-100 text-yellow-600";
  if (status === "BLOCKED") return "bg-red-100 text-red-600";
  if(status === "REJECTED")  return "bg-orange-100 text-orange-600";
  if(status === "RETURNED")  return "bg-amber-200 text-amber-600";
};
const AdminTable = ({ fetchLaywer, lawyerData }) => {
  const token = JSON.parse(localStorage.getItem("user")).token || "";
  const [userData, setUserData] = useState([]);
  const [selectedLawyer, setselectedLawyer] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [remark, setRemark] = useState("");
  const [loaderData, setLoaderData] = useState(false);

  useEffect(() => {
    if (lawyerData.length > 0) {
      setUserData(lawyerData);
    }
  }, [lawyerData]);

  //update status api calling..
  
  const updateStatus = async(status)=>{

    setLoaderData(true);
    // console.log(status);
    // console.log(selectedLawyer._id);
    // console.log(remark);

    try{
      if(!token){
      toast.error("Unauthorized")
    }

      const payLoad = {
        Status : status,
        AdminRemark : remark
      }

      const response =  await axios.put(`http://127.0.0.1:7000/admin/updatelawyerstatus/${selectedLawyer._id}`,payLoad, {validateStatus:()=>true,
        headers :{
            Authorization : `Bearer ${token}`,
            "Content-Type" : "application/json"
        }
      })

      let res = response.data;

      if(res.success === true){
           setIsOpen(false);
           fetchLaywer();
           toast.success(res.message);
           setselectedLawyer({});
           setRemark("");
 
      }
    
    } catch (error){
      console.log( `server error ${error}`)
    } finally{
      setLoaderData(false);
    }
  }

  return (
    <>
      <div className="  w-full flex bg-gray-100">
        <div className="w-full  md:p-2">
          <div className=" w-full flex justify-between items-center mb-3">
            <h1 className="font-serif text-lg text-gray-900 p-2 font-bold">
              Manage Lawyers
            </h1>

            <select className="w-20 border border-gray-400 rounded-sm p-0.5 text-sm ">
              <option>All</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Blocked</option>
            </select>
          </div>
          <div className="bg-gray-50 rounded-lg shadow overflow-x-auto  p-3">
            <table className="text-sm border-0  min-w-full">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-300">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Specialization</th>
                  <th className="p-2 text-left">Experience</th>
                  <th className="p-2 text-left"> Win Ratio</th>
                  <th className="p-2 text-left"> Fee Range</th>
                  <th className="p-2 text-left"> Status</th>
                  <th className="p-2 text-left"> Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((lawyer, index) => (
                  <tr key={index} className="border-0">
                    <td className="p-2">
                      <p className="font-medium text-gray-900">
                        {lawyer.UserId.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {lawyer.UserId.email}
                      </p>
                    </td>
                    <td className="p-2 ">{lawyer.LawyerType}</td>
                    <td className="p-2 text-sm text-gray-900 ">
                      {lawyer.experienceYears} year
                    </td>
                    <td className="p-2 text-sm text-gray-900 ">
                      {" "}
                      {lawyer.WinCases} cases
                    </td>
                    <td className="p-2 text sm text-gray-900 ">
                      ₹ {lawyer.Minfee} - ₹ {lawyer.Maxfee}
                    </td>
                    <td className="p-2">
                      <span
                        className={`text-xs rounded-xl px-3 py-2 font-semibold ${getStatuscolor(lawyer.Status)} `}
                      >
                        {lawyer.Status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-2">
                      <button
                        className="text-xs font-semibold px-3 py-1 border-2 border-yellow-200 text-yellow-700 rounded-xl "
                        onClick={() => {
                          setselectedLawyer(lawyer);
                          setIsOpen(true);
                          setRemark(lawyer.AdminRemark);
                        }}
                      >
                        actions
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* isOpenModel */}

      {isOpen ? (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center cl-model bg-black/50">
          <div
            className="w-[50%] rounded-2xl relative bg-white p-4
                    "
          >
            <i
              className="fa-solid fa-circle-xmark absolute top-2 right-2 text-red-600 text-2xl cursor-pointer"
              onClick={() => {
                setIsOpen(false);
              }}
            ></i>

            <h1 className="text-gray-800 text-2xl font-semibold">
              Lawyer Information
            </h1>

            <div className="w-full flex flex-col gap-1 p-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <h3 className="text-[18px]">
                    <b>Name</b>:
                    <span className="text-gray-700">
                      {" "}
                      {selectedLawyer?.UserId?.name}
                    </span>
                  </h3>
                </div>

                <div className="w-1/2">
                  <h3 className="text-[18px]">
                    <b>Email</b>:
                    <span className="text-gray-700">
                      {" "}
                      {selectedLawyer?.UserId?.email}
                    </span>
                  </h3>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <h3 className="text-[18px]">
                    <b>Phone</b>:
                    <span className="text-gray-700">
                      {" "}
                      {selectedLawyer?.UserId?.phone}
                    </span>
                  </h3>
                </div>

                <div className="w-1/2">
                  <h3 className="text-[18px]">
                    <b>Barcouncil ID</b>:
                    <span className="text-gray-700">
                      {" "}
                      {selectedLawyer?.BarCounsileId}
                    </span>
                  </h3>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <h3 className="text-[18px]">
                    <b>Degree</b>:
                    <span className="text-gray-700">
                      {" "}
                      {selectedLawyer?.Degree}
                    </span>
                  </h3>
                </div>

                <div className="w-1/2">
                  <h3 className="text-[18px]">
                    <b>Lawyer Type</b>:
                    <span className="text-gray-700">
                      {" "}
                      {selectedLawyer?.LawyerType}
                    </span>
                  </h3>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <h3 className="text-[18px]">
                    <b>Experience</b>:
                    <span className="text-gray-700">
                      {" "}
                      {selectedLawyer?.experienceYears}
                    </span>
                  </h3>
                </div>

                <div className="w-1/2">
                  <h3 className="text-[18px]">
                    <b>Total Cases</b>:
                    <span className="text-gray-700">
                      {" "}
                      {selectedLawyer?.TotalCases}
                    </span>
                  </h3>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <h3 className="text-[18px]">
                    <b>Won Cases</b>:
                    <span className="text-gray-700">
                      {" "}
                      {selectedLawyer?.WinCases}
                    </span>
                  </h3>
                </div>

                <div className="w-1/2">
                  <h3 className="text-[18px]">
                    <b>Lost Cases</b>:
                    <span className="text-gray-700">
                      {" "}
                      {selectedLawyer?.LostCases}
                    </span>
                  </h3>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <h3 className="text-[18px]">
                    <b>Minimum Fees</b>:
                    <span className="text-gray-700">
                      {" "}
                      ₹{selectedLawyer?.Minfee}
                    </span>
                  </h3>
                </div>

                <div className="w-1/2">
                  <h3 className="text-[18px]">
                    <b>Maximum Fees</b>:
                    <span className="text-gray-700">
                      {" "}
                      ₹{selectedLawyer?.Maxfee}
                    </span>
                  </h3>
                </div>
              </div>
                <div className="flex gap-4 w-[50%] my-4  ">
              <h3 className="text-[18px] font-bold">Remark</h3>
              <textarea type="text" placeholder="Enter Remark" className="w-full border rounded-xs p-2" defaultValue={remark} onKeyUp={(e)=>{
                setRemark(e.target.value)
              }}></textarea>
            </div>
            </div>
        
               <div className=" w-full flex gap-3 px-4">
                <button type="button" className=" w-[20%] border-green-400 bg-green-400 p-2 rounded-sm  shadow-2xs hover:bg-green-500 hover:text-gray-900 cursor-pointer text-gray-800" onClick={()=>{updateStatus("APPROVED")}}>Approve</button>
                <button type="button"  className=" w-[20%] border-red-400 bg-red-400 p-2 rounded-sm  shadow-2xs hover:bg-red-500 hover:text-gray-900 cursor-pointer text-gray-800" onClick={()=>{updateStatus("REJECTED")}}>Reject</button>
                <button type="button"  className="w-[20%]  border-orange-400 bg-orange-400 p-2 rounded-sm  shadow-2xs hover:bg-orange-500 hover:text-gray-900 cursor-pointer text-gray-800" onClick={()=>{updateStatus("RETURNED")}}>Return</button>
                <button type="button" className="w-[20%]  border-red-500 bg-red-500 p-2 rounded-sm  shadow-2xs hover:bg-red-600 hover:text-gray-900 cursor-pointer text-gray-800" onClick={()=>{updateStatus("BLOCKED")}}>Block</button>
               </div>
          
          </div>
        </div>
      ) : null}

      {loaderData? <Loader/> :null}
    </>
  );
};

export default AdminTable;
