import Loading from "@/components/Loading";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { FloppyDisk, PencilLine } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";

export default function MyProfilePage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading, mutate } = useSWR<SuccessResponse<UserDataResponse>>(
    {
      url: "/my/profile",
      method: "GET",
      token,
    },
  );

  const [userData, setUserData] = useState<UserDataResponse | null>(null);

  function handleChange(field: keyof UserDataResponse, value: string) {
    if (userData) {
      setUserData((prevData) => ({
        ...prevData!,
        [field]: value,
      }));
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout title="Profil Saya">
      <section className="grid gap-8 pb-16">
        <h1 className="text-[24px] font-extrabold -tracking-wide text-black">
          Profil Saya 🧑
        </h1>

        <div className="divide-y-2 divide-dashed divide-gray/20">
          <div className="inline-flex items-center gap-4 pb-8">
            <Image
              src={
                data?.data.gender === "M"
                  ? "/img/avatar-male.svg"
                  : "/img/avatar-female.svg"
              }
              alt="profile img"
              width={500}
              height={500}
              className="size-[100px] rounded-full border-3 border-purple bg-purple/10 object-cover object-center p-1"
            />

            <div className="space-y-1">
              <h4 className="text-[20px] font-bold text-black">
                {data?.data.fullname}
              </h4>
              <p className="text-sm font-medium text-gray">
                {data?.data.user_id}
              </p>
              <p className="text-sm font-medium text-gray">
                {data?.data.university}
              </p>
            </div>
          </div>

          <div className="grid gap-4 py-8">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-[20px] font-bold text-black">
                Informasi Personal
              </h4>

              <Button
                variant="solid"
                color="secondary"
                size="sm"
                startContent={<FloppyDisk weight="bold" size={18} />}
                className="font-bold"
              >
                Simpan Perubahan
              </Button>
            </div>

            <div className="grid max-w-[800px] gap-y-6 sm:grid-cols-2 sm:grid-rows-3 sm:gap-x-2">
              <Input
                type="text"
                variant="flat"
                label="Nama Lengkap"
                labelPlacement="outside"
                value={data?.data.fullname}
                onChange={(e) => handleChange("fullname", e.target.value)}
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Select
                aria-label="select gender"
                variant="flat"
                labelPlacement="outside"
                placeholder="Jenis Kelamin"
                defaultSelectedKeys={data?.data.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                classNames={{
                  value: "font-semibold text-gray",
                }}
              >
                <SelectItem key="M">Laki-Laki</SelectItem>
                <SelectItem key="F">Perempuan</SelectItem>
              </Select>

              <Input
                type="text"
                variant="flat"
                label="Asal Kampus"
                labelPlacement="outside"
                value={data?.data.university}
                onChange={(e) => handleChange("university", e.target.value)}
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Input
                type="text"
                variant="flat"
                label="No. Telpon"
                labelPlacement="outside"
                value={data?.data.phone_number}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-8">
            <h4 className="text-[20px] font-bold text-black">
              Ubah Kata Sandi
            </h4>

            <Button
              variant="solid"
              color="secondary"
              size="sm"
              startContent={<PencilLine weight="bold" size={18} />}
              className="font-bold"
            >
              Ubah Kata Sandi
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

type UserDataResponse = {
  user_id: string;
  email: string;
  fullname: string;
  phone_number: string;
  gender: "M" | "F";
  university: string;
  created_at: string;
};

export const getServerSideProps: GetServerSideProps<{
  token: string;
}> = async ({ req }) => {
  return {
    props: {
      token: req.headers["access_token"] as string,
    },
  };
};
