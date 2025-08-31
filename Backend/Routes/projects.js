import express from "express";
import multer from "multer";
import Project from "../models/Project.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js"
import { uploadToCloudinary } from "../cloudConfig.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();
router.post(
  "/upload/:id",
  upload.fields([
    { name: "images", maxCount: 2 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    const {id}=req.params;
    console.log(req.user._id);
    const user_id=req.user._id;
    console.log(user_id);
    try {
      if (!req.files || (!req.files.images && !req.files.video)) {
        return res.status(400).send("No files uploaded.");
      }
      const { projectName, desc, repoLink } = req.body;
      console.log(projectName, desc, repoLink);
      const files = [...(req.files.images || []), ...(req.files.video || [])];
      const uploadResults = [];
      const videoResults=[];
      for (const file of files) {
        const localPath = file.path;
        const result = await uploadToCloudinary(localPath);
        if(result.resource_type=="video")
          videoResults.push(result);
        else {
          uploadResults.push({
            url:result.url,
            filename:result.original_filename,
          });
        }
      }
      const project=new Project({
        projectName,
        desc,
        repoLink,
        video:{
          url:videoResults[0].url,
          filename:videoResults[0].original_filename,
        },
        images:uploadResults,
        userId:user_id,
        eventId:id,
        });
        try {
          await project.save();
          return res.send(project);
        } catch (err) {
          console.error("Save error:", err);
          return res.status(500).send("Error saving project");
        }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error uploading files");
    }
  }
);

router.get("/getDetails/:id",ensureAuthenticated,async(req,res)=>{
  const {id}=req.params;
  const userId=req.user._id;
  try{
    const response=await Project.findOne({userId:userId,eventId:id});
    if(response) return res.status(200).json(response);
    else return res.status(404).json({ error: "User does not have a submission" });
  }
  catch(err){
    return res.status(404).json({error:"Error"});
  }
})
router.get("/details/:id", async (req, res) => {
  const { id}=req.params;
  try {
    const response = await Project.findById(id);
    if (response) return res.status(200).json(response);
    else
      return res.status(404).json({ error: "Not Found" });
  } catch (err) {
    return res.status(404).json({ error: "Error" });
  }
});
export default router;


router.get("/all",async(req,res)=>{
  try{
    const response=await Project.find();
    return res.send(response);
  }
  catch(err){
    return res.status(404).json({error:"Error"});
  }
})