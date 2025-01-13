export type PreparationResponse = {
  preparation_classes: PreparationClassType[];
  mentors: any[];
};

export type PrivateResponse = {
  private_classes: PrivateClassType[];
  mentors: any[];
};

// ==== seperated ====

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

export interface PrivateClassType {
  subject_id: string;
  title: string;
  description: string;
  created_at: string;
  private_sub_classes: PrivateSubClassType[];
}

export interface PrivateSubClassType {
  subject_part_id: string;
  price: number;
  description: string;
  link_order: string;
}
