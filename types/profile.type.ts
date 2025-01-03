export type UserDataResponse = {
  user_id: string;
  email: string;
  fullname: string;
  phone_number: string;
  gender: "M" | "F";
  university: string;
  created_at: string;
  is_verified: boolean;
};
