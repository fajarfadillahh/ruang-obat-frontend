import { memo } from "react";

export const ChatInput = memo(function ChatInput({
  input,
  setInput,
  handleSubmitChat,
  disabled,
}: {
  input: string;
  setInput: (v: string) => void;
  handleSubmitChat: () => void;
  disabled: boolean;
}) {
  return (
    <input
      placeholder="Tanyakan Seputar Farmasi dan Ruang Obat..."
      className="bg-gray-100 font-semibold outline-none placeholder:text-sm placeholder:font-semibold placeholder:text-gray"
      disabled={disabled}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSubmitChat();
        }
      }}
    />
  );
});
