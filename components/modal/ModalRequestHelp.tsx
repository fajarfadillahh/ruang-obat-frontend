import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

type ModalRequestHelpProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalRequestHelp({
  isOpen,
  onClose,
}: ModalRequestHelpProps) {
  const { data: session, status } = useSession();
  const [trouble, setTrouble] = useState("");

  return (
    <Modal
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={onClose}
      size="md"
      placement="center"
      onClose={() => {
        setTrouble("");
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 font-bold text-black">
              Bantuan
            </ModalHeader>

            <ModalBody>
              <div className="grid gap-6">
                <p className="text-sm font-medium leading-[170%] text-gray">
                  Butuh bantuan? Tuliskan kendalamu pada kolom di bawah ini agar
                  kita tahu kendalamu apa.
                </p>

                <Textarea
                  isRequired
                  maxRows={4}
                  variant="flat"
                  labelPlacement="outside"
                  placeholder="Tuliskan Kendalamu..."
                  classNames={{
                    input:
                      "font-semibold placeholder:font-normal placeholder:text-default-600",
                  }}
                  onChange={(e) => setTrouble(e.target.value)}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onClick={() => {
                  onClose();
                  setTrouble("");
                }}
                className="font-bold"
              >
                Tutup
              </Button>

              <Button
                color="secondary"
                startContent={<WhatsappLogo weight="bold" size={18} />}
                className="font-bold"
                isDisabled={!trouble}
                onClick={() => {
                  const fullname =
                    status == "authenticated" ? session.user.fullname : "";
                  const userID =
                    status == "authenticated" ? session.user.user_id : "";
                  const template = `Hallo kak saya ${fullname} dengan UserID ${userID}, ${trouble}`;
                  const adminPhone = "6282289509438";

                  window.open(
                    `https://api.whatsapp.com/send?phone=${adminPhone}&text=${encodeURIComponent(template)}`,
                    "_blank",
                  );
                  setTrouble("");
                  onClose();
                }}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
