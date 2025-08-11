import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

type ModalBuyProps = {
  buttonText: string;
  productName: string;
};

export default function ModalBuy({ buttonText, productName }: ModalBuyProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();

  return (
    <>
      <Button
        color="secondary"
        size="sm"
        onPress={onOpen}
        className="w-full font-bold sm:w-max sm:px-6"
      >
        {buttonText}
      </Button>

      <Modal
        placement="center"
        isDismissable={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader></ModalHeader>

          <ModalBody>
            <div className="grid gap-12">
              <Image
                priority
                src="https://ruangobat.is3.cloudhost.id/statics/images/second-illustrations/notify-img.svg"
                alt="img"
                width={800}
                height={800}
                className="h-auto w-[230px] justify-self-center"
              />

              <div className="grid gap-6 justify-self-center">
                <div className="grid gap-1 text-center">
                  <h4 className="text-xl font-extrabold capitalize text-black">
                    Kamu tertarik dengan produk ini?
                  </h4>
                  <p className="text-sm font-medium text-gray">
                    Langsung chat admin aja, ya!
                  </p>
                </div>

                <Button
                  variant="solid"
                  className="text white px-8 font-bold text-white"
                  color="success"
                  startContent={<WhatsappLogo weight="bold" size={18} />}
                  onClick={() => {
                    const fullname =
                      status == "authenticated" ? session.user.fullname : "";
                    const userID =
                      status == "authenticated" ? session.user.user_id : "";
                    const template = `Hallo kak saya ${fullname} dengan UserID ${userID}, ingin membeli ${productName}`;

                    window.open(
                      `https://api.whatsapp.com/send?phone=6282289509438&text=${encodeURIComponent(template)}`,
                      "_blank",
                    );
                  }}
                >
                  Chat Admin
                </Button>
              </div>
            </div>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
