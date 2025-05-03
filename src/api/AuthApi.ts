import api from "@/lib/axios";
import { requestType } from "@/types";
import {
  CheckPasswordForm,
  ConfirmToken,
  ForgotPasswordForm,
  NewPasswordForm,
  RequestConfirmationCodeForm,
  UserLoginForm,
  UserRegistrationForm,
  userSchema,
} from "@/types/authTypes";
import { isAxiosError } from "axios";
import { safeParse } from "valibot";

export async function createAccount(formData: UserRegistrationForm) {
  try {
    const url = `/auth/create-account`;
    const { data } = await api.post<requestType>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
export async function confirmAccount(token: ConfirmToken["token"]) {
  try {
    const url = `/auth/confirm-account`;
    const { data } = await api.post<requestType>(url, { token });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
export async function resendToken(email: RequestConfirmationCodeForm) {
  try {
    const url = `/auth/resend-code`;
    const { data } = await api.patch<requestType>(url, email);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
export async function authLogin(formData: UserLoginForm) {
  try {
    const url = `/auth/login`;
    const { data } = await api.post<requestType>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
export async function forgetPassword(email: ForgotPasswordForm) {
  try {
    const url = `/auth/forget-password`;
    const { data } = await api.post<requestType>(url, email);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
export async function validateToken(email: ConfirmToken) {
  try {
    const url = `/auth/validate-token`;
    const { data } = await api.post<requestType>(url, email);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
export async function updatePassword({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
}) {
  try {
    const url = `/auth/update-password`;
    const { data } = await api.post<requestType>(url, { ...formData, token });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
export async function checkPassword(formData: CheckPasswordForm) {
  try {
    const url = `/auth/check-password`;
    const { data } = await api.post<requestType>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
export async function getUser() {
  try {
    const url = `/auth/user`;
    const { data } = await api.get<requestType>(url);
    const response = safeParse(userSchema, data);

    if (response.success) return response.output;
    throw new Error("Hay un error");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}
