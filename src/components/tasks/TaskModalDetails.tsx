import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskId, updateTaskStatus } from "@/api/TaskApi";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/utils";
import { statusTranslations } from "@/locale/es";
import { Task } from "@/types";
import NotesPanel from "../notes/NotesPanel";

export default function TaskModalDetails() {
  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;
  const show = taskId ? true : false;
  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskId({ projectId, taskId }),
    enabled: !!taskId,
    retry: false,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.msg);
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as Task["status"];

    const data = { projectId, taskId, status };
    mutate(data);
  };
  if (isError) {
    toast.error("Se produjo un error", { toastId: "error" });
    return <Navigate to={`/project/${projectId}`} />;
  }
  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => navigate(location.pathname, { replace: true })}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                    <p className="text-sm text-slate-400">
                      Agregada el: {formatDate(data.createdAt)}
                    </p>
                    <p className="text-sm text-slate-400">
                      Última actualización: {formatDate(data.updatedAt)}
                    </p>
                    <Dialog.Title
                      as="h3"
                      className="font-black text-4xl text-slate-600 my-5"
                    >
                      {data.name}
                    </Dialog.Title>
                    <p className="text-lg text-slate-500 mb-2">
                      Descripción:{data.description}
                    </p>
                    {data.completedBy && data.completedBy.length > 0 && (
                      <>
                        <p className="font-bold text-2xl text-slate-600  my-5">
                          Historial de cambio
                        </p>
                        <ul className=" list-decimal">
                          {data.completedBy?.map((taskLog) => (
                            <li key={taskLog._id}>
                              <span className="font-bold text-slate-600">
                                {statusTranslations[taskLog.status]}
                              </span>{" "}
                              {typeof taskLog.user === "object" &&
                              taskLog.user.name
                                ? taskLog.user.name
                                : "NO hay usuario"}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className="my-5 space-y-3">
                      <label className="font-bold">
                        Estado Actual:{data.status}
                        <select
                          className="w-full p-3 bg-white border border-gray-300"
                          defaultValue={data.status}
                          onChange={(e) => handleChangeSelect(e)}
                        >
                          {Object.entries(statusTranslations).map(
                            ([key, value]) => (
                              <option key={key} value={key}>
                                {value}
                              </option>
                            )
                          )}
                        </select>
                      </label>
                    </div>
                    <NotesPanel notes={data.notes} />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
