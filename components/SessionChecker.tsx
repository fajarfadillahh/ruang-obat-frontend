import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SessionChecker() {
  const router = useRouter();

  useEffect(() => {
    window.onfocus = async () => {
      if (!router.pathname.startsWith("/auth")) {
        try {
          const session = await getSession();
          const current = new Date();
          const expired = new Date(session?.user.expired as string);

          if (session) {
            const responseFromBackend = (await fetcher({
              url: `/auth/session/check`,
              method: "GET",
              token: session.user.access_token,
            })) as SuccessResponse<{ message: string; session_id: string }>;

            if (responseFromBackend.success) {
              if (current > expired) {
                await fetcher({
                  url: `/auth/session/${session?.user.user_id}`,
                  method: "DELETE",
                });

                signOut();
              }
            }
          } else {
            signOut();
          }
        } catch (error: any) {
          console.log(error);

          if (error.status_code == 404) {
            signOut();
          }
        }
      }
    };
  }, [router]);

  useEffect(() => {
    checkSession();

    async function checkSession() {
      if (!router.pathname.startsWith("/auth")) {
        try {
          const session = await getSession();
          const current = new Date();
          const expired = new Date(session?.user.expired as string);

          if (session) {
            const responseFromBackend = (await fetcher({
              url: `/auth/session/check`,
              method: "GET",
              token: session.user.access_token,
            })) as SuccessResponse<{ message: string; session_id: string }>;

            if (responseFromBackend.success) {
              if (current > expired) {
                await fetcher({
                  url: `/auth/session/${session?.user.user_id}`,
                  method: "DELETE",
                });

                signOut();
              }
            }
          } else {
            signOut();
          }
        } catch (error: any) {
          console.log(error);

          if (error.status_code == 404) {
            signOut();
          }
        }
      }
    }
  }, [router]);

  return null;
}
