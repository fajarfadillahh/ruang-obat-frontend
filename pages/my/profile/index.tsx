import Layout from "@/components/wrapper/Layout";
import { Button, Input } from "@nextui-org/react";
import { PencilLine } from "@phosphor-icons/react";
import Image from "next/image";

export default function MyProfilePage() {
  return (
    <Layout title="Profil Saya">
      <section className="grid gap-8 pb-16">
        <h1 className="text-[24px] font-extrabold -tracking-wide text-black">
          Profil Saya 🧑
        </h1>

        <div className="divide-y-2 divide-dashed divide-gray/20">
          <div className="inline-flex items-center gap-4 pb-8">
            <Image
              src="/img/avatar-male.svg"
              alt="profile img"
              width={500}
              height={500}
              className="size-[100px] rounded-full border-3 border-purple bg-purple/10 object-cover object-center p-1"
            />

            <div className="space-y-1">
              <h4 className="text-[20px] font-bold text-black">
                Fadillah Testing
              </h4>
              <p className="text-sm font-medium text-gray">ROUFT670221</p>
              <p className="text-sm font-medium text-gray">
                Universitas Testing
              </p>
            </div>
          </div>

          <div className="grid gap-4 py-8">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-[20px] font-bold text-black">
                Informasi Personal
              </h4>

              <Button
                variant="bordered"
                color="secondary"
                size="sm"
                startContent={<PencilLine weight="bold" size={18} />}
                className="font-bold"
              >
                Edit Profil
              </Button>
            </div>

            <div className="grid max-w-[800px] gap-y-6 sm:grid-cols-2 sm:grid-rows-3 sm:gap-x-2">
              <Input
                readOnly
                type="text"
                variant="flat"
                label="Nama Lengkap"
                labelPlacement="outside"
                defaultValue="Fajar Fadillah Agustian"
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Input
                readOnly
                type="text"
                variant="flat"
                label="Jenis Kelamin"
                labelPlacement="outside"
                defaultValue="Laki-Laki"
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Input
                readOnly
                type="text"
                variant="flat"
                label="Email"
                labelPlacement="outside"
                defaultValue="fadillahtesting@mail.com"
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Input
                readOnly
                type="text"
                variant="flat"
                label="No. Telpon"
                labelPlacement="outside"
                defaultValue="088888888888"
                classNames={{
                  input:
                    "font-semibold placeholder:font-semibold placeholder:text-gray",
                }}
              />

              <Input
                readOnly
                type="text"
                variant="flat"
                label="Asal Kampus"
                labelPlacement="outside"
                defaultValue="Universitas Testing"
                className="sm:col-span-2"
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
              variant="bordered"
              color="secondary"
              size="sm"
              startContent={<PencilLine weight="bold" size={18} />}
              className="font-bold"
            >
              Ubah Sandi
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
