import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

type ModalCodeVerificationProps = {
  isOpen: boolean;
  email: string;
  handleCodeVerification: () => Promise<void>;
  handleVerifyOtp: () => Promise<void>;
  loading: boolean;
  onClose: () => void;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
};

export default function ModalCodeVerification({
  isOpen,
  email,
  handleCodeVerification,
  handleVerifyOtp,
  loading,
  onClose,
  code,
  setCode,
}: ModalCodeVerificationProps) {
  return (
    <Modal
      isDismissable={false}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setCode("");
      }}
      size="lg"
      placement="center"
    >
      <ModalContent>
        <>
          <ModalHeader />

          <ModalBody>
            <div className="grid gap-8">
              <div className="grid gap-1 text-center">
                <h1 className="text-[24px] font-bold text-black">
                  Masukan Kode Verifikasi 📨
                </h1>
                <p className="text-sm font-medium leading-[170%] text-gray">
                  Kami telah mengirim kode verifikasi ke{" "}
                  <span className="font-bold text-purple">{email}</span>
                </p>
              </div>

              <div className="grid gap-2">
                <Input
                  autoComplete="off"
                  type="text"
                  inputMode="numeric"
                  variant="flat"
                  labelPlacement="outside"
                  placeholder="Masukan Kode Verifikasi"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  classNames={{
                    input:
                      "text-center font-semibold placeholder:font-semibold placeholder:text-gray",
                  }}
                />

                <Button
                  isLoading={loading}
                  isDisabled={!code || loading || code.length > 6}
                  variant="solid"
                  color="secondary"
                  className="font-bold"
                  onClick={handleVerifyOtp}
                >
                  Submit
                </Button>
              </div>

              <p className="border-t-2 border-dashed border-gray/20 pt-8 text-center text-sm font-medium leading-[170%] text-gray">
                Tidak menerima kode?{" "}
                <span
                  className="font-bold text-purple hover:cursor-pointer hover:underline"
                  onClick={handleCodeVerification}
                >
                  Kirim ulang
                </span>
              </p>
            </div>
          </ModalBody>

          <ModalFooter />
        </>
      </ModalContent>
    </Modal>
  );
}
