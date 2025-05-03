import { getProjects } from "@/api/ApiProject";
import ProjectItem from "@/components/ProjectItem";
import DeleteProjectModal from "@/components/projects/DeleteProjectModal";
import Spinner from "@/components/spinner/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const DashboardView = () => {
  const { data: user, isLoading: authLoading } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  if (isLoading && authLoading) return <Spinner></Spinner>;
  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black">Mis proyectos</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Maneja y administra tus proyectos
        </p>
        <nav className="my-5">
          <Link
            to={"/project/create"}
            className="bg-purple-600 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Nuevo proyecto
          </Link>
        </nav>
        {data.length ? (
          <ul role="list" className="space-y-5 border-gray-100 mt-10 bg-white ">
            {data.map((project) => (
              <ProjectItem
                project={project}
                userId={user._id}
                key={project._id}
              />
            ))}
          </ul>
        ) : (
          <p className="text-4xl font-bold mt-5">
            No hay proyectos disponibles
          </p>
        )}
        <DeleteProjectModal />
      </>
    );
};

export default DashboardView;
