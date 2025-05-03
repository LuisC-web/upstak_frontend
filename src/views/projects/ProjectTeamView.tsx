import { getProjectTeam } from "@/api/TeamApi";
import AddMemberModal from "@/components/teams/AddMemberModal";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import MemberItem from "./MemberItem";
import Spinner from "@/components/spinner/Spinner";
import { useEffect } from "react";

function ProjectTeamView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const { isLoading, isError, data } = useQuery({
    queryKey: ["projectTeam", projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false,
  });
  useEffect(() => {
    if (isError) {
      navigate("/404");
    }
  }, [isError, navigate]);

  return (
    <>
      <h1 className="text-5xl font-black">Administrar eEquipo</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Administra el equipo de trabajo para este proyecto
      </p>
      <nav className="my-5 flex gap-3">
        <button
          className="bg-purple-600 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors w-1-/2"
          onClick={() => navigate("?addMember=true")}
        >
          Agregar Colabores
        </button>
        <Link
          to={"/project/" + projectId}
          className="bg-fuchsia-600 hover:bg-fuchsia-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors w-1-/2"
        >
          Volver a Proyecto
        </Link>
      </nav>
      <h2 className="text-5xl font-black my-10">Miembros actuales</h2>
      {isLoading ? (
        <Spinner />
      ) : data && data.length > 0 ? (
        <ul
          role="list"
          className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
        >
          {data.map((member) => (
            <MemberItem
              key={member._id}
              member={member}
              projectId={projectId}
            ></MemberItem>
          ))}
        </ul>
      ) : (
        <p className="text-center py-20">No hay miembros en este equipo</p>
      )}

      <AddMemberModal />
    </>
  );
}

export default ProjectTeamView;
