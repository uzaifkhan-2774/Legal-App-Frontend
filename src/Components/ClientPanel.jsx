const ClientPanel = ({ caseData }) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center p-5">
        <h1 className="text-lg font-serif text-gray-800 font-bold p2">
          Client Dashboard
        </h1>
        <button className="bg-blue-500 text-gray-300 text-sm ps-2 pe-2 py-1 rounded-sm">
          Create Case
        </button>
      </div>
      <div className="flex flex-col  gap-5 lg:flex-row lg:p-5">
        <div className=" w-11/12 bg-gray-50 rounded-sm shadow-lg m-auto ">
          <div className="flex gap-5 justify-start items-center  p-2 m-2">
            <div className="bg-gray-300 rounded-lg">
              <i className="fa-solid fa-user-group text-3xl text-gray-400 m-2"></i>
            </div>
            <div className="flex flex-col">
              <p className="text-xl font-bold text-gray-900 ">
                {caseData?.length}
              </p>
              <h5 className="text-sm font-semibold text-gray-400 mb-1">
                Total Cases
              </h5>
            </div>
          </div>
        </div>

          <div className=" w-11/12 bg-gray-50 rounded-sm shadow-lg m-auto ">
          <div className="flex gap-5 justify-start items-center  p-2 m-2">
            <div className="bg-gray-300 rounded-lg">
              <i className="fa-regular fa-clock text-3xl text-yellow-400 m-2"></i>
            </div>
            <div className="flex flex-col">
              <p className="text-xl font-bold text-gray-900 ">
                {caseData?.filter((c)=> c.Status === "NEW").length}
              </p>
              <h5 className="text-sm font-semibold text-gray-400 mb-1">
                New Cases
              </h5>
            </div>
          </div>
        </div>

          <div className=" w-11/12 bg-gray-50 rounded-sm shadow-lg m-auto ">
          <div className="flex gap-5 justify-start items-center  p-2 m-2">
            <div className="bg-gray-300 rounded-lg">
              <i className="fa-regular fa-circle-check text-3xl text-green-400 m-2"></i>
            </div>
            <div className="flex flex-col">
              <p className="text-xl font-bold text-gray-900 ">
                {caseData?.filter((c)=> c.Status === "COMPLETED").length}
              </p>
              <h5 className="text-sm font-semibold text-gray-400 mb-1">
                Comepleted Cases
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientPanel;
