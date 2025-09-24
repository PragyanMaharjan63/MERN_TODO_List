import { X } from "lucide-react";
import AddTask from "./addTask";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";

type Task = {
  _id: number;
  title: string;
  desc: string;
  isChecked: boolean;
};

export default function Hero() {
  const [task, setTask] = useState<Task[]>([]);
  const [addTask, setAddTask] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const req = await fetch("http://localhost:3000/");
        const res = await req.json();
        setTask(res);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [addTask]);
  const ToggleChange = (id: number) => {
    setTask((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {addTask && <AddTask setAddTask={setAddTask} />}
      </AnimatePresence>

      <div className="flex flex-col justify-center items-center h-screen gap-8">
        <h1 className="font-bold text-4xl">Tasks</h1>
        <div className="flex flex-col gap-5">
          {task.map((task) => (
            <div
              key={task._id}
              className="flex gap-3 shadow-2xl ring-1 p-3 w-60 sm:w-90 rounded-lg ring-blue-600 bg-blue-200/30 items-center justify-between"
            >
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  checked={task.isChecked}
                  onClick={() => ToggleChange(task._id)}
                />
                <div>
                  <p className="font-medium text-lg">{task.title}</p>
                  <p className="text-sm">{task.desc} </p>
                </div>
              </div>
              <X />
            </div>
          ))}
        </div>
        <p
          className=" bg-blue-700/20 ring-1 ring-blue-700 hover:bg-blue-700 hover:text-white cursor-pointer p-3 rounded-md"
          onClick={() => setAddTask(true)}
        >
          + Add Task
        </p>
      </div>
    </>
  );
}
