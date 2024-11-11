import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { cloneElement } from "react";

type ModalConfirmTestProps = {
  trigger: any;
  header: any;
  body: any;
  footer: any;
};

export default function ModalConfirmTest({
  trigger,
  header,
  body,
  footer,
}: ModalConfirmTestProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {cloneElement(trigger, { onClick: onOpen })}

      <Modal
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        placement="center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {header && <ModalHeader>{header}</ModalHeader>}
              {body && <ModalBody>{body}</ModalBody>}
              {footer && (
                <ModalFooter>
                  {typeof footer == "function" ? footer(onClose) : footer}
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
