import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
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
import { useState } from "react";
import toast from "react-hot-toast";
import { KeyedMutator } from "swr";

type ModalInputAccessKey = {
  token: string;
  program_id: string;
  mutate: KeyedMutator<any>;
  type: "free" | "paid";
};

export default function ModalInputAccessKey({
  token,
  program_id,
  mutate,
  type,
}: ModalInputAccessKey) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();

  async function handleFollowPaid() {
    setLoading(true);
    setErrorMessage(null);

    try {
      await fetcher({
        url: "/programs/follow",
        method: "POST",
        token,
        data: {
          program_id,
          type,
          code,
        },
      });

      setLoading(false);
      onClose();
      setCode("");
      mutate();

      toast.success("Berhasil mengikuti program");
    } catch (error: any) {
      setLoading(false);
      console.log(error);

      if (error.status_code >= 500) {
        toast.error(getError(error));
      } else if (error.status_code >= 400 && error.status_code <= 499) {
        if (error.error.name === "ZodError") {
          setErrorMessage(getError(error));
        } else {
          toast.error(getError(error));
        }
      } else {
        toast.error(getError(error));
      }
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
        size="lg"
        placement="center"
        onClose={() => {
          setCode("");
          setErrorMessage(null);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-black">
                Masukan Kode Akses
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-4">
                  <p className="text-sm font-medium leading-[170%] text-gray">
                    Akses fitur ini hanya diperuntukkan bagi pengguna yang telah
                    membayar program ini. Silakan masukkan kode akses yang telah
                    diberikan oleh admin pada kolom di bawah ini.
                  </p>

                  <Input
                    value={code}
                    isRequired
                    type="text"
                    variant="flat"
                    label="Kode Akses"
                    labelPlacement="outside"
                    classNames={{
                      input:
                        "font-semibold placeholder:font-semibold placeholder:text-gray",
                    }}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    errorMessage={
                      Boolean(errorMessage) ? errorMessage.code : ""
                    }
                    isInvalid={Boolean(errorMessage)}
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    setCode("");
                    setErrorMessage(null);
                  }}
                  className="font-bold"
                >
                  Tutup
                </Button>

                <Button
                  color="secondary"
                  endContent={<ArrowRight weight="bold" size={18} />}
                  className="font-bold"
                  onClick={handleFollowPaid}
                  isDisabled={loading || !code}
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
