import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Answers from './Landing Page/Events/Answers'
import './index.css'
import Home from "./Landing Page/Home.jsx"
import Signup from './Landing Page/Login/Signup'
import Login from './Landing Page/Login/Login'
import Event from './Landing Page/Events/Event'
import Desc from './Landing Page/Events/Desc'
import Register from "./Landing Page/Events/Register.jsx"
import Participate from "./Landing Page/Events/Participate.jsx"
import Submit from "./Landing Page/Events/Submit.jsx";
import View from './Landing Page/View'
import Showcase from './Landing Page/Showcase'
import { BrowserRouter,Routes,Route } from 'react-router'
import Error from './Landing Page/Events/Error'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Event />} />
        <Route path="/events/desc/:id" element={<Desc />} />
        <Route path="/events/:id/register" element={<Register />} />
        <Route path="/submit/:id" element={<Participate />} />
        <Route path="/submit/soln/:id" element={<Submit />} />
        <Route path="/answers/:id" element={<Answers />} />
        <Route path="/showcase" element={<Showcase/>} />
        <Route path="/view/:id" element={<View/>}/>
        <Route path="/error" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
