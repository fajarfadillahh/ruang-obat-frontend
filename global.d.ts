import "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    fullname: string;
    user_id: string;
    access_token: string;
    expired_at: string;
    gender: "M" | "F";
    is_verified: boolean;
  }
}

declare module "next-auth" {
  interface User {
    fullname: string;
    user_id: string;
    access_token: string;
    expired_at: string;
    gender: "M" | "F";
    is_verified: boolean;
    id?: string;
  }

  interface Session {
    user: {
      fullname: string;
      user_id: string;
      access_token: string;
      expired_at: string;
      gender: "M" | "F";
      is_verified: boolean;
    };
  }
}
