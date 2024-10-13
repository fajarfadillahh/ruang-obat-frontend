export type ProgramsType = {
  program_id: string;
  title: string;
  type: "free" | "paid";
  price: number;
  total_tests: number;
  total_users: number;
  is_approved: boolean | null;
};
