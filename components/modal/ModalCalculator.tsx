import CalculatorComponent from "@/components/Calculator";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Calculator } from "@phosphor-icons/react";

export default function ModalCalculator() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button
        color="default"
        startContent={<Calculator weight="duotone" size={18} />}
        onClick={onOpen}
        className="font-bold"
      >
        Kalkulator
      </Button>

      <Modal
        isDismissable={false}
        size="lg"
        placement="center"
        onClose={onClose}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-bold text-black">
                Kalkulator 🧮
              </ModalHeader>

              <ModalBody>
                <CalculatorComponent />
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
