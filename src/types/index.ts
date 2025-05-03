import {
  array,
  InferOutput,
  object,
  pick,
  string,
  nullable,
  union,
} from "valibot";
import * as v from "valibot";
import { noteSchema } from "./notes/note";
import { userSchema } from "./authTypes";

/**Tasks */
const taskStatus = {
  PENDING: "pending",
  ON_HOLD: "onHold",
  IN_PROGRESS: "inProgress",
  UNDER_VIEW: "underReview",
  COMPLETE: "complete",
} as const;

export const taskStatusSchema = v.enum(taskStatus);
export const SchemaTask = object({
  _id: string(),
  name: string(),
  description: string(),
  project: string(),
  status: taskStatusSchema,
  completedBy: nullable(
    array(
      object({
        _id: string(),
        user: union([userSchema, string()]),
        status: taskStatusSchema,
      })
    )
  ),
  notes: array(noteSchema),
  createdAt: string(),
  updatedAt: string(),
});
export type Task = InferOutput<typeof SchemaTask>;
export type TaskFormData = Pick<Task, "name" | "description">;

/**Projects  */

export const SchemaProject = object({
  _id: string(),
  projectName: string(),
  clienteName: string(),
  description: string(),
  manager: string(),
  tasks: array(SchemaTask),
});

export const SchemaDashboardProject = pick(SchemaProject, [
  "_id",
  "projectName",
  "description",
  "clienteName",
  "manager",
]);

export const SchemaDashboardProjects = array(SchemaDashboardProject);
export const EditProjectSchema = pick(SchemaProject, [
  "projectName",
  "description",
  "clienteName",
]);
export type DashboardData = InferOutput<typeof SchemaDashboardProjects>;
export type ProjectDashboard = InferOutput<typeof SchemaDashboardProject>;

export type Project = InferOutput<typeof SchemaProject>;
export type ProjectFormData = Pick<
  Project,
  "projectName" | "clienteName" | "description"
>;

/*Resquest type*/
export const SchemaRequestType = object({
  msg: string(),
});
export type requestType = InferOutput<typeof SchemaRequestType>;
