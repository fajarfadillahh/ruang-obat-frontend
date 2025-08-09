import CustomTooltip from "@/components/CustomTooltip";
import { customInputClassnames } from "@/utils/customInputClassnames";
import { Button, Textarea } from "@nextui-org/react";
import { Paperclip, PaperPlaneTilt, X } from "@phosphor-icons/react";
import Image from "next/image";

export default function ChatInput() {
  return (
    <div className="fixed bottom-0 h-auto w-full max-w-3xl justify-self-center bg-gray-50 [padding:0.5rem_1rem_1rem] lg:mr-3 lg:px-0">
      <div className="group mx-auto grid h-full gap-2 rounded-2xl border-2 border-gray-200/60 bg-default-100 p-2">
        <div className="flex flex-wrap items-center gap-1">
          {/* input: image preview user */}
          {/* <ImagePreview /> */}
        </div>

        {/* input: user input */}
        <Textarea
          labelPlacement="outside"
          placeholder="Tanyakan seputar Farmasi dan RuangObat..."
          minRows={1}
          maxRows={3}
          classNames={{
            ...customInputClassnames,
            inputWrapper: "shadow-none",
          }}
        />

        <div className="flex items-center justify-between gap-2">
          <p className="col-span-2 ml-2 mt-2 text-[10px] font-medium text-gray xs:text-xs lg:col-span-1">
            Sisa Pertanyaan Kamu Hari Ini:{" "}
            <strong className="font-extrabold text-purple">150</strong>
          </p>

          <div className="inline-flex items-center gap-2">
            <Button isIconOnly variant="flat">
              <CustomTooltip content="Tambahkan File">
                <Paperclip weight="bold" size={18} className="text-gray" />
              </CustomTooltip>
            </Button>

            <Button isIconOnly color="secondary">
              <CustomTooltip content="Submit Pertanyaan">
                <PaperPlaneTilt weight="duotone" size={18} />
              </CustomTooltip>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImagePreview() {
  return (
    <div className="relative isolate size-20 overflow-hidden rounded-xl bg-gray-400">
      <Image
        src="/img/default-thumbnail.png"
        alt="image user"
        width={500}
        height={500}
        className="size-full object-fill object-center"
      />

      <Button
        isIconOnly
        color="danger"
        size="sm"
        radius="full"
        className="absolute right-1 top-1 z-50"
      >
        <X weight="bold" size={14} />
      </Button>
    </div>
  );
}
