import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
const TaskSchema = new Schema({
  title: String,
  desc: String,
  isChecked: Boolean,
});

const Task = model("Task", TaskSchema);

export default Task;
