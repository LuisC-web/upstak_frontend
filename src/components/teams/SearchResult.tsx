import { addUserToProject } from "@/api/TeamApi";
import { TeamMember } from "@/types/teams";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
  user: TeamMember;
  reset: () => void;
};
function SearchResult({ user, reset }: SearchResultProps) {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.msg);
      reset();
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
      navigate(location.pathname, { replace: true });
    },
  });
  const handleAddUser = () => {
    mutate({ projectId, id: user._id });
  };
  return (
    <>
      <p className="mt-10 text-center font-bold ">Resultado:</p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button
          className="text-purple-600 hover:text-purple-100"
          onClick={handleAddUser}
        >
          Agregar al proyecto
        </button>
      </div>
    </>
  );
}

export default SearchResult;
