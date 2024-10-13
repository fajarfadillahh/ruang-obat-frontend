import "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    fullname: string;
    user_id: string;
    access_token: string;
    expired: string;
    gender: "M" | "F";
  }
}

declare module "next-auth" {
  interface User {
    fullname: string;
    user_id: string;
    access_token: string;
    expired: string;
    gender: "M" | "F";
    id?: string;
  }

  interface Session {
    user: {
      fullname: string;
      user_id: string;
      access_token: string;
      expired: string;
      gender: "M" | "F";
    };
  }
}
