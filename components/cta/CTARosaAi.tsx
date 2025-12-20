import Balatro from "@/components/reactbits/Balatro";
import { dummyRosaFeatures } from "@/data/dummy";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CTARosaAi() {
  const router = useRouter();
  const { onOpen, onOpenChange, isOpen } = useDisclosure();

  return (
    <section className="base-container py-[100px]">
      <div className="relative isolate h-[700px] overflow-hidden rounded-3xl lg:h-[600px]">
        <Balatro
          isRotate={false}
          mouseInteraction={false}
          pixelFilter={1750}
          color1="#ffffff"
          color2="#ec4899"
          color3="#6238C3"
          className="w-auto overflow-hidden rounded-xl"
        />

        <div className="absolute left-0 top-0 z-10 grid h-full w-full items-center gap-8 bg-purple/70 [padding:6rem_2rem] xl:grid-cols-2 xl:[padding:4rem_6rem]">
          <div className="grid gap-4">
            <h3 className="text-xl font-semibold capitalize text-white">
              RuangObat mempersembahkan! 🎉
            </h3>

            <h2 className="text-2xl font-black text-white xs:text-3xl md:text-4xl lg:text-5xl">
              Apoteker ROSA: Partner Virtual Farmasi Pertama di Indonesia
            </h2>

            <p className="font-medium leading-[170%] text-white">
              Asisten AI yang membantu pembelajaran farmasi secara cepat,
              praktis, dan efisien.
            </p>

            <div className="mt-4 grid w-full gap-2 sm:inline-flex sm:w-auto sm:items-center sm:gap-4">
              <Button
                endContent={<Sparkle weight="duotone" size={20} />}
                onClick={() => router.push("/rosa/chat")}
                className="bg-pink-500 px-4 font-bold text-white"
              >
                Tanya ROSA Sekarang
              </Button>

              <Button
                variant="bordered"
                endContent={<ArrowRight weight="bold" size={20} />}
                onClick={onOpen}
                className="border-white px-4 font-bold text-white"
              >
                Fitur Unggulan ROSA
              </Button>

              <Modal
                isDismissable={false}
                placement="center"
                scrollBehavior="inside"
                size="lg"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="font-extrabold text-black">
                        Fitur Unggulan ROSA
                      </ModalHeader>

                      <ModalBody>
                        <ul className="grid gap-4">
                          {dummyRosaFeatures.map((item, index) => (
                            <li key={index} className="grid list-decimal">
                              <h4 className="font-bold text-black">
                                {item.title}
                              </h4>

                              <p className="text-sm font-medium leading-[170%] text-gray">
                                {item.description}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onClick={onClose}
                          className="px-6 font-bold"
                        >
                          Tutup
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>

          <Image
            priority
            src="https://serveproxy.com/?url=https://ruangobat.is3.cloudhost.id/statics/images/apoteker-rosa/APOTEKER-ROSA-1.webp"
            alt="apoteker rosa image"
            width={1000}
            height={1000}
            className="hidden h-auto w-[400px] justify-self-center xl:flex"
          />
        </div>
      </div>
    </section>
  );
}
