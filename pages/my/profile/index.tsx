import Loading from "@/components/Loading";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { capitalize } from "@/utils/capitalize";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { getError } from "@/utils/getError";
import { Button, Input, Select, SelectItem, Snippet } from "@nextui-org/react";
import { Check, Copy, FloppyDisk } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [errors, setErrors] = useState<any>();

  useEffect(() => {
    if (data && data?.data) {
      setUserData(data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (userData && data?.data) {
      const hasChanged = Object.keys(data.data).some(
        (key) =>
          key !== "email" &&
          data.data[key as keyof UserDataResponse] !==
            userData[key as keyof UserDataResponse],
      );

      const allFieldsFilled = Object.keys(userData).every((key) => {
        return (
          key === "user_id" ||
          key === "email" ||
          userData[key as keyof UserDataResponse] !== ""
        );
      });

      setIsDisabled(!hasChanged || !allFieldsFilled);
    }
  }, [userData, data]);

  function handleChange(field: keyof UserDataResponse, value: string) {
    if (userData) {
      setUserData((prevData) => ({
        ...prevData!,
        [field]: value,
      }));
    }
  }

  async function handleSave() {
    const data = {
      fullname: userData?.fullname,
      phone_number: userData?.phone_number,
      university: userData?.university,
      gender: userData?.gender,
    };

    try {
      await fetcher({
        url: "/my/profile",
        method: "PATCH",
        data: data,
        token,
      });

      toast.success("Profil Anda Berhasil Diperbarui");
      mutate();
    } catch (error: any) {
      console.log(error);

      if (error.status_code >= 500) {
        toast.error(getError(error));
      } else if (error.status_code >= 400 && error.status_code <= 499) {
        if (error.error.name === "ZodError") {
          setErrors(getError(error));
        } else {
          toast.error(getError(error));
        }
      } else {
        toast.error(getError(error));
      }
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

            <div>
              <h4 className="text-[20px] font-bold leading-[120%] text-black">
                {data?.data.fullname}
              </h4>
              <Snippet
                symbol=""
                copyIcon={
                  <Copy weight="regular" size={16} className="text-black" />
                }
                checkIcon={
                  <Check weight="regular" size={16} className="text-black" />
                }
                className="w-max"
                classNames={{
                  base: "text-black bg-transparent border-none p-0",
                  pre: "font-medium text-black font-sans text-[14px]",
                }}
              >
                {data?.data.user_id}
              </Snippet>
              <p className="text-sm font-medium text-gray">
                {data?.data.university}
              </p>
            </div>
          </div>

          <div className="grid gap-4 py-8">
            <div className="flex items-center justify-between">
              <h4 className="text-[20px] font-bold leading-[120%] text-black">
                Informasi Personal
              </h4>

              <Button
                isDisabled={isDisabled}
                variant="solid"
                color="secondary"
                size="sm"
                startContent={<FloppyDisk weight="bold" size={18} />}
                onClick={handleSave}
                className="font-bold"
              >
                Simpan Perubahan
              </Button>
            </div>

            <div className="grid max-w-[800px] gap-y-6 sm:grid-cols-2 sm:gap-x-2">
              <Input
                type="text"
                variant="flat"
                label="Nama Lengkap"
                labelPlacement="outside"
                placeholder="Nama Lengkap Anda"
                value={userData?.fullname}
                onChange={(e) =>
                  handleChange("fullname", capitalize(e.target.value))
                }
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Select
                aria-label="select gender"
                variant="flat"
                labelPlacement="outside"
                label="Jenis Kelamin"
                placeholder="Jenis Kelamin Anda"
                selectedKeys={userData?.gender}
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
                placeholder="Asal Kampus (nama lengkap)"
                value={userData?.university}
                onChange={(e) =>
                  handleChange("university", capitalize(e.target.value))
                }
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
                placeholder="Nomor Telpon Anda"
                value={userData?.phone_number}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
                isInvalid={
                  errors ? (errors.phone_number ? true : false) : undefined
                }
                errorMessage={
                  errors
                    ? errors.phone_number
                      ? errors.phone_number
                      : null
                    : null
                }
              />
            </div>

            <p className="mt-4 text-sm font-medium text-gray">
              Akun dibuat pada: {formatDate(data?.data.created_at as string)}
            </p>
          </div>

          {/* <div className="flex items-center justify-between pt-8">
            <h4 className="text-[20px] leading-[120%] font-bold text-black">
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
          </div> */}
        </div>
      </section>
    </Layout>
  );
}

export type UserDataResponse = {
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
