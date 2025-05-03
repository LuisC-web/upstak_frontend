import { FieldErrors, UseFormRegister } from "react-hook-form";
import Errors from "../Errors";
import { ProjectFormData } from "@/types";
type ProjectFormProps = {
  register: UseFormRegister<ProjectFormData>;
  errors: FieldErrors<ProjectFormData>;
};
export default function ProjectForm({ register, errors }: ProjectFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        {errors.projectName && <Errors>{errors.projectName.message}</Errors>}
        <label htmlFor="projectName" className="text-sm uppercase font-bold">
          Nombre del Proyecto
        </label>
        <input
          id="projectName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Proyecto"
          {...register("projectName", {
            required: "El Titulo del Proyecto es obligatorio",
          })}
        />
      </div>

      <div className="mb-5 space-y-3">
        {errors.clienteName && <Errors>{errors.clienteName.message}</Errors>}
        <label htmlFor="clientName" className="text-sm uppercase font-bold">
          Nombre Cliente
        </label>
        <input
          id="clientName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Cliente"
          {...register("clienteName", {
            required: "El Nombre del Cliente es obligatorio",
          })}
        />
      </div>

      <div className="mb-5 space-y-3">
        {errors.description && <Errors>{errors.description.message}</Errors>}
        <label htmlFor="description" className="text-sm uppercase font-bold">
          Descripción
        </label>
        <textarea
          id="description"
          className="w-full p-3  border border-gray-200"
          placeholder="Descripción del Proyecto"
          {...register("description", {
            required: "Una descripción del proyecto es obligatoria",
          })}
        />
      </div>
    </>
  );
}
