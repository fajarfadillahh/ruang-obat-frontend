import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { ArrowRight, Star } from "@phosphor-icons/react";

type ModalSendFeedbackProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalSendFeedback({
  isOpen,
  onClose,
}: ModalSendFeedbackProps) {
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
              Saran & Masukan
            </ModalHeader>

            <ModalBody>
              <div className="grid gap-8">
                <p className="text-sm font-medium leading-[170%] text-gray">
                  Ada saran atau masukan? Kami selalu terbuka untuk feedback
                  demi meningkatkan kualitas layanan kami.
                </p>

                <div className="grid justify-items-center gap-4">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Button
                        key={index}
                        isIconOnly
                        variant="light"
                        color="warning"
                        size="sm"
                      >
                        <Star weight="bold" size={24} />
                      </Button>
                    ))}
                  </div>

                  <Textarea
                    isRequired
                    maxRows={4}
                    variant="flat"
                    labelPlacement="outside"
                    placeholder="Tuliskan Saran & Masukan..."
                    classNames={{
                      input:
                        "font-semibold placeholder:font-normal placeholder:text-default-600",
                    }}
                  />
                </div>
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
                endContent={<ArrowRight weight="bold" size={18} />}
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
