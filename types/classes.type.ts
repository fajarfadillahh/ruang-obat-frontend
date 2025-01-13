export type PreparationResponse = {
  preparation_classes: PreparationClassType[];
  mentors: any[];
};

export type PreparationClassType = {
  subject_id: string;
  title: string;
  description: string;
  price: number;
  link_order: string;
  thumbnail_url: string;
  thumbnail_type: "video" | "image";
  created_at: string;
};
