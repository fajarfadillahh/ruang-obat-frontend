import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import { handleKeyDown } from "@/utils/handleKeyDown";
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
import { EnvelopeSimple, Lock } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ModalForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [time, setTime] = useState(0);
  const [userId, setUserId] = useState("");

  const {
    isOpen: isForgotPasswordOpen,
    onOpen: onForgotPasswordOpen,
    onClose: onForgotPasswordClose,
  } = useDisclosure();

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

      toast.success("OTP terkirim, cek inbox atau spam", {
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
    try {
      const response: SuccessResponse<{ token: string }> = await fetcher({
        url: "/otp/verify",
        method: "POST",
        data: {
          user_id: userId,
          otp_code: otpCode,
        },
      });

      window.open(`/reset?token=${response.data.token}`);
      onForgotPasswordClose();
      setEmail("");
      setEmailError("");
      setOtpCode("");
      setTime(0);
      setUserId("");
    } catch (error: any) {
      console.log(error);

      toast.error(getError(error));
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
      <div
        className="justify-self-end text-sm font-semibold text-purple hover:cursor-pointer hover:underline"
        onClick={onForgotPasswordOpen}
      >
        Lupa Sandi?
      </div>

      <Modal
        isDismissable={false}
        isOpen={isForgotPasswordOpen}
        onOpenChange={onForgotPasswordClose}
        size="lg"
        placement="center"
        onClose={() => {
          setEmail("");
          setEmailError("");
          setOtpCode("");
          setTime(0);
          setUserId("");
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-black">
                Lupa Sandi?
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-6">
                  <p className="text-sm font-medium leading-[170%] text-gray">
                    Masukan alamat email yang sebelumnya digunakan untuk membuat
                    akun di ruangobat.id
                  </p>

                  <div className="grid gap-2">
                    <div className="flex gap-2">
                      <Input
                        value={email}
                        type="email"
                        variant="flat"
                        labelPlacement="outside"
                        placeholder="Alamat Email"
                        startContent={
                          <EnvelopeSimple
                            weight="bold"
                            size={18}
                            className="text-gray"
                          />
                        }
                        name="email"
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
                        classNames={{
                          input:
                            "font-semibold placeholder:font-semibold placeholder:text-gray",
                        }}
                        className="flex-1"
                        autoComplete="off"
                        isInvalid={Boolean(emailError)}
                        errorMessage={emailError}
                      />

                      <Button
                        color="secondary"
                        variant="flat"
                        onClick={handleSendOtp}
                        className="font-semibold"
                        isDisabled={
                          !Boolean(email) ||
                          Boolean(emailError) ||
                          Boolean(time)
                        }
                      >
                        {Boolean(time) ? time : "Kirim OTP"}
                      </Button>
                    </div>

                    <Input
                      type="text"
                      variant="flat"
                      labelPlacement="outside"
                      placeholder="Kode OTP"
                      startContent={
                        <Lock weight="bold" size={18} className="text-gray" />
                      }
                      name="otp"
                      onChange={(e) => setOtpCode(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, handleForgetPassword)}
                      classNames={{
                        input:
                          "font-semibold placeholder:font-semibold placeholder:text-gray",
                      }}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => {
                    setEmail("");
                    setEmailError("");
                    setOtpCode("");
                    setTime(0);
                    setUserId("");
                    onClose();
                  }}
                  className="font-bold"
                >
                  Tutup
                </Button>

                <Button
                  color="secondary"
                  onClick={handleForgetPassword}
                  className="font-bold"
                  isDisabled={!Boolean(otpCode)}
                >
                  Verifikasi OTP
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
