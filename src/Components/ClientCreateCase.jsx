import { useState, useRef } from "react";
import { Form, useForm } from "react-hook-form";
import ClientCase from "./ClientCase";
import { toast } from "react-toastify";
import Loader from "./Loader";
import axios from "axios";

const ClientCreateCase = ({ setSelectedPanel, fetchCases }) => {

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const FileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [caseModal, setCaseModal] = useState(false);
  const [loaderData, setLoaderData] = useState(false);
  const [caseData, setCaseData] = useState({});

  const handlebuttonClick = () => {
    FileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (files.length + selectedFiles.length > 2) {
      toast.error("you uplaod maximum 2 files only.");
      return;
    }

    // display file name.
    const filePreview = selectedFiles.map((file) => ({
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setFiles((prev) => [...prev, ...filePreview]);
  };

  // removing file option
  const removeFile = (index) => {
    const updatedfile = [...files];

    if (updatedfile[index].preview) {
      URL.revokeObjectURL(updatedfile[index].preview);
    }

    updatedfile.splice(index, 1);
    setFiles(updatedfile);
  };

  const submitData = async (data) => {

    setLoaderData(true);

    const formdata = new FormData();

    formdata.append("problemStatement", data.problemStatement);
    formdata.append("Location", data.location);
    formdata.append("caseDate", data.date);
    

    for (let i = 0; i < files.length; i++) {
      formdata.append("proofFile", files[i]);
    }
    

    try {
      const resposnse = await axios.post(
        "http://127.0.0.1:7000/client/CreateCase",
         formdata ,
        {
          validateStatus: () => true,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      let res = resposnse.data;

      if (res.success === true) {
        toast.success(res.message);
        setCaseData(res);
        setCaseModal(true);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoaderData(false);
    }
  };

  return (
    <>
      {!caseModal ? (
        <div className="p-6 w-full flex justify-center bg-gray-100">
          <div className=" w-full max-w-xl bg-white rounded-sm shadow-lg p-6">
            <h1 className="text-xl text-center text-gray-900 font-semibold font-serif">
              Create Case
            </h1>

            <form onSubmit={handleSubmit(submitData)} className="space-y-4">
              <div>
                <label
                  htmlFor="prob"
                  className="text-sm font-medium block mb-2"
                >
                  problem Statement{" "}
                  {errors.problemStatement && (
                    <span className="text-sm text-red-500">*</span>
                  )}
                </label>
                <textarea
                  type="text"
                  placeholder="Enter your legal case descriptions..."
                  id="prob"
                  className="w-full h-32 border rounded-sm p-3 focus:outline-0 focus:ring focus:ring-blue-500"
                  {...register("problemStatement", { required: true })}
                ></textarea>
              </div>
              <div className="flex justify-start gap-12">
                <div>
                  <label
                    htmlFor="location"
                    className=" w-full text-sm font-medium block mb-1"
                  >
                    Location{" "}
                    {errors.location && (
                      <span className="text-sm text-red-500">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="  p-2 border rounded-sm focus:outline-0 focus:ring focus:ring-blue-500"
                    {...register("location", { required: true })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className=" w-full text-sm font-medium block mb-1"
                  >
                    Date{" "}
                    {errors.date && (
                      <span className="text-sm text-red-500">*</span>
                    )}
                  </label>
                  <input
                    type="date"
                    id="date"
                    className=" p-2 border rounded-sm focus:outline-0 focus:ring focus:ring-blue-500"
                    {...register("date", { required: true })}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="proof" className="text-sm font-medium">
                  Proof Files (optional)
                </label>
                <div>
                  <input
                    id="proof"
                    className="hidden"
                    type="file"
                    ref={FileInputRef}
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    className="mt-1 px-2 py-1 text-white bg-blue-500 hover:bg-blue-600 text-sm rounded"
                    onClick={handlebuttonClick}
                  >
                    Upload Files
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {files.map((ele, index) => (
                    <div key={index} className="w-20 relative text-center">
                      <div className="w-15 h-15 border rounded-lg justify-center flex itmes-center bg-gray-100 mx-auto overflow-hidden">
                        {ele.preview ? (
                          <img
                            src={ele.preview}
                            alt="preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="3xl">📄</span>
                        )}
                      </div>
                      <button
                        className="absolute top-0 right-2 text-sm bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center"
                        onClick={() => {
                          removeFile(index);
                        }}
                      >
                        x
                      </button>
                      <p className="text-xs mt-1 truncate">{ele.file.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 py-2 hover:bg-blue-700 transition rounded-lg shadow text-white"
              >
                Submit & Analyze
              </button>
            </form>
          </div>
        </div>
      ) : (
        <ClientCase caseData={caseData} setSelectedPanel={setSelectedPanel} fetchCases={fetchCases} />
      )}
      {loaderData ? <Loader/> : null}
    </>
  );
};

export default ClientCreateCase;
