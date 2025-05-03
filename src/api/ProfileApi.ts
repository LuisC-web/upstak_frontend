import api from "@/lib/axios";
import { requestType } from "@/types";
import {
  UpdateCurrentUserPasswordForm,
  UserProfileForm,
} from "@/types/authTypes";
import { isAxiosError } from "axios";

export async function updateProfile(
  formData: Pick<UserProfileForm, "email" | "name">
) {
  try {
    const url = `/auth/profile`;
    const { data } = await api.patch<requestType>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}

export async function changePassword(formData: UpdateCurrentUserPasswordForm) {
  try {
    const url = `/auth/update-password-profile`;
    const { data } = await api.post<requestType>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
