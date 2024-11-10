import { fetcher } from "@/utils/fetcher";
import { getError } from "@/utils/getError";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { ArrowRight, Star } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

type ModalSendFeedbackProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalSendFeedback({
  isOpen,
  onClose,
}: ModalSendFeedbackProps) {
  const { data: session, status } = useSession();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSaveFeedback() {
    setLoading(true);
    try {
      await fetcher({
        url: "/general/feedback",
        method: "POST",
        data: {
          user_id: status == "authenticated" ? session.user.user_id : "",
          fullname: status == "authenticated" ? session.user.fullname : "",
          rating,
          text: feedback,
        },
        token: status == "authenticated" ? session.user.access_token : "",
      });

      setLoading(false);
      onClose();
      setRating(0);
      setFeedback("");
      toast.success("Terimakasih atas feedbacknya!");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(getError(error));
    }
  }

  return (
    <Modal
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={onClose}
      size="md"
      placement="center"
      onClose={() => {
        setRating(0);
        setFeedback("");
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 font-bold text-black">
              Saran & Masukan
            </ModalHeader>

            <ModalBody>
              <div className="grid gap-8">
                <p className="text-sm font-medium leading-[170%] text-gray">
                  Ada saran atau masukan? Kami selalu terbuka untuk feedback
                  demi meningkatkan kualitas layanan kami.
                </p>

                <div className="grid justify-items-center gap-4">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, index) => {
                      const starIndex = index + 1;

                      return (
                        <Button
                          key={index}
                          isIconOnly
                          variant="light"
                          size="sm"
                          color={starIndex <= rating ? "warning" : "default"}
                          onClick={() => setRating(starIndex)}
                        >
                          <Star weight="bold" size={24} />
                        </Button>
                      );
                    })}
                  </div>

                  <Textarea
                    isRequired
                    maxRows={4}
                    variant="flat"
                    labelPlacement="outside"
                    placeholder="Tuliskan Saran & Masukan..."
                    classNames={{
                      input:
                        "font-semibold placeholder:font-normal placeholder:text-default-600",
                    }}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onClick={() => {
                  onClose();
                  setRating(0);
                  setFeedback("");
                }}
                className="font-bold"
              >
                Tutup
              </Button>

              <Button
                color="secondary"
                variant="solid"
                endContent={<ArrowRight weight="bold" size={18} />}
                className="font-bold"
                onClick={handleSaveFeedback}
                isDisabled={!rating || !feedback}
                isLoading={loading}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
