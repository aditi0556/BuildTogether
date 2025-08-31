import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Navbar from "../Navbar";
import styled from "styled-components";
import Input from "./Input";
import Label from "@/components/ui/label";
export default function Register(){
    const navigate = useNavigate();
    const { id }=useParams();
    const [wrong,setWrong]=useState(false);
    const [error,setError]=useState(false);
    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        username:"",
        email:""
    });
    async function handleClick(event){
        event.preventDefault();
        try{
            const res = await axios.post(`/v1/events/user/register/${id}`,formData, {
              withCredentials: true,
            });
            console.log(res);
            if(res.status==200) navigate("/events");
        }catch(err){
            console.log(err);
        }
    }
    function handleChange(event){
        setFormData({...formData,[event.target.id]:event.target.value});
    }
    async function getAuthenticated(){
        try{
            const res=await axios.get(`/v1/events/register/${id}`,{withCredentials:true});
            console.log(res);
            setWrong(true);
        }
        catch(err){
            console.log(err);
            setWrong(false);
            navigate("/login");
        }
    }
    useEffect(()=>{
        getAuthenticated();
    },[]);
    return (
      <>
        <div className="fixed top-0 w-full z-50">
          <Navbar />
        </div>
        <div className="flex flex-col mx-10 mt-30 justify-center items-center ">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-mono font-bold">
            Register
          </h1>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-mono font-bol mt-5 font-bol">
            Enter Your Details:
          </h1>
          <div className="w-full max-w-4xl bg-gray-400 rounded-3xl mt-10 px-6 py-8">
            <form onSubmit={handleClick}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-xl mb-1">
                    First Name:
                  </label>
                  <input
                    className="w-full rounded-xl p-2.5 bg-gray-600 text-white h-10"
                    type="text"
                    required
                    id="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-xl mb-1">
                    Last Name:
                  </label>
                  <input
                    className="w-full rounded-xl p-2.5 bg-gray-600 text-white h-10"
                    type="text"
                    required
                    id="lastName"
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <label htmlFor="email" className="block text-xl mt-4 mb-1">
                Email:
              </label>
              <input
                className="w-full rounded-xl p-2.5 bg-gray-600 text-white h-10"
                type="email"
                required
                id="email"
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <label htmlFor="username" className="block text-xl mt-4 mb-1">
                Username:
              </label>
              <input
                className="w-full rounded-xl p-2.5 bg-gray-600 text-white h-10"
                type="text"
                onChange={handleChange}
                required
                id="username"
                placeholder="Enter your username"
              />

              <button
                className="w-full md:w-32 h-10 bg-blue-900 text-white rounded-xl mt-6 hover:bg-blue-950 transition"
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
