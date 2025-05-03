import { array, InferOutput, pick } from "valibot";
import { userSchema } from "../authTypes";

export const TeamMemberSchema = pick(userSchema, ["name", "_id", "email"]);
export const TeamMembersSchema = array(TeamMemberSchema);
export type TeamMember = InferOutput<typeof TeamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;
