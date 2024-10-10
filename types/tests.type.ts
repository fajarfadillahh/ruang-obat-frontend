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
