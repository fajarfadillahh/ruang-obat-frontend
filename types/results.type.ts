export type ResultType = {
  result_id: string;
  score: number;
  score_category: string;
  total_correct: number;
  total_incorrect: number;
  questions: {
    number: number;
    question_id: string;
    text: string;
    explanation: string;
    type: "text" | "video" | "image";
    url: string;
    options: { option_id: string; text: string; is_correct: boolean }[];
    correct_option: string;
    user_answer: string;
    is_correct: boolean;
  }[];
};
