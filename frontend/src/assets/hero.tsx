import { X } from "lucide-react";
import AddTask from "./addTask";

export default function Hero() {
  const test = [
    {
      id: 1,
      title: "task title",
      desc: "g desc",
      isChecked: true,
    },
    {
      id: 2,
      title: "task title 1",
      desc: "task desc 2",
      isChecked: false,
    },
    {
      id: 3,
      title: "task title 1",
      desc: "task desc 2",
      isChecked: false,
    },
    {
      id: 4,
      title: "task title 1",
      desc: "task desc 2",
      isChecked: false,
    },
    {
      id: 5,
      title: "task title 1",
      desc: "task desc 2",
      isChecked: false,
    },
  ];
  return (
    <>
      <AddTask />

      <div className="flex flex-col justify-center items-center h-screen gap-8">
        <h1 className="font-bold text-4xl">Tasks</h1>
        <div className="flex flex-col gap-5">
          {test.map((task) => (
            <div
              key={task.id}
              className="flex gap-3 shadow-2xl ring-1 p-3 w-60 sm:w-90 rounded-lg ring-blue-600 bg-blue-200/30 items-center justify-between"
            >
              <div className="flex gap-3">
                <input type="checkbox" checked={task.isChecked} />
                <div>
                  <p className="font-medium text-lg">{task.title}</p>
                  <p className="text-sm">{task.desc} </p>
                </div>
              </div>
              <X />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
