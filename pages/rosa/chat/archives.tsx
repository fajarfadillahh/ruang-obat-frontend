import EmptyData from "@/components/EmptyData";
import ModalUnauthenticated from "@/components/modal/ModalUnauthenticated";
import NavbarRosa from "@/components/rosa-ai/NavbarRosa";
import Sidebar from "@/components/rosa-ai/SidebarNew";
import { AIContext } from "@/context/AIContext";
import AIProvider from "@/context/AIProvider";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SuccessResponse } from "@/types/global.type";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { Skeleton, useDisclosure } from "@nextui-org/react";
import { ChatCircle } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import useSWR from "swr";

type ArchiveChat = {
  thread_id: string;
  title: string;
  created_at: string;
};

export default function ArchiveRosaPage({ token }: { token: string }) {
  const { data, isLoading } = useSWR<SuccessResponse<ArchiveChat[]>>({
    url: "/ai/threads?archive=1",
    method: "GET",
    token,
  });

  return (
    <AIProvider>
      <SubArchivesRosaPage archives={data?.data} isLoading={isLoading} />
    </AIProvider>
  );
}

function SubArchivesRosaPage({
  archives,
  isLoading,
}: {
  archives?: ArchiveChat[];
  isLoading?: boolean;
}) {
  const router = useRouter();
  const ctx = useContext(AIContext);
  const { isOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Archive Percakapan Saya | RuangObat</title>
      </Head>

      <ModalUnauthenticated
        isOpen={isOpen}
        onClose={() => {
          onClose();
          router.back();
          return;
        }}
      />

      <div className="flex h-dvh overflow-hidden bg-white text-black">
        <Sidebar open={true} className="hidden lg:flex" />

        <Sidebar
          open={ctx?.sidebarOpen as boolean}
          onClose={() => ctx?.setSidebarOpen(false)}
          className="fixed inset-0 z-40 flex h-dvh lg:hidden"
        />

        <div className="relative isolate grid w-full grid-rows-[max-content_1fr_max-content]">
          <NavbarRosa />

          <div className="relative overflow-y-scroll p-6 scrollbar-hide lg:scrollbar-default">
            <div className="mx-auto grid w-full max-w-4xl grid-rows-[max-content_1fr] gap-6 pb-24">
              <h2 className="font-extrabold text-black md:text-xl">
                Archive Percakapan 📦
              </h2>

              <div className="grid gap-2">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="h-14 w-full rounded-xl" />
                  ))
                ) : archives?.length ? (
                  archives?.map((archive, index) => (
                    <Link
                      key={index}
                      href={`/rosa/chat/${encodeURIComponent(archive.thread_id)}`}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-xl border-2 border-purple/10 p-4 hover:cursor-pointer hover:border-purple hover:bg-purple/10"
                    >
                      <div className="inline-flex items-center gap-2">
                        <ChatCircle
                          weight="duotone"
                          size={20}
                          className="text-purple"
                        />

                        <h3 className="line-clamp-1 flex-1 font-semibold capitalize -tracking-wide text-black">
                          {archive.title}
                        </h3>
                      </div>

                      <p className="text-sm font-medium text-gray">
                        {formatDateWithoutTime(archive.created_at)}
                      </p>
                    </Link>
                  ))
                ) : (
                  <div className="grid justify-items-center gap-4 rounded-xl border-2 border-dashed border-gray/20 p-8">
                    <EmptyData text="Archive masih kosong..." />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token?: string;
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: {
      token: session ? (session?.user.access_token as string) : "",
    },
  };
};
