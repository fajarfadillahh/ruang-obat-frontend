export type ProgramsType = {
  id: number | string;
  title: string;
  program_type: "gratis" | "berbayar";
  amount_module: number;
  amount_user: number;
};
