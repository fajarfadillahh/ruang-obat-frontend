import { ProgramsType } from "@/types/programs.type";
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
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

type ModalJoinGroupProps = {
  data: ProgramsType;
};

export default function ModalJoinGroup({ data }: ModalJoinGroupProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        startContent={
          <WhatsappLogo weight="bold" size={18} className="text-white" />
        }
        className="fixed bottom-10 right-5 bg-success font-bold text-white md:right-16 xl:bottom-20 xl:right-24"
      >
        Join Grup WhatsApp!
      </Button>

      <Modal
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onClose}
        size="md"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-bold text-black">
                Join Grup WhatsApp
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-6">
                  <p className="font-medium leading-[170%] text-gray">
                    Klik link di bawah ini atau scan QR Code untuk join di grup
                    kita guys! 👋
                    <br />
                    <Link
                      href={"#"}
                      onClick={(e) => {
                        e.preventDefault();
                        if (data?.url_qr_code) {
                          window.open(`${data?.url_qr_code}`, "_blank");
                        } else {
                          toast.error("Maaf, Link Grup Tidak Tersedia!");
                        }
                      }}
                      className="w-max font-bold leading-[170%] text-purple underline"
                    >
                      Link Join Grup!
                    </Link>
                  </p>

                  {data?.qr_code ? (
                    <Image
                      priority
                      src={data?.qr_code as string}
                      alt="qrcode image"
                      width={1000}
                      height={1000}
                      className="aspect-square size-64 justify-self-center rounded-xl border-2 border-dashed border-gray/30 bg-gray/10 object-cover object-center p-1"
                    />
                  ) : (
                    <div className="flex aspect-square size-64 items-center justify-center justify-self-center rounded-xl border-2 border-dashed border-gray/30 bg-gray/10 object-cover object-center p-1">
                      <span className="text-sm font-semibold italic leading-[170%] text-gray">
                        Gambar Tidak Tersedia!
                      </span>
                    </div>
                  )}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="font-bold"
                >
                  Tutup
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
