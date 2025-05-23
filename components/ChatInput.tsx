import { customInputClassnames } from "@/utils/customInputClassnames";
import { Button, Textarea } from "@nextui-org/react";
import { CreditCard, PaperPlaneRight } from "@phosphor-icons/react";
import { Dispatch } from "react";

type ChatInputProps = {
  status: "authenticated" | "unauthenticated" | "loading";
  input: string;
  setInput: Dispatch<string>;
  handleSubmitChat: () => void;
  onProgressAi: boolean;
  user: {
    data: {
      remaining: number;
      total: number;
    };
  };
  messages: {
    role: string;
    content: string;
    is_loading?: boolean;
    id?: number;
    is_typing?: boolean;
  }[];
};

export default function ChatInput({
  status,
  input,
  setInput,
  handleSubmitChat,
  onProgressAi,
  user,
  messages,
}: ChatInputProps) {
  return (
    <div className="grid gap-4 rounded-xl border-2 border-gray/10 p-4">
      <div className="inline-flex items-center gap-2">
        <CreditCard weight="duotone" size={22} className="text-purple" />

        <p className="text-sm font-medium capitalize leading-[170%] text-gray">
          Sisa akses AI Anda hari ini:{" "}
          <span className="font-black text-purple">
            {status == "authenticated" ? user?.data.remaining : "-"}
          </span>
        </p>
      </div>

      <div className="grid gap-2">
        <Textarea
          isDisabled={
            status == "authenticated"
              ? !user?.data.remaining || onProgressAi
              : onProgressAi
          }
          minRows={2}
          maxRows={6}
          type="text"
          variant="flat"
          labelPlacement="outside"
          placeholder="Tanyakan Seputar Dunia Farmasi dan Ruang Obat..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !onProgressAi) {
              e.preventDefault();
              handleSubmitChat();
              setInput("");
            }
          }}
          classNames={customInputClassnames}
        />

        <Button
          isDisabled={
            !input ||
            !user?.data.remaining ||
            status == "unauthenticated" ||
            onProgressAi ||
            messages.some((msg) => msg.is_loading)
          }
          color="secondary"
          endContent={<PaperPlaneRight weight="bold" size={18} />}
          onClick={() => {
            handleSubmitChat();
            setInput("");
          }}
          className="font-bold"
        >
          Tanyakan
        </Button>
      </div>
    </div>
  );
}
