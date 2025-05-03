import api from "@/lib/axios";
import { requestType } from "@/types";
import { NoteApiType } from "@/types/notes/note";
import { isAxiosError } from "axios";

export async function createNote({
  formData,
  projectId,
  taskId,
}: Pick<NoteApiType, "formData" | "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/task/${taskId}/notes`;
    const { data } = await api.post<requestType>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}

export async function deletNote({
  projectId,
  taskId,
  noteId,
}: Pick<NoteApiType, "projectId" | "taskId" | "noteId">) {
  try {
    const url = `/projects/${projectId}/task/${taskId}/notes/${noteId}`;
    const { data } = await api.delete<requestType>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
