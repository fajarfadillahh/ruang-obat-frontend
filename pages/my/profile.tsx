import CustomTooltip from "@/components/CustomTooltip";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { UserDataResponse } from "@/types/profile.type";
import { customInputClassnames } from "@/utils/customInputClassnames";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { getError } from "@/utils/getError";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Select,
  SelectItem,
  Snippet,
} from "@nextui-org/react";
import {
  Check,
  Copy,
  FloppyDisk,
  SealCheck,
  XCircle,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";
import { authOptions } from "../api/auth/[...nextauth]";

type InputState = {
  fullname: string;
  email: string;
  phone_number: string;
  gender: string;
  university: string;
  entry_year: string;
};

export default function MyProfilePage({
  data,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [input, setInput] = useState<InputState>({
    fullname: `${data?.fullname}`,
    email: `${data?.email}`,
    phone_number: `${data?.phone_number}`,
    gender: `${data?.gender}`,
    university: `${data?.university}`,
    entry_year: `${data?.entry_year}`,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [loadingUniversities, setLoadingUniversities] = useState(false);
  const [searchUniversities, setSearchUniversities] = useState(
    input.university,
  );
  const [searchUniversitiesValue] = useDebounce(searchUniversities, 300);
  const [universities, setUniversities] = useState<{ name: string }[]>([]);

  const date = new Date();
  const startYear = 2015;
  const currentYear = date.getFullYear();
  const entryYears = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i,
  );

  async function handleSave() {
    setLoading(true);

    try {
      const payload = {
        fullname: input?.fullname,
        phone_number: input?.phone_number,
        university: input?.university,
        entry_year: input?.entry_year,
        gender: input?.gender,
      };

      await fetcher({
        url: "/my/profile",
        method: "PATCH",
        data: payload,
        token,
      });

      toast.success("Profil kamu berhasil diperbarui!");
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      setLoading(false);

      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  }

  const fetchUniversities = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setUniversities([]);
      return;
    }

    setLoadingUniversities(true);

    try {
      const response: SuccessResponse<{ name: string }[]> = await fetcher({
        url: `/universities/search?q=${query}`,
        method: "GET",
      });

      setUniversities(response.data);
    } catch (error) {
      console.error(error);
      setUniversities([]);
    } finally {
      setLoadingUniversities(false);
    }
  }, []);

  useEffect(() => {
    fetchUniversities(searchUniversitiesValue);
  }, [searchUniversitiesValue, fetchUniversities]);

  const universityOptions = useMemo(() => {
    return universities.slice(0, 15);
  }, [universities]);

  const handleUniversitySelection = useCallback((selectedKey: Key | null) => {
    if (selectedKey) {
      setInput((prev) => ({
        ...prev,
        university: `${selectedKey}`,
      }));
      setSearchUniversities(`${selectedKey}`);
    }
  }, []);

  return (
    <Layout title="Profil Saya">
      <section className="grid gap-8 [padding:50px_0_100px]">
        <h1 className="text-2xl font-extrabold -tracking-wide text-black">
          Profil Saya 🧑
        </h1>

        <div className="divide-y-2 divide-dashed divide-gray/20">
          <div className="inline-flex items-center gap-4 pb-10">
            <Image
              src={
                data?.gender === "M"
                  ? "=https://cdn.ruangobat.id/statics/images/avatar-img/avatar-male.svg"
                  : "=https://cdn.ruangobat.id/statics/images/avatar-img/avatar-female.svg"
              }
              alt="profile img"
              width={500}
              height={500}
              className="size-[100px] rounded-full border-3 border-purple bg-purple/10 object-cover object-center p-1"
            />

            <div className="grid">
              <h4 className="text-2xl font-bold text-black">
                {data?.fullname}
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
                {data?.user_id}
              </Snippet>

              <p className="font-medium text-gray">{data?.university}</p>
            </div>
          </div>

          <div className="grid gap-4 py-10">
            <h4 className="text-xl font-bold text-black">Informasi Personal</h4>

            <div className="grid max-w-[800px] gap-y-6 sm:grid-cols-2 sm:gap-x-2">
              <Input
                readOnly
                type="text"
                variant="flat"
                label="Alamat Email"
                labelPlacement="outside"
                placeholder="Masukan Alamat Email"
                endContent={
                  data?.is_verified ? (
                    <CustomTooltip content="Terverifikasi">
                      <SealCheck
                        weight="fill"
                        size={20}
                        className="text-success"
                      />
                    </CustomTooltip>
                  ) : (
                    <CustomTooltip content="Belum Terverifikasi">
                      <XCircle
                        weight="fill"
                        size={20}
                        className="text-danger"
                      />
                    </CustomTooltip>
                  )
                }
                name="email"
                value={input.email}
                className="sm:col-span-2 sm:max-w-[396px]"
                classNames={customInputClassnames}
              />

              <Input
                type="text"
                variant="flat"
                label="Nama Lengkap"
                labelPlacement="outside"
                placeholder="Masukan Nama Lengkap"
                name="fullname"
                value={input.fullname}
                onChange={(e) =>
                  setInput({ ...input, fullname: e.target.value })
                }
                classNames={customInputClassnames}
              />

              <Select
                aria-label="select gender"
                variant="flat"
                label="Jenis Kelamin"
                labelPlacement="outside"
                placeholder="Jenis Kelamin"
                name="gender"
                selectedKeys={[input.gender]}
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  })
                }
                classNames={{
                  value: "font-semibold text-gray",
                }}
              >
                <SelectItem key="M">Laki-Laki</SelectItem>
                <SelectItem key="F">Perempuan</SelectItem>
              </Select>

              <Autocomplete
                variant="flat"
                label="Asal Universitas"
                labelPlacement="outside"
                placeholder="Masukan Nama Universitas"
                inputValue={searchUniversities}
                onInputChange={setSearchUniversities}
                onSelectionChange={handleUniversitySelection}
                isLoading={loadingUniversities}
                inputProps={{
                  classNames: {
                    input:
                      "font-semibold placeholder:font-semibold placeholder:text-gray",
                  },
                }}
                classNames={{
                  listboxWrapper: "max-h-60",
                }}
                onFocus={() => {
                  if (
                    input.university &&
                    searchUniversities === input.university
                  ) {
                    setSearchUniversities("");
                  }
                }}
                selectedKey={input.university}
              >
                {universityOptions.map((university) => (
                  <AutocompleteItem
                    key={university.name}
                    value={university.name}
                    textValue={university.name}
                  >
                    {university.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>

              <Select
                aria-label="select year"
                variant="flat"
                label="Tahun Masuk Kuliah"
                labelPlacement="outside"
                placeholder="Tahun Masuk Kuliah"
                name="gender"
                selectedKeys={[input.entry_year]}
                onSelectionChange={(keys) =>
                  setInput({
                    ...input,
                    entry_year: Array.from(keys)[0] as string,
                  })
                }
                classNames={{
                  value: "font-semibold text-gray",
                }}
              >
                {entryYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year.toString()}
                  </SelectItem>
                ))}
              </Select>

              <Input
                type="number"
                inputMode="text"
                variant="flat"
                label="No. Telpon"
                labelPlacement="outside"
                placeholder="Masukan No. Telpon"
                name="phone_number"
                value={input.phone_number}
                onChange={(e) =>
                  setInput({ ...input, phone_number: e.target.value })
                }
                classNames={customInputClassnames}
              />
            </div>

            <Button
              isLoading={loading}
              color="secondary"
              startContent={!loading && <FloppyDisk weight="bold" size={18} />}
              onClick={handleSave}
              className="mt-6 w-max font-bold"
            >
              Simpan Perubahan
            </Button>

            <p className="mt-12 text-sm font-medium text-gray">
              Akun dibuat pada: {formatDate(data?.created_at as string)}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token: string;
  data?: UserDataResponse;
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  const token = session?.user.access_token as string;
  const response: SuccessResponse<UserDataResponse> = await fetcher({
    url: "/my/profile",
    method: "GET",
    token,
  });

  return {
    props: {
      data: response.data,
      token,
    },
  };
};
