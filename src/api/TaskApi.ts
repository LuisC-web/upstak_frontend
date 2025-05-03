import api from "@/lib/axios";
import { requestType, SchemaTask } from "@/types";
import { TaksApi } from "@/types/tasks/task";
import { isAxiosError } from "axios";
import { safeParse } from "valibot";

export async function createTask({
  formData,
  projectId,
}: Pick<TaksApi, "formData" | "projectId">) {
  try {
    const url = `/projects/${projectId}/task`;
    const { data } = await api.post<requestType>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
export async function getTaskId({
  projectId,
  taskId,
}: Pick<TaksApi, "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/task/${taskId}`;
    const { data } = await api(url);

    const response = safeParse(SchemaTask, data);
    if (response.success) return response.output;
    throw new Error("Hay un error");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
export async function updateTaskId({
  projectId,
  taskId,
  formData,
}: Pick<TaksApi, "projectId" | "taskId" | "formData">) {
  try {
    const url = `/projects/${projectId}/task/${taskId}`;
    const { data } = await api.put<requestType>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
export async function deleteTaskId({
  projectId,
  taskId,
}: Pick<TaksApi, "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/task/${taskId}`;
    const { data } = await api.delete<requestType>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
export async function updateTaskStatus({
  projectId,
  taskId,
  status,
}: Pick<TaksApi, "projectId" | "taskId" | "status">) {
  try {
    console.log(status);

    const url = `/projects/${projectId}/task/${taskId}/status`;
    const { data } = await api.patch<requestType>(url, { status });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
