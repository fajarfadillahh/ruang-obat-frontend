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

type ModalRequestHelpProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalRequestHelp({
  isOpen,
  onClose,
}: ModalRequestHelpProps) {
  return (
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
            <ModalHeader className="flex flex-col gap-1 font-bold text-black">
              Bantuan
            </ModalHeader>

            <ModalBody>
              <div className="grid gap-6">
                <p className="text-sm font-medium leading-[170%] text-gray">
                  Butuh bantuan? Tuliskan kendalamu pada kolom dibawah ini agar
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
                />
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

              <Button
                color="secondary"
                variant="solid"
                startContent={<WhatsappLogo weight="bold" size={18} />}
                className="font-bold"
              >
                Kirim Sekarang
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
