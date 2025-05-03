import api from "@/lib/axios";
import {
  DashboardData,
  EditProjectSchema,
  Project,
  ProjectFormData,
  SchemaDashboardProjects,
} from "@/types";
import { isAxiosError } from "axios";
import { safeParse } from "valibot";
export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
export async function getProjects(): Promise<DashboardData> {
  try {
    const { data } = await api("/projects");
    const response = safeParse(SchemaDashboardProjects, data);
    if (response.success) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
    throw new Error("Hay un error");
  }
}
export async function getProjectById(id: Project["_id"]) {
  try {
    const { data } = await api(`/projects/${id}`);

    const response = safeParse(EditProjectSchema, data);

    if (response.success) {
      return data;
    }
    return {} as Project;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
    throw new Error("Hay un error");
  }
}
export async function updateProjectById({
  projectId,
  data,
}: {
  projectId?: Project["_id"];
  data: ProjectFormData;
}) {
  try {
    const { data: DateResponse } = await api.put(
      `/projects/${projectId}`,
      data
    );
    return DateResponse as { msg: string };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
    throw new Error("Hay un error");
  }
}
export async function deleteProjectById(
  id: Project["_id"]
): Promise<{ msg: string }> {
  try {
    const { data } = await api.delete(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
    throw new Error("Hay un error");
  }
}
