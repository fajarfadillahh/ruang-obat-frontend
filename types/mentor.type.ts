export interface HomepageResponse {
  classes: any[];
  mentors: MentorType[];
}

// ==== seperated ====

export type MentorType = {
  mentor_id: string;
  fullname: string;
  nickname: string;
  mentor_title: string;
  img_url: string;
  description: string;
};

export type MentorDetailsType = {
  mentor_id: string;
  fullname: string;
  nickname: string;
  mentor_title: string;
  description: string;
  img_url: string;
  created_at: string;
};

export type MentorClassType = MentorType & {
  class_mentor_id: string;
};
