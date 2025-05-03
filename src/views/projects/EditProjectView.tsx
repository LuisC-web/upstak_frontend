import { getProjectById } from "@/api/ApiProject";
import Form from "@/components/Form";
import Spinner from "@/components/spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditProjectView = () => {
  const { projectId } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId!),
  });
  if (isLoading) return <Spinner></Spinner>;
  if (isError) {
    toast.error(error.message);

    return <Navigate to="/404"></Navigate>;
  }
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-black">Editar un proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Llena el siguiente formulario para editar el proyecto
      </p>
      <nav className="my-5">
        <Link
          to={"/"}
          className="bg-purple-600 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors w-full"
        >
          Volver a proyecto
        </Link>
      </nav>
      <Form edit={true} data={data} projectId={projectId!}></Form>
    </div>
  );
};
export default EditProjectView;
