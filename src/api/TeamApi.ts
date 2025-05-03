import api from "@/lib/axios";
import { Project, requestType } from "@/types";
import {
  TeamMember,
  TeamMemberForm,
  TeamMemberSchema,
  TeamMembersSchema,
} from "@/types/teams";
import { isAxiosError } from "axios";
import { safeParse } from "valibot";
export async function findUserByEmail({
  projectId,
  formData,
}: {
  projectId: Project["_id"];
  formData: TeamMemberForm;
}) {
  try {
    const url = `/projects/${projectId}/team/find`;
    const { data } = await api.post(url, formData);
    console.log(data);

    const response = safeParse(TeamMemberSchema, data);
    if (response.success) return response.output;
    throw new Error("Hay un error");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}

export async function addUserToProject({
  projectId,
  id,
}: {
  projectId: Project["_id"];
  id: TeamMember["_id"];
}) {
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api.post<requestType>(url, { id });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}

export async function getProjectTeam(projectId: Project["_id"]) {
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api.get(url);
    const validatedData = safeParse(TeamMembersSchema, data);
    if (validatedData.success) return validatedData.output;
    console.log(validatedData);
    throw new Error("Se ha producido un error");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}

export async function removeUSerProject({
  projectId,
  userId,
}: {
  projectId: Project["_id"];
  userId: TeamMember["_id"];
}) {
  try {
    const url = `/projects/${projectId}/team/${userId}`;
    const { data } = await api.delete<requestType>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
