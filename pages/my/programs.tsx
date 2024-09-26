import { programs } from "@/_dummy/programs";
import CardProgram from "@/components/card/CardProgram";
import Layout from "@/components/wrapper/Layout";

export default function MyProgramsPage() {
  return (
    <Layout title="Program Saya">
      <section className="grid gap-6 pt-8">
        <h1 className="text-[24px] font-extrabold -tracking-wide text-black">
          Program Saya 📋
        </h1>

        <div className="grid grid-cols-3 gap-8">
          {programs.slice(0, 1).map((program) => (
            <CardProgram key={program.id} {...program} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
