import Navbar from "./Navbar";
import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router";
import Carousel from "@/components/ui/carousel";
export default function Showcase() {
    const navigate=useNavigate();
    const [data,setData]=useState([]);
    async function getData(){
        try{
            const res=await axios.get("/v1/project/all");
            setData(res.data);
            console.log(res.data);
        } 
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getData();
    },[]);
  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-screen">
        <Navbar className="fixed top-0  w-full z-50 left-0" />
      </div>
      <div className="md:text-3xl lg:text-5xl mt-30 font-bold text-center font-sans">
        Find A Project
      </div>
      <div className="flex flex-col md:flex-row flex-wrap gap-8 px-4 md:px-10 lg:px-20  mt-20">
        {data && data.length > 0 ? (
          data.map((event) => (
            <div
              key={event._id}
              className="max-w-100 bg-white border-2 rounded-xl overflow-hidden cursor-pointer "
              onClick={() => navigate(`/view/${event._id}`)}
            >
              <img
                src={event.images[0].url}
                alt={event.projectName}
                className="w-full h-50 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black ">
                  {event.projectName}
                </h3>
                <p className="mt-2 text-sm text-black line-clamp-3">
                  {event.desc || "No description provided."}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-20">
            No projects available.
          </div>
        )}
      </div>
    </>
  );
}
