import Loading from "@/components/Loading";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { UserDataResponse } from "@/types/profile.type";
import { capitalize } from "@/utils/capitalize";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { getError } from "@/utils/getError";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Snippet,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import {
  Check,
  CheckCircle,
  Copy,
  FloppyDisk,
  XCircle,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function MyProfilePage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    isOpen: isCodeVerificationOpen,
    onOpen: onCodeVerificationOpen,
    onClose: onCodeVerificationClose,
  } = useDisclosure();
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

      toast.success("Profil kamu berhasil diperbarui!");
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

  if (isLoading) return <Loading />;

  return (
    <Layout title="Profil Saya">
      <section className="grid gap-8 pb-32">
        {/* {!data?.data.is_verified ? (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border-2 border-warning bg-warning/10 [padding:1rem_2rem]">
            <p className="font-medium leading-[170%] text-black">
              <strong className="font-extrabold">
                Email belum diverifikasi!
              </strong>{" "}
              Silakan verifikasi email kamu sekarang!
            </p>

            <Button
              color="warning"
              size="sm"
              onClick={() => alert("Fitur masih dalam tahap development")}
              className="font-bold"
            >
              Verifikasi Sekarang
            </Button>
          </div>
        ) : null} */}

        <h1 className="text-2xl font-extrabold -tracking-wide text-black">
          Profil Saya 🧑
        </h1>

        <div className="divide-y-2 divide-dashed divide-gray/20">
          <div className="inline-flex items-center gap-4 pb-10">
            <Image
              src={
                data?.data.gender === "M"
                  ? "https://ruangobat.is3.cloudhost.id/statics/images/avatar-img/avatar-male.svg"
                  : "https://ruangobat.is3.cloudhost.id/statics/images/avatar-img/avatar-female.svg"
              }
              alt="profile img"
              width={500}
              height={500}
              className="size-[100px] rounded-full border-3 border-purple bg-purple/10 object-cover object-center p-1"
            />

            <div className="grid">
              <h4 className="text-2xl font-bold text-black">
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
                  pre: "font-medium text-black font-sans",
                }}
              >
                {data?.data.user_id}
              </Snippet>

              <p className="font-medium text-gray">{data?.data.university}</p>
            </div>
          </div>

          <div className="grid gap-4 py-10">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-bold text-black">
                Informasi Personal
              </h4>

              <Button
                isDisabled={isDisabled}
                color="secondary"
                size="sm"
                startContent={<FloppyDisk weight="bold" size={18} />}
                onClick={handleSave}
                className="font-bold"
              >
                Simpan
              </Button>
            </div>

            <div className="grid max-w-[800px] gap-y-6 sm:grid-cols-2 sm:gap-x-2">
              <Input
                readOnly
                type="email"
                variant="flat"
                label="Alamat Email"
                labelPlacement="outside"
                placeholder="Alamat Email"
                endContent={
                  !data?.data.is_verified ? (
                    <Tooltip
                      content="Email Belum Diverifikasi"
                      classNames={{
                        content: "max-w-[350px] font-semibold text-black",
                      }}
                    >
                      <XCircle
                        weight="bold"
                        size={20}
                        className="text-danger"
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      content="Email Terverifikasi"
                      classNames={{
                        content: "max-w-[350px] font-semibold text-black",
                      }}
                    >
                      <CheckCircle
                        weight="bold"
                        size={20}
                        className="text-success"
                      />
                    </Tooltip>
                  )
                }
                value={userData?.email}
                onChange={(e) =>
                  handleChange("fullname", capitalize(e.target.value))
                }
                className="sm:col-span-2 sm:max-w-[396px]"
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Input
                type="text"
                variant="flat"
                label="Nama Lengkap"
                labelPlacement="outside"
                placeholder="Nama Lengkap Kamu"
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
                placeholder="Jenis Kelamin"
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
                placeholder="Nomor Telpon"
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

          {/* <div className="flex items-center justify-between pt-10">
            <h4 className="text-xl font-bold text-black">Ubah Kata Sandi</h4>

            <Button
              color="secondary"
              size="sm"
              startContent={<PencilLine weight="bold" size={18} />}
              className="font-bold"
            >
              Ubah Sandi
            </Button>
          </div> */}
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token: string;
}> = async ({ req }) => {
  return {
    props: {
      token: req.headers["access_token"] as string,
    },
  };
};
