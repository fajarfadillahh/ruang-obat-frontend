import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";

export default function ModalInputAccessKey() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        variant="solid"
        color="secondary"
        size="sm"
        onPress={onOpen}
        className="w-full font-bold sm:w-max sm:px-6"
      >
        Ikuti Program
      </Button>

      <Modal
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-black">
                Masukan Kode Akses
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-6">
                  <p className="text-sm font-medium leading-[170%] text-gray">
                    Akses fitur ini hanya diperuntukkan bagi pengguna yang telah
                    membayar program ini. Silakan masukkan kode akses yang telah
                    diberikan oleh admin pada kolom di bawah ini.
                  </p>

                  <Input
                    isRequired
                    type="text"
                    variant="flat"
                    label="Kode Akses"
                    labelPlacement="outside"
                    placeholder="Contoh: ROAK2a816AjAK98kPOw"
                    classNames={{
                      input:
                        "font-semibold placeholder:font-semibold placeholder:text-gray",
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
                  onPress={onClose}
                  endContent={<ArrowRight weight="bold" size={18} />}
                  className="font-bold"
                >
                  Ikuti Sekarang
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
