import axios from "axios";
import { useState } from "react"
import Select from "react-select";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const ClientCase = ({caseData, setSelectedPanel, fetchCases})=>{

    const user = JSON.parse(localStorage.getItem("user")) || {}
    const [selectedLawyer, setSelectedLawyer] = useState([]);

     console.log(caseData);
    

     const updateCase = async()=>{

     const CaseId = caseData?.newCase?._id;
     const RequestedLawyer = caseData?.lawyersData.map((ele)=>ele.value) || [];
     let body = {
        CaseId,
        RequestedLawyer
     }

      if(RequestedLawyer.length === 0){
         toast.error("please select at least one lawyer..")
      }

       try{
          const resposnse = await axios.put(`${API_URL}/client/UpdateCase`, body,
         {validateStatus:()=>true,
         headers :{
            Authorization : `Bearer ${user.token}`
        }
      })
      
      let res = resposnse.data;

      if(res.success === true){
        toast.success(res.message);
        fetchCases();
        setSelectedPanel("My Cases")
      }else{
        toast.error(res.message)
      }
       } catch (error){
        toast.error(`server error ${error}`)
       }
     }

    return(
        <>
            <div className="h-screen w-full bg-black/30  fixed left-0 top-0 flex justify-center items-center">

               <div className="w-[80%] p-2  bg-gray-100 rounded-sm">
                    
                 <div className="p-3">
                    <h1 className="text-xl font-serif font-semibold mb-4">My Case</h1>

                    <div className="p-6 border shadow rounded-lg bg-white">
                    <p className="text-gray-700 mb-3">
                        {caseData?.newCase?.problemStatement}
                    </p>

                     <div className="flex gap-4 text-gray-500 mb-3">
                       <span>📍{caseData?.newCase?.Location}</span>
                       <span>📅{new Date(caseData?.newCase?.caseDate).toLocaleDateString("en-GB").replace(/\//g, "-")}</span>
                       <span className="ml-auto bg-yellow-100 text-yellow-700 rounded px-3 py-1">{caseData?.newCase?.caseStatus}</span>
                    </div>

                    <div className="p-4 rounded border bg-gray-50">
                        <h1 className="font-semibold text-purple-400 mb-4">
                            ⚙ AI Case Analysis
                        </h1>
                        <div className="flex flex-col gap-4 md:flex-row md:gap-12 text-sm p-2">
                               <div className="text-center">
                                <p className="text-medium">Case Type</p>
                                <p className=" text-gray-500">{caseData?.result?.PredictedCaseType}</p>
                               </div>
                               <div className="text-center">
                                <p className="text-medium">Case Severity</p>
                                <p className={caseData?.result?.CaseSeverity === "HIGH"? "bg-red-100 rounded px-5 py-1 text-sm text-red-500 ":
                                    caseData?.result?.CaseSeverity === "MEDIUM" ? "bg-orange-100 rounded px-5 py-1 text-sm text-orange-500": "bg-yellow-100 rounded px-5 py-1 text-sm text-yellow-500"
                                 }>{caseData?.result?.CaseSeverity }</p>
                               </div>
                               <div className="text-center">
                                <p className="text-medium">Estimated Fee</p>
                                <p className="text-gray-500 ">₹ {caseData?.result?.EstimatedMinFee} - ₹ {caseData?.result?.EstimatedMaxFee} </p>
                               </div>
                        </div>
                          <div className="text-sm mt-2">
                            <p className="text-medium font-medium">Ip Sections</p>
                            <div className="flex gap-3 mt-2 flex-wrap">
                                {caseData?.result?.SuggestedIPSections.map((ele, index)=>{
                                    return(
                                        <span className="bg-gray-200 rounded text-center px-3 py-1" key={index}>{ele}</span>
                                    )
                                })}
                            </div>
                          </div>
                          <div className="text-sm mt-4">
                            <p className="text-medium">Worst Case Outcome</p>
                            <p className="text-gray-500">{caseData?.result?.WorstCaseOutCome}</p>
                          </div>

                          <div className="text-sm mt-2">
                            <p className="text-medium">Remark</p>
                            <p className="text-gray-500">{caseData?.result?.remark}</p>
                          </div>
                          <div>
                            
                          </div>
                        
                    </div>
                      <div className=" flex justify-between items-center mt-2">
                            <div className="text-sm">
                              <p className="text-gray-500">Attachment</p>
                              <span className="text-xs bg-gray-200 px-3 py-1 rounded shadow">letter.pdf</span>
                            </div>
                            <div className="w-[33%]">
                                <p className="text-gray-500 mb-2">Suggested Lawyer</p>
                                <span>
                                <Select
                                isMulti options={caseData?.lawyersData || []} 
                                className="text-sm"
                                classNamePrefix="select"
                                onChange={(data)=>{setSelectedLawyer(data || [])}}
                                />
                                </span>
                            </div>
                            
                             <div>
                                <button disabled={selectedLawyer.length === 0}
                                 className = {`text-white rounded-lg bg-blue-500 px-4 py-2 text-[16px] whitespace-nowrap ${selectedLawyer.length === 0 ?
                                  "text-white bg-blue-400 cursor-not-allowed ":
                                   "text-white bg-blue-500 hover:bg-blue-600 transition-all"}`} 
                                   onClick={updateCase}>Send Request</button>
                             </div>
                            
                          </div>
                    </div>
                   
                 </div>

               </div>
            </div>
             </>
    )
}

export default ClientCase;