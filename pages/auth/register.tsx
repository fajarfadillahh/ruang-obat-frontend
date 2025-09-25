import Loading from "@/components/Loading";
import ModalCodeVerification from "@/components/modal/ModalCodeVerification";
import ModalTermsPrivacy from "@/components/modal/ModalTermsPrivacy";
import { authImages } from "@/data/authImages";
import { quotes } from "@/data/quotes";
import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import {
  validateEmail,
  validateFullname,
  validatePassword,
  validatePhoneNumber,
} from "@/utils/formValidators";
import { getError } from "@/utils/getError";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import {
  Buildings,
  Calendar,
  EnvelopeSimple,
  Eye,
  EyeSlash,
  IconContext,
  LockKey,
  Microscope,
  Phone,
  Pill,
  Sparkle,
  Stethoscope,
  User,
  Users,
} from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  Key,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";

const quote = quotes[Math.floor(Math.random() * quotes.length)];
const authImage = authImages[Math.floor(Math.random() * authImages.length)];

type InputState = {
  fullname: string;
  email: string;
  phone_number: string;
  gender: string;
  university: string;
  password: string;
  entry_year: string;
};

type ErrorsState = {
  fullname?: string;
  email?: string;
  phone_number?: string;
  gender?: string;
  university?: string;
  password?: string;
  entry_year?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const currentUrl = `https://ruangobat.id${router.asPath}`;
  const {
    isOpen: isTermsPrivacyOpen,
    onOpen: onTermsPrivacyOpen,
    onClose: onTermsPrivacyClose,
  } = useDisclosure();
  const {
    isOpen: isCodeVerificationOpen,
    onOpen: onCodeVerificationOpen,
    onClose: onCodeVerificationClose,
  } = useDisclosure();
  const [time, setTime] = useState(0);
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");
  const [client, setClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [errors, setErrors] = useState<ErrorsState>({});
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );
  const [input, setInput] = useState<InputState>({
    fullname: "",
    email: "",
    phone_number: "",
    gender: "",
    university: "",
    password: "",
    entry_year: "",
  });
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [loadingUniversities, setLoadingUniversities] = useState(false);
  const [searchUniversities, setSearchUniversities] = useState("");
  const [searchUniversitiesValue] = useDebounce(searchUniversities, 300);
  const [universities, setUniversities] = useState<{ name: string }[]>([]);

  const date = new Date();
  const startYear = 2015;
  const currentYear = date.getFullYear();

  const entryYears = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i,
  );

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement>,
    customValidator?: (value: string) => string | null,
  ) {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));

    if (customValidator) {
      const error = customValidator(value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  }

  async function handleCodeVerification() {
    try {
      const response: SuccessResponse<{ user_id: string; message: string }> =
        await fetcher({
          url: "/email/register",
          method: "POST",
          data: {
            email: input.email,
          },
        });

      toast.success("OTP terkirim, cek inbox atau spam!", {
        duration: 3000,
      });

      setUserId(response.data.user_id);
    } catch (error: any) {
      console.log(error);
      setUserId("");
      toast.error(getError(error));
    } finally {
      setLoadingScreen(false);
    }
  }

  async function handleVerifyOtp() {
    setLoading(true);

    try {
      const response: SuccessResponse<{ token: string }> = await fetcher({
        url: "/otp/verify",
        method: "POST",
        data: {
          user_id: userId,
          otp_code: code,
        },
      });

      handleRegister(response.data.token);
      setUserId("");
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(getError(error));
    }
  }

  async function handleRegister(token?: string) {
    try {
      await fetcher({
        url: "/auth/register/users",
        method: "POST",
        data: {
          ...input,
          token,
        },
      });

      const response = await signIn("credentials", {
        email: input.email,
        password: input.password,
        user_agent: navigator.userAgent,
        redirect: false,
      });

      if (response?.error) {
        setLoading(false);
        const { error } = JSON.parse(response?.error);

        toast.error(error.message);
      }

      if (response?.ok) {
        setLoading(false);
        setInput({
          fullname: "",
          email: "",
          phone_number: "",
          gender: "",
          university: "",
          password: "",
          entry_year: "",
        });
        onCodeVerificationClose();
        setCode("");

        toast.success("Registrasi berhasil!");
        return router.push(
          `/welcome?from=register${router.query.callback ? `&callback=${router.query.callback}` : ""}`,
        );
      }
    } catch (error: any) {
      setLoading(false);
      onCodeVerificationClose();
      setCode("");
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

  function isFormEmpty() {
    return (
      input.fullname.trim() !== "" &&
      input.email.trim() !== "" &&
      input.phone_number.trim() !== "" &&
      input.gender.trim() !== "" &&
      input.university.trim() !== "" &&
      input.password.trim() !== "" &&
      input.entry_year.trim() !== "" &&
      isSelected
    );
  }

  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    if (time) {
      const interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [time]);

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

  if (!client) {
    return;
  }

  if (loadingScreen) {
    return <Loading />;
  }

  return (
    <>
      <NextSeo
        title="Daftar Akun Untuk Mulai Belajar | RuangObat"
        description="Daftar sekarang di RuangObat dan mulai perjalanan belajarmu di dunia farmasi. Akses video pembelajaran, kelas interaktif, dan bantuan dari Apoteker ROSA. Belajar farmasi jadi lebih mudah dan efisien!"
        canonical={currentUrl}
        openGraph={{
          url: currentUrl,
          title: "Daftar Akun Untuk Mulai Belajar | RuangObat",
          description:
            "Daftar sekarang di RuangObat dan mulai perjalanan belajarmu di dunia farmasi. Akses video pembelajaran, kelas interaktif, dan bantuan dari Apoteker ROSA. Belajar farmasi jadi lebih mudah dan efisien!",
          site_name: "RuangObat",
        }}
      />

      <Head>
        <title>Daftar Akun Untuk Mulai Belajar | RuangObat</title>
      </Head>

      <main className="grid min-h-screen w-full xl:grid-cols-[580px_1fr]">
        <div className="relative isolate hidden h-full xl:block">
          <Image
            src={authImage.image}
            alt="auth image"
            width={1080}
            height={1920}
            className="h-full max-h-screen object-cover object-center grayscale"
          />

          <div className="absolute left-0 top-0 flex h-full w-full items-end bg-gradient-to-t from-purple via-purple/50 to-transparent p-8">
            <div className="grid gap-8">
              <h2 className="text-xl font-bold leading-[125%] -tracking-wide text-white md:text-2xl">
                "{quote.quote}"
              </h2>

              <div className="flex items-center gap-4">
                <Image
                  src={quote.image}
                  alt={quote.figure + " Img"}
                  width={100}
                  height={100}
                  className="size-12 rounded-full object-cover object-center"
                />

                <h3 className="text-lg font-bold text-white">{quote.figure}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="relative isolate h-full xl:h-auto">
          <div className="pointer-events-none absolute inset-0 hidden xl:block">
            <Sparkle
              className="absolute left-10 top-20 animate-pulse text-3xl text-purple/40 xl:left-20 xl:top-40 xl:text-4xl"
              weight="duotone"
            />
            <Pill
              className="absolute right-6 top-32 animate-bounce text-3xl text-purple/40 xl:right-32 xl:top-40 xl:text-4xl"
              weight="duotone"
            />
            <Microscope
              className="absolute bottom-24 right-10 animate-pulse text-3xl text-purple/40 xl:bottom-32 xl:right-16 xl:text-4xl"
              weight="duotone"
            />
            <Stethoscope
              className="absolute bottom-6 left-16 animate-bounce text-3xl text-purple/40 xl:bottom-20 xl:left-20 xl:text-4xl"
              weight="duotone"
            />
          </div>

          <div className="grid h-full grid-rows-[max-content_1fr] gap-12 p-6 xl:gap-4 xl:pb-0 xl:[padding:2rem_5rem]">
            <Link href="/" className="inline-flex w-max items-center gap-2">
              <LogoRuangobat className="h-auto w-8 text-gray/20" />
              <h3 className="text-lg font-extrabold -tracking-wide text-black">
                RuangObat<span className="text-purple">.</span>
              </h3>
            </Link>

            <div className="flex w-full flex-col items-center justify-center gap-8 justify-self-center pb-20 xl:max-w-xl xl:pb-0">
              <div className="text-center">
                <h1 className="text-2xl font-bold capitalize -tracking-wide text-black md:text-3xl">
                  Daftarkan akunmu 🚀
                </h1>

                <p className="font-medium text-gray">
                  Ayo, bergabung dengan kita di sini.
                </p>
              </div>

              <IconContext.Provider
                value={{
                  weight: "duotone",
                  size: 20,
                  className: "text-gray",
                }}
              >
                <div className="grid w-full gap-4">
                  <Input
                    isRequired
                    autoComplete="off"
                    type="text"
                    label="Nama Lengkap"
                    labelPlacement="outside"
                    placeholder="Contoh: Ahmad Megantara"
                    name="fullname"
                    value={input.fullname}
                    onChange={(e) => handleInputChange(e, validateFullname)}
                    startContent={<User />}
                    isInvalid={!!errors.fullname}
                    errorMessage={errors.fullname}
                    classNames={{
                      input: "text-sm font-medium placeholder:text-gray",
                      label: "text-black",
                    }}
                  />

                  <div className="grid gap-4 xl:grid-cols-2 xl:gap-2">
                    <Input
                      isRequired
                      autoComplete="off"
                      type="email"
                      label="Alamat Email"
                      labelPlacement="outside"
                      placeholder="Contoh: pengguna@gmail.com"
                      name="email"
                      value={input.email}
                      onChange={(e) => handleInputChange(e, validateEmail)}
                      startContent={<EnvelopeSimple />}
                      isInvalid={!!errors.email}
                      errorMessage={errors.email}
                      classNames={{
                        input: "text-sm font-medium placeholder:text-gray",
                        label: "text-black",
                      }}
                    />

                    <Input
                      isRequired
                      autoComplete="off"
                      type="text"
                      inputMode="numeric"
                      label="Nomor Telpon"
                      labelPlacement="outside"
                      placeholder="Contoh: 08xxxxxxxx"
                      name="phone_number"
                      value={input.phone_number}
                      onChange={(e) =>
                        handleInputChange(e, validatePhoneNumber)
                      }
                      startContent={<Phone />}
                      isInvalid={!!errors.phone_number}
                      errorMessage={errors.phone_number}
                      classNames={{
                        input: "text-sm font-medium placeholder:text-gray",
                        label: "text-black",
                      }}
                    />
                  </div>

                  <Autocomplete
                    isRequired
                    label="Nama Universitas"
                    labelPlacement="outside"
                    placeholder="Contoh: Universitas Pancasila"
                    inputValue={searchUniversities}
                    onInputChange={setSearchUniversities}
                    onSelectionChange={handleUniversitySelection}
                    startContent={<Buildings />}
                    isLoading={loadingUniversities}
                    selectedKey={input.university}
                    onFocus={() => {
                      if (
                        input.university &&
                        searchUniversities === input.university
                      ) {
                        setSearchUniversities("");
                      }
                    }}
                    inputProps={{
                      classNames: {
                        input: "text-sm font-medium placeholder:text-gray",
                        label: "text-black",
                      },
                    }}
                    classNames={{
                      listboxWrapper: "max-h-60",
                    }}
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

                  <div className="grid gap-4 xl:grid-cols-2 xl:gap-2">
                    <Select
                      isRequired
                      aria-label="select gender"
                      label="Jenis Kelamin"
                      labelPlacement="outside"
                      placeholder="Contoh: Laki-Laki"
                      name="gender"
                      selectedKeys={[input.gender]}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          [e.target.name]: e.target.value,
                        })
                      }
                      startContent={<Users />}
                      classNames={{
                        value: "text-sm font-medium text-gray",
                        label: "text-black",
                      }}
                    >
                      <SelectItem key="M">Laki-Laki</SelectItem>
                      <SelectItem key="F">Perempuan</SelectItem>
                    </Select>

                    <Select
                      isRequired
                      aria-label="select entry_year"
                      label="Tahun Masuk Kuliah"
                      labelPlacement="outside"
                      placeholder="Contoh: 2025"
                      name="entry_year"
                      selectedKeys={[input.entry_year]}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          [e.target.name]: e.target.value,
                        })
                      }
                      startContent={<Calendar />}
                      classNames={{
                        value: "text-sm font-medium text-gray",
                        label: "text-black",
                      }}
                    >
                      {entryYears.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year.toString()}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <Input
                    isRequired
                    autoComplete="off"
                    type={passwordType}
                    label="Password"
                    labelPlacement="outside"
                    placeholder="Min. 8 karakter"
                    name="password"
                    value={input.password}
                    onChange={(e) => handleInputChange(e, validatePassword)}
                    startContent={<LockKey />}
                    endContent={
                      <button
                        onClick={() =>
                          setPasswordType((prevType) =>
                            prevType === "password" ? "text" : "password",
                          )
                        }
                      >
                        {passwordType === "password" ? <Eye /> : <EyeSlash />}
                      </button>
                    }
                    isInvalid={!!errors.password}
                    errorMessage={errors.password}
                    classNames={{
                      input: "text-sm font-medium placeholder:text-gray",
                      label: "text-black",
                    }}
                  />
                </div>

                <div className="-mt-2 flex w-full max-w-sm items-start gap-1 self-start">
                  <Checkbox
                    size="md"
                    color="secondary"
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                  />

                  <p className="text-sm font-medium text-gray">
                    Ya, saya menyetujui{" "}
                    <span
                      onClick={onTermsPrivacyOpen}
                      className="font-bold text-black underline hover:cursor-pointer hover:text-purple"
                    >
                      Ketentuan Layanan dan Kebijakan Privasi
                    </span>{" "}
                    Ruangobat
                  </p>
                </div>

                <ModalCodeVerification
                  {...{
                    isOpen: isCodeVerificationOpen,
                    email: input.email,
                    handleCodeVerification,
                    handleVerifyOtp,
                    loading,
                    onClose: onCodeVerificationClose,
                    code,
                    setCode,
                    time,
                    setTime,
                  }}
                />

                <ModalTermsPrivacy
                  isOpen={isTermsPrivacyOpen}
                  onClose={onTermsPrivacyClose}
                />
              </IconContext.Provider>

              <div className="grid w-full gap-4">
                <Button
                  isDisabled={!isFormEmpty()}
                  color="secondary"
                  onClick={() => {
                    setLoadingScreen(true);
                    handleCodeVerification();
                    setTime(60);
                    onCodeVerificationOpen();
                  }}
                  className="font-bold"
                >
                  {loading ? "Tunggu sebentar..." : "Daftar Sekarang"}
                </Button>

                <p className="text-center text-sm font-medium text-gray">
                  Sudah punya akun?{" "}
                  <Link
                    href="/auth/login"
                    className="font-extrabold text-purple hover:underline"
                  >
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
