import Loading from "@/components/Loading";
import { SuccessResponse } from "@/types/global.type";
import { UserDataResponse } from "@/types/profile.type";
import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { PaperPlaneTilt, Warning } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UnverifiedPage({
  data,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const {
    isOpen: isCodeVerificationOpen,
    onOpen: onCodeVerificationOpen,
    onClose: onCodeVerificationClose,
  } = useDisclosure();
  const [newEmail, setNewEmail] = useState("");

  async function handleVerifyOtp() {
    setLoading(true);

    try {
      await fetcher({
        url: "/my/email/verify",
        method: "POST",
        data: {
          otp_code: code,
        },
        token,
      });

      window.location.href = "/verified";
    } catch (error) {
      console.log(error);
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleSendOtp(type: "db" | "input", email?: string) {
    setLoading(true);

    try {
      const data = {};

      if (type == "db") {
        Object.assign(data, {
          type: "db",
        });
      } else {
        Object.assign(data, {
          type: "input",
          email,
        });
      }

      await fetcher({
        url: "/my/email/otp",
        method: "POST",
        token,
        data,
      });

      toast.success("OTP terkirim, cek inbox atau spam", {
        duration: 3000,
      });
      setTime(60);
    } catch (error: any) {
      console.log(error);
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleChangeEmail() {
    setLoading(true);

    try {
      await fetcher({
        url: "/my/email/change",
        method: "POST",
        token,
        data: {
          otp_code: code,
          email: newEmail,
        },
      });

      setNewEmail("");
      onCodeVerificationClose();
      window.location.href = "/verified";
    } catch (error) {
      console.log(error);
      toast.error(getError(error));
    } finally {
      setCode("");
      setLoading(false);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Modal
        isOpen={isCodeVerificationOpen}
        isDismissable={false}
        onClose={() => {
          onCodeVerificationClose();
          setCode("");
          setNewEmail("");
        }}
        size="xl"
        placement="center"
      >
        <ModalContent>
          <>
            <ModalHeader />

            <ModalBody>
              <div className="grid gap-8">
                <div className="grid justify-items-center gap-1 text-center">
                  <Warning
                    weight="fill"
                    size={72}
                    className="text-danger-600"
                  />

                  <h1 className="text-3xl font-extrabold capitalize -tracking-wide text-black">
                    Ubah Email
                  </h1>

                  <p className="font-medium leading-[170%] text-gray">
                    Setelah kamu mengganti email, email lamamu tidak bisa
                    digunakan lagi. Namun, password kamu tetap sama dan masih
                    bisa digunakan.
                  </p>
                </div>

                <div className="grid gap-3">
                  <div className="flex gap-2">
                    <Input
                      autoComplete="off"
                      type="text"
                      inputMode="numeric"
                      variant="flat"
                      labelPlacement="outside"
                      placeholder="Masukan Email Baru"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      classNames={{
                        input:
                          "text-center font-semibold placeholder:font-semibold placeholder:text-gray",
                      }}
                    />

                    <Button
                      isLoading={loading}
                      isDisabled={!newEmail || loading || Boolean(time)}
                      color="secondary"
                      className="font-bold"
                      onClick={() => {
                        handleSendOtp("input", newEmail);
                        setTime(60);
                      }}
                      isIconOnly
                    >
                      {time ? time : <PaperPlaneTilt weight="bold" size={18} />}
                    </Button>
                  </div>

                  <Input
                    autoComplete="off"
                    type="text"
                    inputMode="numeric"
                    variant="flat"
                    labelPlacement="outside"
                    placeholder="Masukan Kode OTP"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    classNames={{
                      input:
                        "text-center font-semibold placeholder:font-semibold placeholder:text-gray",
                    }}
                  />

                  <Button
                    isLoading={loading}
                    isDisabled={
                      !code || loading || code.length > 6 || !newEmail
                    }
                    color="secondary"
                    className="font-bold"
                    onClick={handleChangeEmail}
                  >
                    Verifikasi
                  </Button>
                </div>
              </div>
            </ModalBody>

            <ModalFooter />
          </>
        </ModalContent>
      </Modal>

      <Head>
        <title>Verifikasi Email Kamu! | RuangObat</title>
      </Head>

      <main className="flex h-screen w-full items-center justify-center px-6">
        <section className="grid w-full max-w-[600px] justify-items-center gap-8 rounded-xl p-8 shadow-[4px_4px_36px_rgba(0,0,0,0.1)]">
          <Warning weight="fill" size={72} className="text-danger-600" />

          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-extrabold capitalize -tracking-wide text-black">
              Verifikasi Email Sekarang!
            </h1>

            <p className="font-medium leading-[170%] text-gray">
              Email <span className="font-bold text-purple">{data?.email}</span>{" "}
              belum diverifikasi. Klik{" "}
              <span className="font-bold text-purple">Kirim Kode OTP</span> di
              bawah untuk mendapatkan kode OTP. Jika sudah, silakan cek inbox
              atau folder spam pada email kamu.
            </p>
          </div>

          <div className="grid w-full gap-2">
            <Input
              type="text"
              inputMode="numeric"
              variant="flat"
              autoComplete="off"
              labelPlacement="outside"
              placeholder="Masukan Kode OTP"
              name="password"
              classNames={{
                input:
                  "text-center font-medium placeholder:font-medium placeholder:text-gray",
              }}
              onChange={(e) => setCode(e.target.value)}
            />

            <Button
              color="secondary"
              className="w-full font-bold"
              onClick={handleVerifyOtp}
              isDisabled={!code || code.length != 6 || loading}
              isLoading={loading}
            >
              Verifikasi
            </Button>
          </div>

          <div className="grid gap-2">
            <p className="w-full text-center font-medium leading-[170%] text-gray">
              Dapatkan kode OTP sekarang.{" "}
              {time ? (
                <span className="font-bold text-purple hover:cursor-pointer hover:underline">
                  Kirim ulang dalam {time} detik
                </span>
              ) : (
                <span
                  className="font-bold text-purple hover:cursor-pointer hover:underline"
                  onClick={() => {
                    handleSendOtp("db");
                  }}
                >
                  Kirim Kode OTP
                </span>
              )}
            </p>

            <p className="w-full text-center font-medium leading-[170%] text-gray">
              Email kamu salah?{" "}
              <span
                className="font-bold text-purple hover:cursor-pointer hover:underline"
                onClick={() => {
                  onCodeVerificationOpen();
                }}
              >
                Ubah Email
              </span>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: UserDataResponse;
  token?: string;
  error?: any;
}> = async ({ req }) => {
  const token = req.headers["access_token"] as string;

  try {
    const response: SuccessResponse<UserDataResponse> = await fetcher({
      url: "/my/profile",
      method: "GET",
      token,
    });

    if (response.data.is_verified) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        data: response.data,
        token,
      },
    };
  } catch (error: any) {
    console.error(error);

    return {
      props: {
        error,
      },
    };
  }
};
