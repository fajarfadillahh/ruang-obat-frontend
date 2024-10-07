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
import { ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { KeyedMutator } from "swr";

type ModalFreeAccessProps = {
  token: string;
  program_id: string;
  mutate: KeyedMutator<any>;
  type: "free" | "paid";
};

export default function ModalFreeAccess({
  token,
  program_id,
  mutate,
  type,
}: ModalFreeAccessProps) {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function handleFollowFree() {
    setLoading(true);
    try {
      await fetcher({
        url: "/programs/follow",
        method: "POST",
        token,
        data: {
          program_id,
          type,
        },
      });

      setLoading(false);
      mutate();
      toast.success("Berhasil mengikuti program");
    } catch (error: any) {
      setLoading(false);
      console.log(error);

      toast.error(getError(error));
    }
  }

  return (
    <>
      <Button
        variant="solid"
        color="secondary"
        size="sm"
        onPress={onOpen}
        className="w-full font-bold sm:w-max sm:px-6"
        isLoading={loading}
        isDisabled={loading}
      >
        Ikuti Program
      </Button>

      <Modal
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-black">
                Pemberitahuan
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-6">
                  <p className="text-sm font-medium leading-[170%] text-gray">
                    Anda akan mengikuti program ini{" "}
                    <span className="font-bold">tanpa biaya</span>
                  </p>
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
                  endContent={<ArrowRight weight="bold" size={18} />}
                  className="font-bold"
                  onClick={handleFollowFree}
                  isDisabled={loading}
                  isLoading={loading}
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
