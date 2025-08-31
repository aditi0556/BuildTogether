import mongoose, { mongo } from "mongoose";
import User from"./User.js"
const Schema=mongoose.Schema;
const newTopics=new Schema({name:String});
const mentorSchema=new Schema({name:String,org:String});
const eventSchema = new Schema({
  topics: [newTopics],
  title: String,
  prizeMoney: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  registrationStartDate: {
    type: Date,
    required: true,
  },
  registrationEndDate: {
    type: Date,
    required: true,
  },
  mentors:{
    type:[mentorSchema],
  },
  registeredUsers:[{type:Schema.Types.ObjectId,ref:User}],
  image:String,
  desc: String,
});
export default mongoose.model("Event",eventSchema);

