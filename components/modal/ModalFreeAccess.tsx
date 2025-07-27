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
import { CheckCircle, Plus } from "@phosphor-icons/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { KeyedMutator } from "swr";

type ModalFreeAccessProps = {
  token: string;
  program_id: string;
  mutate: KeyedMutator<any>;
};

export default function ModalFreeAccess({
  token,
  program_id,
  mutate,
}: ModalFreeAccessProps) {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [followFile, setFollowFile] = useState<File | null>();
  const [commentFile, setCommentFile] = useState<File | null>();
  const [shareFile, setShareFile] = useState<File | null>();

  async function handleFollowFree() {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("files", followFile as Blob);
      formData.append("files", commentFile as Blob);
      formData.append("files", shareFile as Blob);
      formData.append("program_id", program_id);

      await fetcher({
        url: "/programs/follow/free",
        method: "POST",
        token,
        data: formData,
        file: true,
      });

      setLoading(false);
      setFollowFile(null);
      setCommentFile(null);
      setShareFile(null);
      mutate();
      toast.success("Berhasil upload persyaratan");
    } catch (error: any) {
      setLoading(false);
      console.log(error);

      toast.error(getError(error));
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
        size="xl"
        placement="center"
        onClose={() => {
          onClose();
          setFollowFile(null);
          setCommentFile(null);
          setShareFile(null);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-bold text-black">
                Pemberitahuan
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-6">
                  <p className="font-medium leading-[170%] text-gray">
                    Untuk mengikuti program gratis ini, kamu harus memenuhi
                    persyaratan untuk upload bukti{" "}
                    <span className="font-extrabold">follow</span>,{" "}
                    <span className="font-extrabold">comment</span>, dan{" "}
                    <span className="font-extrabold">share</span> instagram{" "}
                    <span
                      className="cursor-pointer font-extrabold text-purple"
                      onClick={() => {
                        window.open(
                          "https://www.instagram.com/ruangobat.id",
                          "_blank",
                        );
                      }}
                    >
                      ruangobat.id
                    </span>
                  </p>

                  <div className="grid gap-1">
                    <p className="flex flex-col gap-1 font-medium leading-[170%] text-gray">
                      <span className="text-danger">
                        * format gambar .jpg .jpeg .png
                      </span>
                      <span className="text-danger">* max. 4mb</span>
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-between">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <label className="relative inline-block">
                          <input
                            type="file"
                            accept="image/jpg, image/jpeg, image/png"
                            className="absolute inset-0 cursor-pointer opacity-0"
                            onChange={(e) => {
                              if (e.target.files) {
                                setFollowFile(e.target.files[0]);
                              } else {
                                setFollowFile(null);
                              }
                            }}
                          />

                          <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-gray/40 p-8 text-gray/50 sm:p-14">
                            <span>
                              {followFile ? (
                                <CheckCircle
                                  size={30}
                                  className="text-success"
                                  weight="fill"
                                />
                              ) : (
                                <Plus size={30} weight="bold" />
                              )}
                            </span>
                          </div>
                        </label>

                        <p className="font-medium leading-[170%] text-gray">
                          Follow
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-2">
                        <label className="relative inline-block">
                          <input
                            type="file"
                            accept="image/jpg, image/jpeg, image/png"
                            className="absolute inset-0 cursor-pointer opacity-0"
                            onChange={(e) => {
                              if (e.target.files) {
                                setCommentFile(e.target.files[0]);
                              } else {
                                setCommentFile(null);
                              }
                            }}
                          />

                          <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-gray/40 p-8 text-gray/50 sm:p-14">
                            <span>
                              {commentFile ? (
                                <CheckCircle
                                  size={30}
                                  className="text-success"
                                  weight="fill"
                                />
                              ) : (
                                <Plus size={30} weight="bold" />
                              )}
                            </span>
                          </div>
                        </label>

                        <p className="font-medium leading-[170%] text-gray">
                          Comment
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-2">
                        <label className="relative inline-block">
                          <input
                            type="file"
                            accept="image/jpg, image/jpeg, image/png"
                            className="absolute inset-0 cursor-pointer opacity-0"
                            onChange={(e) => {
                              if (e.target.files) {
                                setShareFile(e.target.files[0]);
                              } else {
                                setShareFile(null);
                              }
                            }}
                          />

                          <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-gray/40 p-8 text-gray/50 sm:p-14">
                            <span>
                              {shareFile ? (
                                <CheckCircle
                                  size={30}
                                  className="text-success"
                                  weight="fill"
                                />
                              ) : (
                                <Plus size={30} weight="bold" />
                              )}
                            </span>
                          </div>
                        </label>

                        <p className="font-medium leading-[170%] text-gray">
                          Share
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    setFollowFile(null);
                    setCommentFile(null);
                    setShareFile(null);
                  }}
                  className="font-bold"
                >
                  Tutup
                </Button>

                <Button
                  color="secondary"
                  className="font-bold"
                  onClick={handleFollowFree}
                  isDisabled={
                    loading || !followFile || !commentFile || !shareFile
                  }
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
