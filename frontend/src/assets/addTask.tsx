import { useForm, type SubmitHandler } from "react-hook-form";
import { X } from "lucide-react";
import { motion } from "motion/react";

type Inputs = {
  Title: string;
  Description: string;
};

type AddTaskProps = {
  setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddTask({ setAddTask }: AddTaskProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const task = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await task.text();
    console.log(res);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-70 h-screen w-screen transition-all"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex flex-col gap-3 shadow-2xl ring-1 px-3 py-2 sm:px-10 sm:py-5 w-60 sm:w-90 scale-110 rounded-lg ring-blue-600 bg-white"
      >
        {isSubmitting && <div>Loading...</div>}
        <div className="flex justify-between">
          <p className="text-xl font-bold">Add Task</p>
          <X onClick={() => setAddTask(false)} />
        </div>
        <div className="flex flex-col">
          <fieldset className="ring-1  rounded-md">
            <legend className="bg-white translate-x-3">Enter Title</legend>
            <input
              type="text"
              id="Title"
              className="px-2 pb-2 w-full outline-none"
              placeholder="Enter Task Title"
              {...register("Title", { required: true })}
            />
          </fieldset>
          {errors.Title && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex flex-col">
          <fieldset className="ring-1 rounded-md">
            <legend className="bg-white translate-x-3">
              Enter Description
            </legend>
            <input
              type="text"
              id="Description"
              className="px-2 pb-2 w-full outline-none"
              placeholder="Enter Task Description"
              {...register("Description", { required: true })}
            />
          </fieldset>
          <input
            disabled={isSubmitting}
            type="submit"
            value="Add Task"
            className="my-5 bg-blue-700/20 ring-1 ring-blue-700 hover:bg-blue-700 hover:text-white cursor-pointer p-3 rounded-md"
          />
        </div>
      </motion.div>
    </form>
  );
}
