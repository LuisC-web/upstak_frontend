import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/notes/note";
import { formatDate } from "@/utils/utils";
import Spinner from "../spinner/Spinner";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletNote } from "@/api/NoteApi";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

type NoteDetailProps = {
  note: Note;
};
function NoteDetail({ note }: NoteDetailProps) {
  const params = useParams();
  const projectId = params.projectId!;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const taskId = queryParams.get("viewTask")!;

  const { data, isLoading } = useAuth();
  const queryClient = useQueryClient();

  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);
  const { mutate } = useMutation({
    mutationFn: deletNote,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data?.msg);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });
  if (isLoading) return <Spinner />;
  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} por:{" "}
          <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500 ">{formatDate(note.createdAt)}</p>
      </div>
      {canDelete && (
        <button
          type="button"
          className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer rounded-sm transition-colors"
          onClick={() => mutate({ projectId, noteId: note._id, taskId })}
        >
          Eliminar
        </button>
      )}
    </div>
  );
}

export default NoteDetail;
