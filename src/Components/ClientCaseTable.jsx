import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ClientCaseTable = ({caseData, fetchCases})=>{

    const user= JSON.parse(localStorage.getItem("user")) || {}
    const [isModal, setIsModal] = useState(false);
    const [singleCase, setSingleCase] = useState({});

    const UpdateStatus = async(status)=>{

        const body = {
            Status : status
        }

       try {

  const response = await axios.put(`http://127.0.0.1:7000/client/UpdateStatus/${singleCase?._id}`,body,{validateStatus:()=>true,
            headers :{
                Authorization : `Bearer ${user.token}`
            }
        })
        let res = response.data;

        if(res.success === true){
            setIsModal(false);
            toast.success(res.message);
            setSingleCase({});
            fetchCases();
        } else{
            toast.error(res.message);
        }
       
       } catch (error){
        console.log(`server error ${error}`)
       }

}
    return(
        <>
        <div className="w-full flex bg-gray-100">
            <div className="flex-1 md:p-2">
              <div className="flex justify-between items-center md:p-2">
                <h1 className="text-lg font-serif font-bold text-gray-900 ">Manage Cases</h1>
                <select className="border-0 outline-1 w-20 rounded-md px-2 py-1 shadow-sm">
                    <option >All</option>
                    <option>New</option>
                    <option>Ongoing</option>
                    <option>Solved</option>
                </select>
              </div>
              <div className="bg-gray-50 pl-4 shadow rounded-lg overflow-x-auto">
                <table className="min-w-full border-0 text-sm">
                   <thead className="text-gray-600">
                    <tr>
                        <th className="p-2 text-left">#</th>
                        <th className="p-2 text-left">Problem Statement</th>
                        <th className="p-2 text-left">Location</th>
                        <th className="p-2 text-left">Case Date</th>
                        <th className="p-2 text-left">Case Severity</th>
                        <th className="p-2 text-left">Fee Range</th>
                        <th className="p-2 text-left">Type Of LawyerNeeded</th>
                        <th className="p-2 text-left">Case Status</th>
                        <th className="p-2 text-left">Actions</th>

                    </tr>
                   </thead>
                   <tbody>
                    {caseData?.map((case_data, index)=>(
                        <tr key={index} className="border-0">
                        <td className="p-2 text-sm">{index+1}</td>
                        <td className="p-2 text-sm font-medium" title={case_data?.problemStatement}>{case_data?.problemStatement.slice(0,20)+"..."}</td>
                        <td className="p-2 text-sm text-gray-900">{case_data?.Location}</td>
                        <td className="p-2 text-sm ">{new Date(case_data?.caseDate).toLocaleDateString("en-GB").replace(/\//g, "-")}</td>
                        <td className="p-2 text-sm font-medium">{case_data?.Aianalysis?.CaseSeverity}</td>
                        <td className="p-2 text-sm text-gray-900">₹{case_data?.Aianalysis?.EstimatedMinFee}-₹{case_data?.Aianalysis?.EstimatedMaxFee}</td>
                        <td className="p-2"><span className="px-3 py-1 rounded-full text-xs font-semibold">{case_data?.LawyerType}</span></td>
                        <td className={
                            case_data?.caseStatus === "NEW" ? "p-2 text-sm font-medium text-orange-400":
                            case_data?.caseStatus === "ONGOING" ? "p-2 text-sm font-medium text-amber-400":
                            case_data?.caseStatus === "STOPED" ? "p-2 text-sm font-medium text-red-500":
                            case_data?.caseStatus === "COMPLETED" ? "p-2 text-sm font-medium text-green-500" : null
                        }>{case_data?.caseStatus}</td>
                        <td className="p-2 space-x-2"><button className="px-3 py-1 text-xs cursor-pointer"><i className="fa-solid fa-eye text-2xl text-blue-400" 
                        onClick={()=>{
                            setIsModal(true),
                            setSingleCase(case_data)
                        }}></i></button></td>
                    </tr>
                    ))}
                   </tbody>
                </table>
              </div>
            </div>
        </div>
        {
            isModal ?
            (
             <>
            <div className="h-screen w-full bg-black/30  fixed left-0 top-0 flex justify-center items-center">

               <div className="w-[80%] p-2  bg-gray-100 relative rounded-sm">
                <i className="fa-solid fa-circle-xmark absolute right-1 top-1 text-red-500 text-2xl cursor-pointer"
                onClick={()=>{
                    setIsModal(false)
                }}></i>
                 <div className="p-3">
                    <h1 className="text-xl font-serif font-semibold mb-4">My Case</h1>

                    <div className="p-6 border shadow rounded-lg bg-white">
                    <p className="text-gray-700 mb-3">
                        {singleCase?.problemStatement}
                    </p>

                     <div className="flex gap-4 text-gray-500 mb-3">
                       <span>📍{singleCase?.Location}</span>
                       <span>📅{new Date(singleCase?.caseDate).toLocaleDateString("en-GB").replace(/\//g, "-")}</span>
                       <span className="ml-auto bg-yellow-100 text-yellow-700 rounded px-3 py-1">{singleCase?.caseStatus}</span>
                    </div>

                    <div className="p-4 rounded border bg-gray-50">
                        <h1 className="font-semibold text-purple-400 mb-4">
                            ⚙ AI Case Analysis
                        </h1>
                        <div className="flex flex-col gap-4 md:flex-row md:gap-12 text-sm p-2">
                               <div className="text-center">
                                <p className="text-medium">Case Type</p>
                                <p className=" text-gray-500">{singleCase?.Aianalysis?.PredictedCaseType}</p>
                               </div>
                               <div className="text-center">
                                <p className="text-medium">Case Severity</p>
                                <p className={singleCase?.Aianalysis?.CaseSeverity === "HIGH"? "bg-red-100 rounded px-5 py-1 text-sm text-red-500 ":
                                    singleCase?.Aianalysis?.CaseSeverity === "MEDIUM" ? "bg-orange-100 rounded px-5 py-1 text-sm text-orange-500": "bg-yellow-100 rounded px-5 py-1 text-sm text-yellow-500"
                                 }>{singleCase?.Aianalysis?.CaseSeverity }</p>
                               </div>
                               <div className="text-center">
                                <p className="text-medium">Estimated Fee</p>
                                <p className="text-gray-500 ">₹ {singleCase?.Aianalysis?.EstimatedMinFee} - ₹ {singleCase?.Aianalysis?.EstimatedMaxFee} </p>
                               </div>
                        </div>
                          <div className="text-sm mt-2">
                            <p className="text-medium font-medium">Ip Sections</p>
                            <div className="flex gap-3 mt-2 flex-wrap">
                                {singleCase?.Aianalysis?.SuggestedIPSections.map((ele, index)=>{
                                    return(
                                        <span className="bg-gray-200 rounded text-center px-3 py-1" key={index}>{ele}</span>
                                    )
                                })}
                            </div>
                          </div>
                          <div className="text-sm mt-4">
                            <p className="text-medium">Worst Case Outcome</p>
                            <p className="text-gray-500">{singleCase?.Aianalysis?.WorstCaseOutCome}</p>
                          </div>

                          <div className="text-sm mt-2">
                            <p className="text-medium">Remark</p>
                            <p className="text-gray-500">{singleCase?.Aianalysis?.remark}</p>
                          </div>
                          <div>
                            
                          </div>
                        
                    </div>
                      <div className=" flex justify-between items-center mt-2">
                            <div className="text-sm">
                              <p className="text-gray-500">Attachment</p>
                              <span className="text-xs bg-gray-200 px-3 py-1 rounded shadow">letter.pdf</span>
                            </div>
                          
                              {
                                singleCase?.caseStatus === "ONGOING"? 
                                (
                                  <div className="flex gap-4">
                                      <button className="bg-red-500 text-black px-3 py-1 rounded shadow cursor-pointer"
                                      onClick={()=>{
                                        UpdateStatus("STOPED");
                                      }}>Stop</button>

                                      <button className="bg-green-400 text-gray-700 px-3 py-1 rounded shadow cursor-pointer" 
                                       onClick={()=>{
                                        UpdateStatus("COMPLETED");
                                      }}>Complete</button>
                                  </div>
                                ) : null
                            }
                          
                          </div>
                    </div>
                   
                 </div>

               </div>
            </div>
             </>
            ):null
        }
        </>
    )
}

export default ClientCaseTable;