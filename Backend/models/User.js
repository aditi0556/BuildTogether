import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"
const Schema=mongoose.Schema;
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
});
userSchema.plugin(passportLocalMongoose);
export default mongoose.model("User", userSchema);