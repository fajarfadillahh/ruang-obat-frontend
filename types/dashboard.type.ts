import { ProgramsType } from "@/types/programs.type";

export type DashboardResponse = {
  programs: ProgramsType[];
  page: number;
  total_programs: number;
  total_pages: number;
};
