import { SuccessResponse } from "@/types/global.type";
import { UserDataResponse } from "@/types/profile.type";
import { fetcher } from "@/utils/fetcher";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthChecker() {
  const router = useRouter();
  const { data: session, status } = useSession();

  async function checkVerified(token: string) {
    try {
      const response: SuccessResponse<UserDataResponse> = await fetcher({
        url: "/my/profile",
        method: "GET",
        token,
      });
      return response.data.is_verified;
    } catch (error) {
      toast.error("Gagal mengambil data user");
      return null;
    }
  }

  useEffect(() => {
    if (!session || status !== "authenticated") return;

    checkVerified(session.user.access_token).then((is_verified) => {
      if (is_verified === false && router.pathname !== "/unverified") {
        router.push("/unverified");
      }
    });

    const expiredAt = new Date(session.user.expired_at).getTime();
    const now = Date.now();
    const delay = expiredAt - now;

    let timeout: NodeJS.Timeout | undefined = undefined;

    if (delay <= 0) {
      signOut({ redirect: false });
      router.push("/");
      return;
    }

    timeout = setTimeout(() => {
      toast(
        <div className="flex items-center gap-2 rounded bg-yellow-100 px-4 py-2 text-yellow-500">
          <span className="text-xl">⚠️</span>
          <span>Sesi kamu telah berakhir</span>
        </div>,
        {
          duration: 6000,
          style: {
            background: "transparent",
            boxShadow: "none",
            padding: 0,
          },
        },
      );
      signOut({ redirect: false });
      router.push("/");
    }, delay);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [session, status, router]);

  return null;
}
