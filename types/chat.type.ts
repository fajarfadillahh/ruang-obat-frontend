export type ChatResponse = {
  role: "user" | "assistant";
  content: string;
  images?: { image_id: string; img_url: string }[];
  chat_id: string;
};

export type MessageState = {
  role: "user" | "assistant";
  content: string;
  chat_id?: string;
  images?: { image_id: string; img_url: string }[];
};
