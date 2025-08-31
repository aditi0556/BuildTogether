import mongoose, { mongo } from "mongoose";
import User from "./User.js";
import Event from "./Event.js";
const schema=mongoose.Schema;
const projectSchema=new schema({
    projectName:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        minLength:20,
        required:true,
    },
    repoLink:{
        type:String,
        required:true,
    },
    video:{
        url:String,
        filename:String,
    },
    images:{
        type:[{
            url:String,
            filename:String,
        }]
    },
    userId:{type:schema.Types.ObjectId,ref:User},
    eventId:{type:schema.Types.ObjectId,ref:Event},

});
export default mongoose.model("Project",projectSchema);