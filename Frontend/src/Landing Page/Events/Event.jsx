import { useState,useEffect } from "react";
import Footer from "../Footer";
import { AuroraText } from "@/components/magicui/aurora-text";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
export default function Event() {
  const [getId,setGetId]=useState("");
  async function getTheId(){
    try{
      const res=await axios.get("/v1/users/getid");
      setGetId(res.data);
    }catch(err){
      console.log(err);
    }
  }
  const navigate=useNavigate();
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const da= date.getDate();
    return da;
  }
  function formatDay(dateStr){
    const date=new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      timeZone: "Asia/Kolkata",
    });
  }
  function formYear(dateStr){
    const date=new Date(dateStr);
    return date.getFullYear();
  }
  function formMonth(dateStr){
    const date=new Date(dateStr);
    return date.toLocaleString("default", { month: "long" });
  }
  const [wrong, setWrong] = useState(false);
  const [data, setData] = useState([]);
  const [upcoming,setUpcoming]=useState([]);
  const [on, setOn] = useState([]);
  async function getData() {
    try {
      const res = await axios.get("/v1/events/display");
      console.log(res);
      setData(res.data);
      const now=new Date();
      const up=(res.data).filter((event)=>{
        const date=new Date(event.startDate);
        return date>=now;
      })
      const ongoing = res.data.filter((event) => {
        const date = new Date(event.startDate);
        const endDate=new Date(event.endDate);
        return (date<=now && endDate>=now);
      });
      setUpcoming(up);
      setOn(ongoing);
    } catch (err) {
      console.log(err);
      setWrong(() => true);
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      getData();
    }, 600000);
    getData();
    getTheId();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <div className="fixed top-0 left-0 z-50 w-screen">
          <Navbar className="fixed top-0  w-full z-50 left-0" />
        </div>
        <div className="flex flex-col justify-center items-center mt-30 flex-grow w-full px-4">
          <AuroraText
            speed={1}
            className="text-xl font-bold tracking-tighter md:text-3xl lg:text-6xl mb-8"
          >
            Upcoming Events <span className="text-sm">{upcoming.length}</span>
          </AuroraText>
          {upcoming &&
            upcoming.map((event, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col cursor-pointer hover:scale-102 transition-transform duration-300  w-full max-w-6xl h-70 rounded-2xl mb-8 overflow-hidden
                  bg-[linear-gradient(to_right,rgba(0,0,0,0.6)_40%,rgba(0,0,0,0)_60%),url('https://images.unsplash.com/photo-1669052700037-db884b37b2d9?q=80&w=1054&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"
                >
                  <div className="flex flex-col items-center justify-center w-25 h-20 py-4 mx-15 bg-white text-black font-bold rounded-b-2xl">
                    <h1 className="text-base">{formMonth(event.startDate)}</h1>
                    <h1 className="text-2xl font-extrabold">
                      {formatDate(event.startDate).toString().padStart(2, "0")}
                    </h1>
                    <h1 className="text-sm">{formatDay(event.startDate)}</h1>
                  </div>

                  <h2 className="mx-15 mt-5 font-semibold text-3xl text-white font-mono">
                    {event.title}
                  </h2>
                  {(!getId || !event.registeredUsers.includes(getId)) && (
                    <button
                      className="cursor-pointer hover:bg-yellow-300 transition-colors duration-175 w-35 px-3.0 h-9 my-10 font-bold mx-15 bg-yellow-400 rounded-2xl"
                      onClick={() => navigate(`/events/desc/${event._id}`)}
                    >
                      Apply Now!
                    </button>
                  )}
                  {getId && event.registeredUsers.includes(getId) && (
                    <button
                      className="cursor-pointe bg-yellow-900 transition-colors duration-175 w-35 px-3.0 h-9 my-10 font-bold mx-15  rounded-2xl"
                      onClick={() => navigate(`/events/desc/${event._id}`)}
                    >
                      Registered!
                    </button>
                  )}
                </div>
              );
            })}
        </div>
        <div className="flex flex-col justify-center items-center mt-30 flex-grow w-full px-4">
          <AuroraText
            speed={1}
            className="text-xl font-bold tracking-tighter md:text-3xl lg:text-6xl mb-8"
          >
            Ongoing Events <span className="text-sm">{upcoming.length}</span>
          </AuroraText>
          {on &&
            on.map((event, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col cursor-pointer hover:scale-102 transition-transform duration-300  w-full max-w-6xl h-70 rounded-2xl mb-8 overflow-hidden
                  bg-[linear-gradient(to_right,rgba(0,0,0,0.6)_40%,rgba(0,0,0,0)_60%),url('https://images.unsplash.com/photo-1669052700037-db884b37b2d9?q=80&w=1054&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"
                >
                  <div className="flex flex-col items-center justify-center w-25 h-20 py-4 mx-15 bg-white text-black font-bold rounded-b-2xl">
                    <h1 className="text-base">{formMonth(event.startDate)}</h1>
                    <h1 className="text-2xl font-extrabold">
                      {formatDate(event.startDate).toString().padStart(2, "0")}
                    </h1>
                    <h1 className="text-sm">{formatDay(event.startDate)}</h1>
                  </div>

                  <h2 className="mx-15 mt-5 font-semibold text-3xl text-white font-mono">
                    {event.title}
                  </h2>
                  {getId == "" && (
                    <button
                      className="cursor-pointe hover:bg-yellow-200 bg-yellow-400 transition-colors duration-175 w-35 px-3.0 h-9 my-10 font-bold mx-15  rounded-2xl"
                      onClick={() => navigate("/login")}
                    >
                      Participate!
                    </button>
                  )}
                  {getId != "" && event.registeredUsers.includes(getId) && (
                    <button
                      className="cursor-pointe bg-yellow-700 hover:bg-yellow-600 transition-colors duration-175 w-35 px-3.0 h-9 my-10 font-bold mx-15  rounded-2xl"
                      onClick={() => navigate(`/submit/${event._id}`)}
                    >
                      Participate
                    </button>
                  )}
                  {getId != "" && !event.registeredUsers.includes(getId) && (
                    <>
                      <button
                        className=" bg-yellow-950 transition-colors duration-175 w-35 px-3.0 h-9 mt-10 font-bold mx-15  rounded-2xl"
                        onClick={() => navigate(`/events/${event._id}/register`)}
                      >
                        Participate!
                      </button>
                      <p className="text-white mx-15 my-2.5">
                        You have not registered for this event!!
                      </p>
                    </>
                  )}
                </div>
              );
            })}
        </div>
        <div className="flex flex-col justify-center items-center mt-10 flex-grow w-full px-4">
          <h1 className="md:text-3xl lg:text-6xl mb-8 font-serif">
            Past Events
          </h1>
        </div>
        <Footer className="w-screen" />
      </div>
    </>
  );
}
