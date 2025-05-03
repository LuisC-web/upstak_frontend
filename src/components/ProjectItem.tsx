import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { User } from "@/types/authTypes";
import { ProjectDashboard } from "@/types";

type ProjectItemProps = {
  project: ProjectDashboard;
  userId: User["_id"];
};
const ProjectItem = ({ project, userId }: ProjectItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <li className="flex justify-between gap-x-6 px-5 py-10 bg-slate-200 rounded-sm">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto space-y-2">
          <div>
            {project.manager === userId ? (
              <p className="font-bold text-xs uppercase bg-white text-indigo-500 rounded-lg inline-block py-1 px-5 border-indigo-500 border-2 mb-2">
                Manager
              </p>
            ) : (
              <p className="font-bold text-xs uppercase bg-white text-green-500 border-2 border-green-500 rounded-lg inline-block py-1 px-5 mb-2">
                Colaborador
              </p>
            )}
          </div>

          <Link
            to={`/project/${project._id}`}
            className="text-gray-900 cursor-pointer hover:underline text-3xl font-bold"
          >
            {project.projectName}
          </Link>
          <p className="text-sm text-gray-800 font-semibold">
            Cliente:{" "}
            <span className="text-gray-700">{project.clienteName}</span>
          </p>
          <p className="text-sm text-gray-600">{project.description}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-6">
        <Menu as="div" className="relative flex-none">
          <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">opciones</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <MenuItem>
                <Link
                  to={`/project/${project._id}`}
                  className="block px-3 py-1 text-sm leading-6 text-gray-900"
                >
                  Ver Proyecto
                </Link>
              </MenuItem>
              {project.manager === userId && (
                <>
                  <MenuItem>
                    <Link
                      to={`/project/${project._id}/edit`}
                      className="block px-3 py-1 text-sm leading-6 text-gray-900"
                    >
                      Editar Proyecto
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-red-500"
                      onClick={() => {
                        if (confirm("¿Estás seguro de eliminar el proyecto?")) {
                          navigate(
                            location.pathname + "?deleteProject=" + project._id
                          );
                        }
                      }}
                    >
                      Eliminar Proyecto
                    </button>
                  </MenuItem>
                </>
              )}
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </li>
  );
};

export default ProjectItem;
