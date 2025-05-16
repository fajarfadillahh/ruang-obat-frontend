import NavbarMenu from "@/components/navbar/NavbarMenu";
import { customInputClassnames } from "@/utils/customInputClassnames";
import { Button, Textarea } from "@nextui-org/react";
import { CreditCard, PaperPlaneRight } from "@phosphor-icons/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const content =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure autem odio nam commodi voluptates nihil praesentium sunt quod assumenda provident?";

export default function RosaPage() {
  const router = useRouter();
  const currentUrl = `https://ruangobat.id${router.asPath}`;
  const [value, setValue] = useState<string>("");

  let role = "user";
  let credit = 1;

  function submitChat() {
    if (credit >= 1) {
      console.log("Submit chat:", value);
      setValue("");
    }
  }

  function handleKeyDown(e: any) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitChat();
    }
  }

  function handleSubmitQuestion() {
    submitChat();
  }

  return (
    <>
      <NextSeo
        title="Ruang Obat Smart Assistant (ROSA)"
        description="Ruang Obat Smart Assistant dirancang untuk meningkatkan efektivitas proses belajar mahasiswa serta mempersiapkan mereka menghadapi tantangan profesional di dunia farmasi."
        canonical={currentUrl}
        openGraph={{
          url: currentUrl,
          title: "Ruang Obat Smart Assistant (ROSA)",
          description:
            "Ruang Obat Smart Assistant dirancang untuk meningkatkan efektivitas proses belajar mahasiswa serta mempersiapkan mereka menghadapi tantangan profesional di dunia farmasi.",
          site_name: "RuangObat",
        }}
      />

      <Head>
        <title>Ruang Obat Smart Assistant (ROSA)</title>
      </Head>

      <NavbarMenu />

      <main className="mx-auto grid h-[calc(100vh-96px)] w-full max-w-[900px] grid-rows-[1fr_max-content] px-6 pt-6 xl:px-0">
        {/* content chat (user & ai) */}
        <div className="flex flex-col gap-6 overflow-y-scroll bg-white scrollbar-hide">
          {role == "user" ? (
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="h-max w-max max-w-[600px] self-end whitespace-pre-wrap bg-gray/5 p-4 font-medium leading-[170%] text-black [border-radius:1.5rem_1.5rem_2px_1.5rem] hover:bg-gray/10"
            />
          ) : (
            <div className="mb-4 flex items-start gap-4">
              <Image
                src="/img/default-thumbnail.png"
                alt="icon"
                width={100}
                height={100}
                className="aspect-square size-9 rounded-full"
              />

              <div
                dangerouslySetInnerHTML={{ __html: content }}
                className="h-max flex-1 whitespace-pre-wrap font-medium leading-[170%] text-black"
              />
            </div>
          )}
        </div>

        {/* field input user */}
        <div className="mb-4 mt-2 grid gap-4 rounded-xl border-2 border-gray/10 bg-white p-4 md:mb-8">
          <div className="flex items-end justify-between gap-4">
            <div className="inline-flex items-center gap-2">
              <CreditCard weight="duotone" size={22} className="text-purple" />

              <p className="text-sm font-medium capitalize leading-[170%] text-gray">
                Sisa kredit anda:{" "}
                <span className="font-black text-purple">{credit}</span>
              </p>
            </div>

            <p className="hidden text-[10px] font-medium italic text-gray/70 before:text-danger/70 before:content-['*'] md:flex md:text-xs">
              ROSA (AI) bisa melakukan kelasahan, harap periksa kembali!
            </p>
          </div>

          <div className="grid gap-2">
            <Textarea
              minRows={2}
              maxRows={6}
              type="text"
              variant="flat"
              labelPlacement="outside"
              placeholder="Tanyakan seputar dunia Farmasi dan RuangObat..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              classNames={customInputClassnames}
            />

            <Button
              isDisabled={!value || credit < 1}
              color="secondary"
              endContent={<PaperPlaneRight weight="bold" size={18} />}
              onClick={handleSubmitQuestion}
              className="font-bold"
            >
              Tanyakan
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
