import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export default function ModalLoggedIn({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
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
          <ModalHeader className="flex flex-col gap-1 font-bold text-black">
            Harap Dibaca!
          </ModalHeader>

          <ModalBody>
            <div className="grid gap-2 text-sm font-medium leading-[170%] text-gray">
              <p>
                Akun anda masih login di perangkat{" "}
                <strong className="text-purple">Windows</strong>. Jika anda
                ingin login pada perangkat ini, silakan baca beberapa poin
                berikut:
              </p>

              <ul className="grid list-inside list-disc">
                <li>Pastikan anda tidak sedang mengerjakan ujian/tes</li>
                <li>
                  Jika anda sedang mengerjakan ujian/tes, semua jawaban akan
                  terhapus apabila anda login diperangkat ini
                </li>
                <li>
                  Anda harus menjawab ulang ujian/tes yang sedang anda kerjakan
                  dengan waktu pengerjaan yang tetap berjalan
                </li>
              </ul>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="danger"
              variant="solid"
              onPress={onClose}
              className="font-bold"
            >
              Logout
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
