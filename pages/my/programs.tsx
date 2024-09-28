import { programs } from "@/_dummy/programs";
import CardProgram from "@/components/card/CardProgram";
import Layout from "@/components/wrapper/Layout";

export default function MyProgramsPage() {
  return (
    <Layout title="Program Saya">
      <section className="mx-auto grid gap-6 pt-8 md:max-w-[770px] xl:max-w-none">
        <h1 className="text-[24px] font-extrabold -tracking-wide text-black">
          Program Saya 📋
        </h1>

        <div className="grid items-start justify-center gap-2 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {programs.slice(0, 1).map((program) => (
            <CardProgram key={program.id} {...program} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
