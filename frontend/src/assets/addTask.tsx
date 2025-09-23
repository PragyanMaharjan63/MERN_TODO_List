import { useForm, type SubmitHandler } from "react-hook-form";
import { X } from "lucide-react";

type Inputs = {
  Title: string;
  Description: string;
};

export default function AddTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-70 h-screen w-screen"
    >
      <div className="flex flex-col gap-3 shadow-2xl ring-1 px-3 py-2 sm:px-10 sm:py-5 w-60 sm:w-90 scale-110 rounded-lg ring-blue-600 bg-blue-100">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Add Task</p>
          <X />
        </div>
        <div className="flex flex-col">
          <fieldset className="ring-1 rounded-md">
            <legend className="bg-blue-100 translate-x-3">Enter Title</legend>
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
            <legend className="bg-blue-100 translate-x-3">
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
            type="submit"
            value="Add Task"
            className="my-5 bg-blue-700/20 ring-1 ring-blue-700 hover:bg-blue-700 hover:text-white cursor-pointer p-3 rounded-md"
          />
        </div>
      </div>
    </form>
  );
}
