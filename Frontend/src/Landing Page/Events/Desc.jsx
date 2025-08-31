import { useParams } from "react-router";
import { useEffect,useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router";
import axios from "axios";
import { Button } from "@/components/ui/moving-border";
export default function Desc() {
  const [getId, setGetId] = useState("");
  async function getTheId() {
    try {
      const res = await axios.get("/v1/users/getid");
      setGetId(res.data);
    } catch (err) {
      console.log(err);
    }
  }
    const navigate=useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();

  async function getData() {
    try {
      const res = await axios.get(`/v1/events/desc/${id}`);
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      navigate("/error");
    }
  }

  useEffect(() => {
    getData();
    getTheId();
  }, []);

  return (
    <>
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="flex flex-col px-4 md:px-12 lg:px-32 pt-24">
        <h1 className="text-xl md:text-3xl lg:text-6xl font-bold mb-8 text-center my-10">
          {data.title}
        </h1>

        <div className="flex flex-col lg:flex-row items-start gap-20 mt-20">
          <img
            src={data.image}
            alt="Event"
            className="rounded-3xl w-3/4 md:w-md lg:w-xl h-auto "
          />

          <div className="flex flex-col justify-center text-black w-full md:w-2/3 lg:w-1/2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
              About The Event
            </h2>
            <p className="text-base md:text-lg lg:text-xl font-mono ">
              {data.desc}
            </p>
            {getId && !data.registeredUsers?.includes?.(getId) && (
              <button
                className="w-30 h-10 px-2.5 my-2.5 hover:scale-105 transition-transform duration-300 text-xl text-bold bg-blue-950 text-white rounded-xl"
                onClick={() => navigate(`/events/${id}/register`)}
              >
                Register!
              </button>
            )}
            {getId &&
              data.registeredUsers?.includes?.(getId) && (
                <button className="w-30 h-10 px-2.5 my-2.5  transition-transform duration-300 text-xl text-bold bg-blue-950 text-white rounded-xl">
                  Registered!
                </button>
              )}
          </div>
        </div>
        <div className="flex flex-col mt-20">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Theme And Topics
          </h1>
          <div className="flex flex-row flex-wrap mt-10 mb-20 w-full md:w-1/2 lg:w-3/4">
            {data.topics?.map((top, id) => {
              return (
                <button
                  key={id}
                  className="bg-amber-400 px-5 h-10 mx-2.5  text-xl rounded-2xl w-auto "
                >
                  {top.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-center mt-20">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Mentors
          </h1>
          <div className="flex flex-row justify-center items-center flex-wrap mt-10 mb-20 w-full md:w-1/2 lg:w-3/4">
            {data.mentors?.map((top, id) => {
              return (
                <div
                  key={id}
                  className="flex flex-col justify-center items-center border-2 px-4 py-3 w-full sm:w-[11rem] md:w-[12rem] lg:w-[15rem] mx-2 rounded-2xl bg-yellow-600 shadow-sm"
                >
                  <h1 className="text-base sm:text-lg font-semibold text-white">
                    {top.name}
                  </h1>
                  <p className="text-sm sm:text-base text-white">{top.org}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}