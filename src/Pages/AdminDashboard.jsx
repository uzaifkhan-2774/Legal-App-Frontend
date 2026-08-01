import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../Components/AdminPanel";
import AdminTable from "../Components/AdminTable";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const token = JSON.parse(localStorage.getItem("user")).token || "";
  
  const [panel, setPanel] = useState(true);
  const [selectedPanel, setSelectedPanel] = useState("Dashboard");
  const [lawyerData, setLawyerData] = useState([]);

   const panelNames = [
    {
      name : "Dashboard",
      classData : "fa-regular fa-house text-sm"
    },
    {
      name : "Manage Lawyers",
      classData : "fa-solid fa-user-group text-sm"
    }
   ]

   const KPI_Info = useRef({total:0, approaved:0, pending:0, rejected:0, blocked:0, returned:0});

   const getLawyers = async()=>{
     
    try{
       
      const response = await axios.get("http://127.0.0.1:7000/admin/getallLawyer",
         {validateStatus:()=> true,
          headers : {Authorization : `Bearer ${token}`}});

         let res = response.data;

         console.log(res)
         
         if(res.success === false){

          toast.error(res.message)
         }else{

           const approaved = res.result?.filter((ele)=> ele.Status === "APPROVED")?.length
           const pending = res.result.filter((ele) => ele.Status === "PENDING")?.length;
           const rejected = res.result.filter((ele) => ele.Status === "REJECTED")?.length;
           const blocked = res.result.filter((ele) => ele.Status === "BLOCKED")?.length;
           const returned = res.result.filter((ele) => ele.Status === "RETURNED")?.length;

           KPI_Info.current ={total:res.result?.length, approaved:approaved, pending:pending, rejected:rejected, blocked:blocked, returned:returned};
          //  console.log(KPI_Info.current)
           setLawyerData(res.result);
         }

   } catch (error){
    console.log(`server error ${error}`)
   }
  }

  //calling the getLawyer function in useeffect.
   useEffect(()=>{
    if(token){
       getLawyers();
    }
   }, [token])

   // sign out
    const nevigate = useNavigate();

   const signOut = ()=>{
      localStorage.removeItem("user");
      nevigate("/")
   }


  return (
    <>
      <div className="w-full h-screen bg-gray-100 md:flex md:flex-row">
        <div
          className={
            panel
              ? "w-full h-1/12 bg-gray-900  flex flex-row justify-between md:w-1/6 md:h-screen"
              : "w-full h-1/12 bg-gray-900  flex flex-row justify-between overflow-hidden md:w-0 md:h-0"
          }
        >
           <div className="w-full flex flex-col justify-between items-center">  {/*div wrapper */}
            <div className="w-full flex flex-col">                                {/*top div */}
              <div className="flex border-b border-gray-600  gap-4 items-center">
                <div className="flex gap-2 font-san font-serif p-3 items-center">
                  <i className="fa-solid fa-scale-balanced text-blue-500 "></i>
                  <h1 className="text-gray-200 font-bold text-center">Legal Desk</h1>
                </div>
                <div>
                  <i className="fa-solid fa-bars text-white text-sm cursor-pointer text-center" onClick={()=>{setPanel(!panel)}}></i>
                </div>
              </div>
                <div className="flex flex-col gap-3 py-5 px-4 text-gray-400">
                  {
                    panelNames.map((ele, index)=>{
                      return <div key={index} className={ele.name === selectedPanel ? "flex gap-2 p-2 text-gray-200 bg-gray-800 cursor-pointer items-center text-sm rounded-[10px]"
                         : "flex gap-2 p-2 cursor-pointer items-center text-sm rounded-[15px]"}
                      
                      onClick={()=>{
                        setSelectedPanel(ele.name)
                      }}>
                     
                      <i className={ele.classData}></i>
                      <h1>{ele.name}</h1>
                      </div>
                    })
                  }

                </div>
               
            </div>
            <div className="flex flex-col gap-3 p-5 border-t border-gray-700 text-white">     {/*buttom div */}
              <div className="flex gap-3 justify-center items-center ">
                <div className="w-8 h-8 bg-gray-800 border-gray-700 text-sm flex justify-center items-center rounded-4xl">
                 {(user.result.name[0].toUpperCase())}
                </div>
                <div>
                  <h1 className="text-sm">{user.result.name}</h1>
                  <p className="text-sm text-gray-500">Admin</p>
                </div>
              </div>
              <div className="flex gap-3 justify-start items-center text-gray-500 cursor-pointer text-sm" onClick={signOut} >
                  <i className="fa-solid fa-arrow-right-from-bracket text-sm"></i>
                  <h3>Sign Out</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-full md-h-screen">
          < div className="md:flex justify-center text-gray-900 bg-gray-50 p-3 border-b border-gray-300">
           <h1 className="font-bold font-serif text-md text-center ">Admin Panel</h1>
          </div>

          {
            selectedPanel === "Dashboard" ? <AdminPanel  KPI_INFO ={KPI_Info.current}/> : <AdminTable lawyerData={lawyerData} fetchLaywer={getLawyers} />
          }
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
