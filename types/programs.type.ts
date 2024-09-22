export type ProgramsType = {
  id: number | string;
  title: string;
  program_type: "free" | "paid";
  price_program: number;
  amount_module: number;
  amount_user: number;
};
