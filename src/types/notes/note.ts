import { object, string, InferOutput } from "valibot";
import { userSchema } from "../authTypes";
import { Project, Task } from "..";

export const noteSchema = object({
  _id: string(),
  content: string(),
  createdBy: userSchema,
  task: string(),
  createdAt: string(),
});

export type Note = InferOutput<typeof noteSchema>;
export type NoteFormData = Pick<Note, "content">;

/**Api note */
export type NoteApiType = {
  formData: NoteFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  noteId: Note["_id"];
};
