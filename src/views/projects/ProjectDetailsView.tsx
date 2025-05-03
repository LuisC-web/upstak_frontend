import { getProjectById } from "@/api/ApiProject";
import Spinner from "@/components/spinner/Spinner";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProjectDetailsView = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { data: user, isLoading: authLoading } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId!),
  });

  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);
  if (isLoading && authLoading) return <Spinner></Spinner>;
  if (isError) {
    toast.error(error.message);
    return <Navigate to="/404"></Navigate>;
  }
  if (data && user)
    return (
      <div className="max-w-3xl mx-auto">
        <Link
          to={"/"}
          className="bg-purple-600 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors w-full"
        >
          Volver a proyectos
        </Link>
        <div className="mt-10">
          <h1 className="text-5xl font-black">{data?.projectName}</h1>
          <p className="text-2xl font-light text-gray-500 mt-5">
            {data?.description}
          </p>
          {isManager(data.manager, user._id) && (
            <nav className="my-5 flex gap-3">
              <button
                className="bg-purple-600 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors w-1-/2"
                onClick={() => navigate("?newTask=true")}
              >
                Agregar Tarea
              </button>
              <Link
                to={"team"}
                className="bg-fuchsia-600 hover:bg-fuchsia-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors w-1-/2"
              >
                Colabores
              </Link>
            </nav>
          )}
        </div>
        <TaskList tasks={data?.tasks} canEdit={canEdit}></TaskList>
        <AddTaskModal></AddTaskModal>
        <EditTaskData></EditTaskData>
        <TaskModalDetails></TaskModalDetails>
      </div>
    );
};

export default ProjectDetailsView;
