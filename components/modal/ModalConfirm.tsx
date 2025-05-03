import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

type ModalConfirmType = {
  header: string;
  text: string;
  btnText: string;
  btnColor?: string;
  loading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  handleAction?(): void;
};

export default function ModalConfirm({
  header,
  text,
  btnText,
  isOpen,
  loading,
  onClose,
  handleAction,
}: ModalConfirmType) {
  return (
    <Modal
      isDismissable={false}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      placement="center"
    >
      <ModalContent>
        <>
          <ModalHeader className="text-xl font-bold text-black">
            {header}
          </ModalHeader>

          <ModalBody>
            <p className="font-medium leading-[170%] text-gray">{text}</p>
          </ModalBody>

          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onClick={onClose}
              className="font-bold"
            >
              Tutup
            </Button>

            <Button
              color="secondary"
              className="font-bold"
              isLoading={loading}
              onClick={handleAction}
            >
              {btnText}
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
