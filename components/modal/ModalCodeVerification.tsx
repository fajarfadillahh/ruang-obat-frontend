import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";

type ModalCodeVerificationProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalCodeVerification({
  isOpen,
  onClose,
}: ModalCodeVerificationProps) {
  const [code, setCode] = useState("");

  return (
    <Modal
      hideCloseButton
      isDismissable={false}
      isOpen={isOpen}
      // onClose={onClose}
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
                  <span className="font-bold text-purple">
                    testing@gmail.com
                  </span>
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
                  isDisabled={!code}
                  variant="solid"
                  color="secondary"
                  className="font-bold"
                >
                  Verifikasi Sekarang
                </Button>
              </div>

              <p className="border-t-2 border-dashed border-gray/20 pt-8 text-center text-sm font-medium leading-[170%] text-gray">
                Tidak menerima kode?{" "}
                <span className="font-bold text-purple hover:cursor-pointer hover:underline">
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
