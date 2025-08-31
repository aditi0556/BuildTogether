import { useEffect,useState } from "react"
import { useNavigate } from "react-router";
import { CircleUser } from "lucide-react";
import axios from "axios";
import { CarTaxiFront } from "lucide-react";
export default function Navbar(){
  const navigate=useNavigate();
  const [state,setState]=useState(false);
  async function handleLogOut(){
    try{
      const res=await axios.get("/v1/users/logout");
      setState(false);
      navigate("/");
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    const checkauth=async ()=>{
      try{
        const res = await axios.get("/v1/users/checkauth",{withCredentials:true})
        console.log(res);
        setState(()=>res.data);
      }catch(err){
        console.log(err);
      }
    }
    checkauth();
  }, []);
    return (
      
        <div className="z-50 flex flex-row justify-start items-center font-semibold text-lg h-20 bg-gray-500 text-white border-b-black border-b-1">
          <h1 className="mx-3.5 hover:scale-110 hover:cursor-pointer" onClick={()=>navigate("/")}>Home</h1>
          <h1 className="mx-3.5 hover:scale-110 hover:cursor-pointer" onClick={()=>navigate("/showcase")}>
            Showcase
          </h1>
          <h1 className="mx-3.5 hover:scale-110 hover:cursor-pointer"
          onClick={ ()=>navigate("/events")}>
            Events
          </h1>
          <h1 className="mx-3.5 hover:scale-110 hover:cursor-pointer">About</h1>
          {!state && (
            <h1
              className="ml-auto mr-3.5 hover:scale-110 hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </h1>
          )}
          {state && (
            <h1
              className="ml-auto mr-5 hover:scale-110 hover:cursor-pointer"
              onClick={handleLogOut}
            >
              Log Out
            </h1>
          )}
        </div>
      
    );
}