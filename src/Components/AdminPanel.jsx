

const AdminPanel = ({KPI_INFO})=>{
    return(
        <> 
        <h1 className="text-lg font-serif font-bold text-gray-900 p-2">Admin Dashboard</h1>
        <div className="flex flex-col gap-5 lg:flex-row lg:p-5">
            {/* total card */}

            <div className="w-11/12 shadow-lg bg-gray-50 m-auto rounded-sm">
                <div className="flex flex-row gap-5 justify-start items-center m-2 p-2 ">
                    <div className="bg-gray-300 rounded-lg ">
                        <i className="fa-solid fa-user-group text-3xl text-gray-400 m-2 "></i>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xl font-bold text-gray-900 ">{KPI_INFO.total}</p>
                        <h4 className="text-sm font-semibold text-gray-400 ">Total Lawyer</h4>
                    </div>
                </div>
              </div>
                  {/* approved card */}
                   <div className="w-11/12 shadow-lg bg-gray-50 m-auto rounded-sm">
                <div className="flex flex-row gap-5 justify-start items-center m-2 p-2 ">
                    <div className="bg-gray-300 rounded-lg ">
                        <i className="fa-regular fa-circle-check text-3xl text-green-400 m-2 "></i>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xl font-bold text-gray-900 ">{KPI_INFO.approaved}</p>
                        <h4 className="text-sm font-semibold text-gray-400 ">Approved</h4>
                    </div>
                </div>
              </div>
          
                     {/* pending */}

               <div className="w-11/12 shadow-lg bg-gray-50 m-auto rounded-sm">
                <div className="flex flex-row gap-5 justify-start items-center m-2 p-2 ">
                    <div className="bg-gray-300 rounded-lg ">
                        <i className="fa-regular fa-clock text-3xl text-yellow-400 m-2 "></i>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xl font-bold text-gray-900 ">{KPI_INFO.pending}</p>
                        <h4 className="text-sm font-semibold text-gray-400 ">Pending</h4>
                    </div>
                </div>
              </div>
                       {/* blocked */}
               <div className="w-11/12 shadow-lg bg-gray-50 m-auto rounded-sm">
                <div className="flex flex-row gap-5 justify-start items-center m-2 p-2 ">
                    <div className="bg-gray-300 rounded-lg ">
                        <i className="fa-solid fa-triangle-exclamation text-3xl text-red-400 m-2 "></i>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xl font-bold text-gray-900 ">{KPI_INFO.blocked}</p>
                        <h4 className="text-sm font-semibold text-gray-400 ">Blocked</h4>
                    </div>
                </div>
              </div>

        </div>
        </>
    )
}

export default AdminPanel;
