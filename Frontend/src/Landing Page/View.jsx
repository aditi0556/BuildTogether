import axios from "axios";
import Navbar from "./Navbar";
import { useParams } from "react-router";
import {useState,useEffect} from "react";
import Carousel from "@/components/ui/carousel";
export default function View(){
    const {id}=useParams();
    const [desc, setDesc] = useState();
    const [projectName, setProjectName] = useState();
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState();
    const [eventName,setEventName]=useState();
    const[repoLink,setRepoLink]=useState();
    const [video, setVideo] = useState();    
    async function getData(){
        try {
          setLoading(true);
          const response = await axios.get(`/v1/project/details/${id}`);
          setDesc(response.data.desc);
          setProjectName(response.data.projectName);
          setVideo(response.data.video);
          setImages(response.data.images);
          setRepoLink(response.data.repoLink);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
    }
    useEffect(()=>{
        getData();
    },[]);
    if (loading) {
      return <div>Loading project details...</div>;
    }
    const slideData = images.map((e, index) => ({
      src: e.url,
      type: "image",
    }));
    slideData.push({ src: video.url, type: "video", button: "Pause" });
   return (
       <div className="flex flex-col max-w-screen justify-center mx-5">
         <div className="fixed top-0 left-0 z-50 w-screen">
           <Navbar className="fixed top-0  w-full z-50 left-0" />
         </div>
         <h1 className="text-xl md:text-2xl lg:text-6xl font-bold mb-8 text-center mt-25">
           {projectName}
         </h1>
         <div className="relative overflow-hidden w-full h-full py-20 ">
           <Carousel slides={slideData} />
         </div>
         <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 font-serif mt-5 mx-8">
           About The Project
         </h2>
         <div className="flex flex-row  justify-center text-black w-full md:w-2/3 lg:w-1/2">
           <div
             className=" md:w-[80%] lg:w-2xl lg:h-2xl h-auto
    rounded-2xl mx-5"
           >
             <p className="text-base md:text-md lg:text-lg font-mono px-2.5 mb-2 wrap-break-word">
               {desc}
             </p>
           </div>
             {/* <div className="flex flex-col w-80 h-20 border-2 ">
               <p>Created At:</p>
               <h1>{eventName}</h1>
           </div> */}
         </div>
         <a href={repoLink}>
           <button className="w-30 h-12 rounded-xl hover:bg-blue-900  mx-10 bg-blue-800 text-white">
             Source Code
           </button>
         </a>
       </div>
     );
   }