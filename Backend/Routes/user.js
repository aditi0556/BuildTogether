import express from "express";
import User from "../models/User.js";
import wrapAsync from "../utils/wrapAsync.js";
import passport from "passport";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";
const route = express.Router();

route.get("/getid",ensureAuthenticated,async(req,res)=>{
  try{
    return res.send(req.user._id);
  }
  catch{
    return res.send(404).json({error:"user does not exist"});
  }
})

route.get("/checkauth", (req, res) => {
  res.send(req.isAuthenticated());
  console.log(req.isAuthenticated());
});

route.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.send("succesfull");
    })
}
)

route.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    console.log(req.isAuthenticated());
    res.send("Welcome! You are loggedin");
  }
);

route.post(
  "/signup",
  async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;
    try {
      const newUser = new User({ username, firstName, lastName, email });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
      });
      res.status(201).json({ message: "Signed In" });
    } catch (err) {
      if (err.name === "UserExistsError") {
        return res.status(400).json({ error: "Username already exists" });
      } else if (err.keyPattern.email)
        return res.status(400).json({ error: "Email id already in use" });
      else return res.status(500).json({ error: "Internal server error" });
    }
  }
);

route.get("/", (req, res) => {
  res.send("Working");
});
export default route;
