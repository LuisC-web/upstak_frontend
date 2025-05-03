import { Project, Task, TaskFormData } from "..";

export type TaksApi = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  status: Task["status"];
};
