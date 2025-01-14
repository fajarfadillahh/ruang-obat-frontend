import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

type ModalUnauthenticatedProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalUnauthenticated({
  isOpen,
  onClose,
}: ModalUnauthenticatedProps) {
  const router = useRouter();

  return (
    <Modal
      placement="center"
      isDismissable={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="font-extrabold text-black">
          Peringatan!
        </ModalHeader>

        <ModalBody>
          <div className="grid gap-12">
            <Image
              priority
              src="/img/notify-img.svg"
              alt="img"
              width={800}
              height={800}
              className="h-auto w-[250px] justify-self-center"
            />

            <div className="grid gap-6 justify-self-center">
              <div className="grid gap-1 text-center">
                <h4 className="text-xl font-extrabold capitalize text-black">
                  Kamu belum login/buat akun
                </h4>
                <p className="text-sm font-medium text-gray">
                  Silahkan login atau buat akun terlebih dahulu ya guys.
                </p>
              </div>

              <div className="flex justify-center gap-2">
                <Button
                  variant="bordered"
                  className="px-8 font-bold"
                  onClick={() =>
                    router.push(`/auth/register?callback=${router.asPath}`)
                  }
                >
                  Buat Akun
                </Button>

                <Button
                  color="secondary"
                  className="px-6 font-bold"
                  onClick={() =>
                    router.push(`/auth/login?callback=${router.asPath}`)
                  }
                >
                  Login Sekarang
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
