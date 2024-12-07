export type Question = {
  number: number;
  question_id: string;
  text: string;
  url?: string;
  type?: "text" | "video" | "image";
  options: Option[];
  user_answer: string;
  is_hesitant: boolean;
};

export type Option = {
  option_id: string;
  text: string;
  is_correct?: boolean;
};
