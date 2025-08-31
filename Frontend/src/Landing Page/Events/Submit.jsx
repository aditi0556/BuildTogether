import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

import Button from "./Button";
export default function Submit() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [loader,setLoader]=useState(false); 
  const [formData, setFormData] = useState({
    projectName: "",
    desc: "",
    repoLink: "",
  });
  function onVideoChange(event) {
    setVideoFile(event.target.files[0]);
  }

  function onImageChange(event) {
    setImageFiles((prev) => [...prev, event.target.files[0]]);
  }
  function onChange(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("projectName", formData.projectName);
    data.append("desc", formData.desc);
    data.append("repoLink", formData.repoLink);
    console.log(data);
    imageFiles.forEach((file) => data.append("images", file));
    if (videoFile) data.append("video", videoFile);
    try {
      const res = await axios.post(`/v1/project/upload/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      navigate(`/submit/${id}`);
    } catch (err) {
      console.error(err);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }
  if(loading==true){
    return <p>Submitting</p>;
    loading(false);
  }
  return (
    <>
      <div className=" min-h-screen w-screen">
        <div className="flex flex-col justify-center items-center mx-2.5 ">
          <h1 className="text-6xl text-black font-bold  my-10">
            Add Your Submission
          </h1>
          <form
            encType="multipart/form-data"
            method="post"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="projectName"
              className="font-bold text-2xl text-black my-2.5"
            >
              Project Name: <br />
              <input
                required
                className=" text-lg text-black my-2.5 md:min-w-3xl sm:min-w-xl h-10 p-2.5  border-2 border-gray-300  rounded-xl"
                type="text"
                name="projectName"
                multiple
                placeholder="enter Project Name"
                onChange={onChange}
              />
            </label>
            <br />
            <label
              htmlFor="desc"
              className="font-bold text-black text-2xl my-2.5"
            >
              Description:
              <br />
              <textarea
                required
                name="desc"
                type="text"
                placeholder="enter description"
                onChange={onChange}
                className="  border-gray-300 my-2.5  text-lg p-2.5 resize-none text-black md:min-w-3xl sm:min-w-2xl h-50  border-2 rounded-2xl"
              ></textarea>
            </label>
            <br />
            <label
              htmlFor="repoLink"
              className="font-bold text-2xl text-black my-2.5"
            >
              Your Repo Link: <br />
              <input
                required
                className=" border-gray-300  text-lg text-black my-2.5 md:min-w-3xl sm:min-w-xl h-10 p-2.5 border-2 rounded-xl"
                type="text"
                name="repoLink"
                onChange={onChange}
                placeholder="enter your Repository link"
              />
            </label>
            <br />
            <label
              htmlFor="images"
              className="block font-semibold text-xl text-gray-800 mb-2"
            >
              Upload Images
            </label>
            <label
              htmlFor="images"
              className="block font-semibold text-xl text-gray-800 mb-2"
            ></label>
            <p className="text-sm text-gray-500 mt-1">Image 1</p>
            <input
              required
              name="images"
              id="images"
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="block w-full max-w-3xl text-base text-gray-700 bg-white border-2 border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label
              htmlFor="images"
              className="block font-semibold text-xl text-gray-800 mb-2"
            ></label>
            <p className="text-sm text-gray-500 mt-1">Image 2</p>
            <input
              required
              name="images"
              id="images"
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="block w-full max-w-3xl text-base text-gray-700 bg-white border-2 border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {/* <button className="w-35 bg-blue-900 text-xl rounded-xl h-10 hover:bg-blue-950 mt-5"
                onClick={() => document.getElementById("images").click()}
              >Add Images</button> */}
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: JPG, PNG, GIF.
            </p>
            <label
              htmlFor="images"
              className="block font-semibold text-xl text-gray-800 mb-2 mt-2"
            >
              Upload a Video
            </label>
            <input
              required
              name="video"
              id="video"
              type="file"
              accept="video/*"
              onChange={onVideoChange}
              className="block w-full max-w-3xl text-base text-gray-700 bg-white border-2 border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              className="cursor-pointer w-30 h-10 hover:scale-110 text-black bg-gray-600 border-2 rounded-2xl mt-4"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
