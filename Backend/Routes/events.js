import express from "express"
import Event from "../models/Event.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";
const route = express.Router();

route.post("/user/register/:id", ensureAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (!event.registeredUsers.includes(req.user._id)) {
      event.registeredUsers.push(req.user._id);
      await event.save();
      console.log(event.registeredUsers);
      return res.status(200).json("working");
    } else {
      return res.status(400).json({ error: "User is already registered" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

route.get("/display",async (req,res)=>{
    try{
        const data=await Event.find();
        res.send(data);
    console.log(data);
    return data;
    }catch{
        return res.status(404).json({error:"Error in getting data"});
    }
})
route.get("/register/:id", async (req, res) => {
  try {
    console.log(req.isAuthenticated());
    if(!req.isAuthenticated()) return res.status(400).json({error:"Not login"});
    // const id=req.params;
    // const res=await Event.findByIdAndUpdate()
    return res.send("working");
  } catch (err) {
    return res.status(404).json({ error: "Server error" });
  }
});

route.get("/desc/:id",async (req,res)=>{
    const id=req.params.id;
    try{
        const data=await Event.findById(id);
        return res.send(data);
    }catch(err){
        console.log(err);
        return res.status(404).json({ error: "Server error" });
    }
})

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Event.findOne({ _id: id });
    if (response) return res.status(200).json(response);
    else return res.status(404).json({ error: "No such event" });
  } catch (err) {
    console.log(err);
    return res.status(404).send({ error: "Error" });
  }
});
export default route;