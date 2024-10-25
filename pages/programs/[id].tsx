import ButtonBack from "@/components/button/ButtonBack";
import CardTest from "@/components/card/CardTest";
import Loading from "@/components/Loading";
import ModalFreeAccess from "@/components/modal/ModalFreeAccess";
import ModalInputAccessKey from "@/components/modal/ModalInputAccessKey";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { ProgramsType } from "@/types/programs.type";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Button,
  Chip,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import {
  BookBookmark,
  CheckCircle,
  Notepad,
  Tag,
  Users,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import useSWR from "swr";

export default function DetailsProgram({
  token,
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isLoading, mutate } = useSWR<SuccessResponse<ProgramResponse>>({
    url: `/programs/${params.id}`,
    method: "GET",
    token,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout title={data?.data.title}>
      <section className="grid gap-8 pb-16">
        <ButtonBack />

        <div className="grid divide-y-2 divide-dashed divide-gray/20">
          <div className="grid gap-10 pb-8 sm:grid-cols-[1fr_max-content] sm:items-start md:pr-6">
            <div className="flex items-start gap-6">
              <BookBookmark weight="bold" size={48} className="text-purple" />

              <div className="grid flex-1 gap-4">
                <h4 className="max-w-[700px] text-[24px] font-bold leading-[120%] -tracking-wide text-black lg:text-[28px]">
                  {data?.data.title}
                </h4>

                <div className="flex flex-wrap items-center gap-4 lg:gap-10">
                  {data?.data.type == "free" ? (
                    <Chip
                      variant="flat"
                      color="default"
                      startContent={
                        <Tag weight="bold" size={18} className="text-black" />
                      }
                      classNames={{
                        base: "px-3 gap-1",
                        content: "font-bold text-black",
                      }}
                    >
                      Gratis
                    </Chip>
                  ) : (
                    <h5 className="text-xl font-extrabold text-purple">
                      {formatRupiah(data?.data.price as number)}
                    </h5>
                  )}

                  <div className="inline-flex items-center gap-1 text-gray">
                    <Notepad weight="bold" size={18} />
                    <p className="text-sm font-bold">
                      {data?.data.total_tests} Ujian
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1 text-gray">
                    <Users weight="bold" size={18} />
                    <p className="text-sm font-bold">
                      {data?.data.total_users} Mahasiswa/i
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {data?.data.is_approved == null ? (
              data?.data.type == "free" ? (
                <ModalFreeAccess
                  {...{
                    token,
                    program_id: data.data.program_id,
                    mutate,
                  }}
                />
              ) : (
                <ModalInputAccessKey
                  {...{
                    token,
                    program_id: data?.data.program_id as string,
                    mutate,
                  }}
                />
              )
            ) : null}

            {data?.data.is_approved == false ? (
              <Button
                variant="solid"
                color="secondary"
                size="sm"
                className="w-full font-bold sm:w-max sm:px-6"
                isDisabled={true}
              >
                Menunggu Approve
              </Button>
            ) : null}

            {data?.data.is_approved == true ? (
              <div className="inline-flex items-center gap-1">
                <CheckCircle weight="fill" size={18} className="text-success" />
                <p className="text-sm font-semibold capitalize text-black">
                  Program telah diikuti
                </p>
              </div>
            ) : null}
          </div>

          <div className="grid gap-4 pt-8">
            <h4 className="text-[20px] font-bold -tracking-wide text-black">
              Daftar Ujian 📋
            </h4>

            <div className="relative grid gap-2">
              {data?.data.tests.map((test) => (
                <CardTest
                  key={test.test_id}
                  {...{ ...test, is_approved: data.data.is_approved }}
                />
              ))}
            </div>
          </div>
        </div>

        {data?.data.is_approved == true ? (
          <>
            <Button
              variant="solid"
              startContent={
                <WhatsappLogo weight="bold" size={18} className="text-white" />
              }
              onPress={() => setIsModalOpen(true)}
              className="fixed bottom-[70px] right-5 bg-success font-bold text-white md:right-16 xl:bottom-24 xl:right-24"
            >
              Join Grup WhatsApp!
            </Button>

            <Modal
              isDismissable={false}
              isOpen={isModalOpen}
              onOpenChange={() => setIsModalOpen(false)}
              size="sm"
              placement="center"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 font-bold text-black">
                      Join Grup WhatsApp
                    </ModalHeader>

                    <ModalBody>
                      <div className="grid gap-6">
                        <p className="text-sm font-medium leading-[170%] text-gray">
                          Klik link dibawah ini atau scan QR Code untuk join
                          grup kita guyss! 👋
                          <br />
                          <Link
                            href={"#"}
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(`${data.data.url_qr_code}`, "_blank");
                            }}
                            className="w-max text-sm font-semibold leading-[170%] text-purple underline"
                          >
                            Link Join Grup!
                          </Link>
                        </p>

                        <Image
                          priority
                          src={data.data.qr_code}
                          alt="qrcode image"
                          width={1000}
                          height={1000}
                          className="aspect-square size-64 justify-self-center rounded-xl border-2 border-dashed border-gray/30 bg-gray/10 object-cover object-center p-1"
                        />
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
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        ) : null}
      </section>
    </Layout>
  );
}

type ProgramResponse = ProgramsType & {
  tests: {
    test_id: string;
    title: string;
    start: string;
    end: string;
    duration: number;
    is_active: boolean;
    has_result: boolean;
    status: string;
  }[];
};

export const getServerSideProps: GetServerSideProps<{
  token: string;
  params: ParsedUrlQuery;
}> = async ({ req, params }) => {
  return {
    props: {
      token: req.headers["access_token"] as string,
      params: params as ParsedUrlQuery,
    },
  };
};
