import Image from "next/image";

export default function ChatWelcome() {
  return (
    <div className="mt-8 grid h-max gap-4 xl:mt-0">
      <Image
        priority
        src="https://ruangobat.is3.cloudhost.id/statics/images/apoteker-rosa/APOTEKER-ROSA-4.webp"
        alt="apoteker rosa image"
        width={250}
        height={250}
        className="justify-self-center"
      />

      <div className="grid justify-items-center gap-2 text-center">
        <h1 className="text-2xl font-extrabold text-black">
          ROSA (Ruang Obat Smart Assistant) 💊
        </h1>

        <p className="max-w-[600px] font-medium leading-[170%] text-gray">
          Hi, aku ROSA yang siap bantu kamu menjawab berbagai pertanyaan seputar
          dunia Farmasi dan layanan belajar di Ruang Obat ✨.
        </p>
      </div>
    </div>
  );
}
