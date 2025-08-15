export type ProgramsType = {
  program_id: string;
  title: string;
  type: "free" | "paid";
  price: number;
  total_tests: number;
  is_approved: boolean;
  qr_code: string;
  url_qr_code: string;
  is_login: boolean;
  is_active?: boolean;
};

export type DetailsProgramResponse = ProgramsType & {
  tests: {
    test_id: string;
    title: string;
    start: string;
    end: string;
    duration: number;
    has_result: boolean;
    remaining_tests: number;
    result_id: string;
    status: string;
  }[];
};
