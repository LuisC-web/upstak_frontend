import { Project } from "@/types";
import { TeamMember } from "@/types/teams";

export const isManager = (
  managerId: Project["manager"],
  userId: TeamMember["_id"]
) => {
  return managerId === userId;
};
