import { useForm } from "react-hook-form";
import ProjectForm from "./projects/ProjectForm";
import { ProjectFormData } from "@/types";
import { createProject, updateProjectById } from "@/api/ApiProject";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Spinner from "./spinner/Spinner";

type FormDataProps = {
  edit: boolean;
  data?: ProjectFormData;
  projectId: string;
};

const Form = ({ edit, data, projectId }: FormDataProps) => {
  const initialValue = {
    projectName: data?.projectName ?? "",
    clienteName: data?.clienteName ?? "",
    description: data?.description ?? "",
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({ defaultValues: initialValue });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: ProjectFormData) => {
      if (edit) {
        return updateProjectById({ projectId, data: formData });
      } else {
        return createProject(formData);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      if (edit) {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        queryClient.invalidateQueries({
          queryKey: ["editProject", projectId],
        });
      }
      toast.success(response.msg || "Operación exitosa");
      navigate("/");
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    mutate(formData);
  };

  if (isPending) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      noValidate
      className="mt-10 bg-white p-5 shadow-lg"
    >
      <ProjectForm register={register} errors={errors} />
      <input
        type="submit"
        value={edit ? "Editar proyecto" : "Crear Proyecto"}
        className="bg-fuchsia-600 font-bold uppercase p-3 w-full text-white cursor-pointer transition-colors rounded-lg hover:bg-fuchsia-500"
      />
    </form>
  );
};

export default Form;
