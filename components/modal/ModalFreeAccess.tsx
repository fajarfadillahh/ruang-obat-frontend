import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { KeyedMutator } from "swr";

type ModalFreeAccessProps = {
  token: string;
  program_id: string;
  user_id: string;
  mutate: KeyedMutator<any>;
};

export default function ModalFreeAccess({
  token,
  program_id,
  user_id,
  mutate,
}: ModalFreeAccessProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  async function handleFollowFree() {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("program_id", program_id);
      formData.append("user_id", user_id);

      await fetcher({
        url: "/programs/follow/free",
        method: "POST",
        data: formData,
        token,
      });

      mutate();
      toast.success("Yeay, kamu telah mengikuti program ini! 🎉🎉");
    } catch (error: any) {
      setLoading(false);
      console.log(error);

      toast.error(getError(error));
    }
  }

  return (
    <>
      <Button
        isLoading={loading}
        isDisabled={loading}
        color="secondary"
        onClick={onOpen}
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
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-bold text-black">
                Pemberitahuan
              </ModalHeader>

              <ModalBody>
                <p className="font-medium leading-[170%] text-gray">
                  Akses berbagai latihan soal{" "}
                  <strong className="font-extrabold text-purple">
                    eksklusif
                  </strong>{" "}
                  secara gratis untuk menunjang persiapanmu menghadapi ujian
                  sesungguhnya. Apakah kamu yakin ingin mengikuti program ini?
                </p>
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
                  isLoading={loading}
                  isDisabled={loading}
                  color="secondary"
                  className="font-bold"
                  onClick={handleFollowFree}
                >
                  Ya, Ikuti Sekarang!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
