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
import { useState } from "react";
import toast from "react-hot-toast";
import { KeyedMutator } from "swr";

type ModalInputAccessKey = {
  token: string;
  program_id: string;
  mutate: KeyedMutator<any>;
};

export default function ModalInputAccessKey({
  token,
  program_id,
  mutate,
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
        url: "/programs/follow/paid",
        method: "POST",
        token,
        data: {
          program_id,
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
              <ModalHeader className="text-xl font-bold text-black">
                Masukan Kode Akses
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-4">
                  <p className="font-medium leading-[170%] text-gray">
                    Akses fitur ini hanya diperuntukkan bagi pengguna yang telah
                    membayar program ini. Silakan masukkan kode akses yang telah
                    diberikan oleh admin pada kolom di bawah ini.
                  </p>

                  <Input
                    isRequired
                    value={code}
                    type="text"
                    variant="flat"
                    placeholder="Masukan Kode"
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
                  className="font-bold"
                  onClick={handleFollowPaid}
                  isDisabled={loading || !code}
                  isLoading={loading}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
