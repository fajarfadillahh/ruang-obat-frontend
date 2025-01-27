export type TestsType = {
  id: string | number;
  title: string;
  start_test: string;
  end_test: string;
  duration_test: string | number;
  status_test: string;
};

export type MyTestType = {
  title: string;
  test_id: string;
  result_id: string;
  score: number;
  created_at: string;
};

export type TestResponse = {
  test_id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  duration: number;
  is_active: boolean;
  total_questions: number;
  status: "Belum dimulai" | "Berlangsung" | "Berakhir";
  end_time: string;
  has_start: boolean;
  has_result: string;
  remaining_tests: number;
};
