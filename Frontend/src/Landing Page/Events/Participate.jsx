import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../Navbar";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
export default function Participate() {
  const navigate=useNavigate();
  const [data, setData] = useState({});
  const [submit,setSubmit]=useState(false);
  const [printData,setPrintData]=useState([]);
  const { id } = useParams();
  async function checkEdit(){
    try{
      const res=await axios.get(`/v1/project/getDetails/${id}`);
      console.log(res);
      setPrintData(res.data);
      setSubmit(true);
    }catch(err){
      console.log(err);
      setSubmit(false);
    }
  }
  async function getData() {
    try {
      const res = await axios.get(`/v1/events/desc/${id}`);
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
    checkEdit();
  },[id]);
  if (!data.title) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-screen">
        <Navbar className="fixed top-0  w-full z-50 left-0" />
      </div>
      <div className="flex flex-col px-4 md:px-12 lg:px-32 pt-24">
        <h1 className="text-xl md:text-3xl lg:text-6xl font-bold mb-8 text-center my-10">
          {data.title}
        </h1>

        <div className="flex flex-col lg:flex-row items-start gap-20 mt-20">
          {data.image && (
            <img
              src={data.image}
              alt="Event"
              className="rounded-3xl w-3/4 md:w-md lg:w-xl h-auto "
            />
          )}

          <div className="flex flex-col justify-center text-black w-full md:w-2/3 lg:w-1/2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
              About The Event
            </h2>
            <p className="text-base md:text-lg lg:text-xl font-mono ">
              {data.desc}
            </p>
            {!submit && (
              <button
                className="w-30 h-10 px-2.5 my-2.5 hover:scale-105 transition-transform duration-300 text-xl text-bold bg-blue-950 text-white rounded-xl"
                onClick={() => navigate(`/submit/soln/${data._id}`)}
              >
                Submit!
              </button>
            )}
            {submit && (
              <>
                <div>
                  <button
                    className="w-30 h-10 px-2.5 my-2.5 hover:scale-105 transition-transform duration-300 text-xl text-bold bg-blue-950 text-white rounded-xl"
                    // onClick={() => navigate(`/submit/soln/${data._id}`)}
                  >
                    Edit!
                  </button>
                  <button
                    className="w-30 mx-2 h-10 px-2.5 my-2.5 hover:scale-105 transition-transform duration-300 text-xl text-bold bg-blue-950 text-white rounded-xl"
                    onClick={() => navigate(`/answers/${data._id}`)}
                  >
                    View
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
