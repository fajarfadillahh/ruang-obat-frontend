export type ProgramsType = {
  program_id: string;
  title: string;
  type: "free" | "paid";
  price: number;
  total_tests: number;
  total_users: number;
  participated: boolean;
  is_approved: boolean | null;
};
