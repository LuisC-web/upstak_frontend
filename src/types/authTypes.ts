import { email, InferOutput, object, pipe, string, pick } from "valibot";

/**Auth & Users */
export const authSchema = object({
  name: string(),
  email: pipe(string(), email()),
  current_password: string(),
  password: string(),
  password_confirmation: string(),
  token: string(),
});
type Auth = InferOutput<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirmation"
>;
export type ConfirmToken = Pick<Auth, "token">;
export type CheckPasswordForm = Pick<Auth, "password">;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;
export type UpdateCurrentUserPasswordForm = Pick<
  Auth,
  "current_password" | "password" | "password_confirmation"
>;

export const userSchema = object({
  _id: string(),
  ...pick(authSchema, ["email", "name"]).entries,
});
export type User = InferOutput<typeof userSchema>;
export type UserProfileForm = Pick<User, "email" | "name">;
