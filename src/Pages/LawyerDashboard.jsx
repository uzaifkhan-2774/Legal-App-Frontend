import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LawyerPanel from "../Components/LawyerPanel";
import LawyerCaseTable from "../Components/LawyerCaseTable";
import axios from "axios";
import { toast } from "react-toastify";

const LawyerDashboard = ()=>{

 const user = JSON.parse(localStorage.getItem("user")) || {};
 const [selectedPanel, setSelectedPanel] = useState("Dashboard");
 const [caseData, setCaseData] = useState([]);
 const [panel, setPanel] = useState(true)
 const navigate = useNavigate();

 const panelNames = [
    { name : "Dashboard",
      classData : "fa-regular fa-house text-sm"
    },
    {
        name : "My Cases",
        classData : "fa-solid fa-user-group text-sm"
    }
   
 ]

 const fetchCases = async()=>{

      try{
        const response = await axios.get("http://127.0.0.1:7000/lawyer/getAllCases", {validateStatus:()=>true,
          headers : {
            Authorization : `Bearer ${user.token}`
          }
        });

        let res = response.data
        

        if(res.success === true){
          setCaseData(res.result);
          console.log(res.result)
        }
        else{
          toast.error(res.message)
        }


      }catch (error){
        console.log( `server error ${error}`);
        
      }
 }
 
 useEffect(()=>{
  fetchCases()
 }, [])

 //sign out 
  const signOut =()=>{
    localStorage.removeItem("user");

    navigate('/')
  }


    return(
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
                  <p className="text-sm text-gray-500">Lawyer</p>
                </div>
              </div>
              <div className="flex gap-3 justify-start items-center text-gray-500 cursor-pointer  text-sm" onClick={signOut} >
                  <i className="fa-solid fa-arrow-right-from-bracket text-sm"></i>
                  <h3>Sign Out</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-full md-h-screen">
          < div className="md:flex justify-center text-gray-900 bg-gray-50 p-3 border-b border-gray-300">
           <h1 className="font-bold font-serif text-md text-center ">Lawyer Panel</h1>
          </div>

          {
            selectedPanel === "Dashboard" ? <LawyerPanel caseData={caseData}/> : <LawyerCaseTable caseData={caseData} fetchCases={fetchCases}/>
          }
        </div>
      </div>
        </>
    )
}

export default LawyerDashboard;