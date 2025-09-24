import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Task from "./model.js";
const port = 3000;
const URI = "mongodb://localhost:27017/TasksMERN";
const app = express();
app.use(cors());
app.use(express.json());

try {
  const conn = mongoose.connect(URI);
  if (conn) console.log("Connected to database succesfully");
} catch (err) {
  console.log(err);
}
app.get("/", async (req, res) => {
  const Tasks = await Task.find();
  res.json(Tasks);
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { isChecked: req.body.isChecked },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    console.log(err);
  }
});

app.post("/tasks", (req, res) => {
  //   console.log(req.body);
  if (req.body.Title !== "" && req.body.Description !== "") {
    const InputTask = new Task({
      title: req.body.Title,
      desc: req.body.Description,
      isChecked: false,
    });
    InputTask.save();
    res.json({ status: "ok" });
  } else {
    res.json({ status: "Something went wrong" });
  }
});

app.delete("/tasks/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const toDelete = await Task.findByIdAndDelete(id);
    res.json(toDelete);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log("listening to port", port);
});
