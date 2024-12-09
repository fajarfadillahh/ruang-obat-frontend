export type ProgramsType = {
  program_id: string;
  title: string;
  type: "free" | "paid";
  price: number;
  total_tests: number;
  total_users: number;
  is_approved: boolean | null;
  qr_code: string;
  url_qr_code: string;
};

export type DetailsProgramResponse = ProgramsType & {
  tests: {
    test_id: string;
    title: string;
    start: string;
    end: string;
    duration: number;
    is_active: boolean;
    has_result: boolean;
    result_id: string;
    status: string;
  }[];
};
