export type AssessmentQuestion = {
  number: number;
  assq_id: string;
  text: string;
  url?: string;
  type: "text" | "video" | "image";
  options: {
    asso_id: string;
    text: string;
  }[];
  user_answer: string;
  is_hesitant: boolean;
};

export type StartAssessmentResponse = {
  title: string;
  questions: AssessmentQuestion[];
  total_questions: number;
};
