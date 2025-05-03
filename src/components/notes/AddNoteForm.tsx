import { NoteFormData } from "@/types/notes/note";
import { useForm } from "react-hook-form";
import Errors from "../Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteApi";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

const initialValues: NoteFormData = {
  content: "",
};
function AddNoteForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: initialValues });
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      toast.success(data?.msg);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleAddNote = (formData: NoteFormData) => {
    mutate({ formData, projectId, taskId });
    reset();
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleAddNote)}>
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold">
          Crear nota
        </label>
        <input
          type="text"
          id="content"
          placeholder="Contenido de la nota"
          className="w-full p-3 border border-gray-300"
          {...register("content", {
            required: "Elcontenido de la nota es requerido",
          })}
        />
      </div>
      {errors.content && <Errors>{errors.content.message}</Errors>}
      <input
        type="submit"
        value="Crear nota"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white rounded-sm cursor-pointer"
      />
    </form>
  );
}

export default AddNoteForm;
