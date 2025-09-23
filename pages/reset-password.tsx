import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import { handleKeyDown } from "@/utils/handleKeyDown";
import { Button, Input } from "@nextui-org/react";
import { EnvelopeSimple, IconContext, Lock } from "@phosphor-icons/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [otpCode, setOtpCode] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");
  const [loadingVerif, setLoadingVerif] = useState<boolean>(false);

  async function handleSendOtp() {
    setTime(60);

    try {
      const response: SuccessResponse<{ user_id: string; message: string }> =
        await fetcher({
          url: "/email/forgot",
          method: "POST",
          data: {
            email,
          },
        });

      toast.success("OTP terkirim, cek inbox atau spam 📩", {
        duration: 3000,
      });

      setUserId(response.data.user_id);
    } catch (error: any) {
      console.log(error);
      setUserId("");

      if (error.status_code >= 500) {
        toast.error(getError(error));
      } else if (error.status_code >= 400 && error.status_code <= 499) {
        if (error.error.name === "ZodError") {
          setEmailError(getError(error));
        } else {
          toast.error(getError(error));
        }
      } else {
        toast.error(getError(error));
      }
    }
  }

  async function handleForgetPassword() {
    setLoadingVerif(true);

    try {
      const response: SuccessResponse<{ token: string }> = await fetcher({
        url: "/otp/verify",
        method: "POST",
        data: {
          user_id: userId,
          otp_code: otpCode,
        },
      });

      setEmail("");
      setEmailError("");
      setOtpCode("");
      setTime(0);
      setUserId("");

      router.push(`/reset?token=${response.data.token}`);
      // window.location.href = `/reset?token=${response.data.token}`;
    } catch (error: any) {
      console.log(error);
      setLoadingVerif(false);

      toast.error(getError(error));
    } finally {
      setLoadingVerif(false);
    }
  }

  useEffect(() => {
    if (time) {
      const interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [time]);

  return (
    <>
      <Head>
        <title>Reset Password | RuangObat</title>
      </Head>

      <main className="flex h-screen w-full items-center justify-center">
        <section className="grid w-full max-w-lg gap-12 p-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-extrabold capitalize -tracking-wide text-black">
              Reset Password 🔒
            </h1>

            <p className="font-medium leading-[170%] text-gray">
              Masukan alamat email yang sebelumnya telah terdaftar di
              ruangobat.id, dan masukan kode OTP untuk melakukan reset password.
            </p>
          </div>

          <IconContext.Provider
            value={{
              weight: "duotone",
              size: 18,
              className: "text-gray",
            }}
          >
            <div className="grid gap-4">
              <div className="flex items-end gap-2">
                <Input
                  isRequired
                  type="email"
                  autoComplete="off"
                  label="Alamat Email"
                  labelPlacement="outside"
                  placeholder="Contoh: pengguna@gmail.com"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    const email = e.target.value;
                    if (!email) {
                      setEmailError("");
                      setEmail(email);
                    } else {
                      setEmail(email);

                      const emailRegex =
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                      if (emailRegex.test(email.toLowerCase())) {
                        setEmailError("");
                      } else {
                        setEmailError("Email tidak valid");
                      }
                    }
                  }}
                  startContent={<EnvelopeSimple />}
                  onKeyDown={(e) => handleKeyDown(e, handleSendOtp)}
                  isInvalid={Boolean(emailError)}
                  errorMessage={emailError}
                  classNames={{
                    input: "text-sm font-medium placeholder:text-gray",
                    label: "text-black",
                  }}
                />

                <Button
                  isDisabled={
                    !Boolean(email) || Boolean(emailError) || Boolean(time)
                  }
                  color="secondary"
                  onClick={handleSendOtp}
                  className="px-6 font-bold"
                >
                  {Boolean(time) ? time : "Kirim OTP"}
                </Button>
              </div>

              <Input
                isRequired
                type="text"
                autoComplete="off"
                label="Kode OTP"
                labelPlacement="outside"
                placeholder="Masukan kode OTP"
                name="otp"
                onChange={(e) => setOtpCode(e.target.value)}
                startContent={<Lock />}
                onKeyDown={(e) => handleKeyDown(e, handleForgetPassword)}
                classNames={{
                  input: "text-sm font-medium placeholder:text-gray",
                  label: "text-black",
                }}
              />

              <Button
                isLoading={loadingVerif}
                isDisabled={!Boolean(otpCode) || loadingVerif}
                color="secondary"
                onClick={handleForgetPassword}
                className="mt-8 font-bold"
              >
                {!loadingVerif && "Verifikasi OTP"}
              </Button>
            </div>
          </IconContext.Provider>
        </section>
      </main>
    </>
  );
}
