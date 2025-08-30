import { MyTestType } from "@/types/tests.type";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { CalendarDots, Medal, Trophy } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function CardMyTest(test: MyTestType) {
  const router = useRouter();

  return (
    <div
      className="group flex items-start gap-4 rounded-xl border-2 border-gray/10 p-6 hover:cursor-pointer hover:bg-purple/10"
      onClick={() =>
        router.push({
          pathname: `/results/${test.result_id}`,
          query: {
            title: test.title,
          },
        })
      }
    >
      <Medal weight="duotone" size={32} className="text-purple" />

      <div className="flex-1 divide-y-2 divide-dashed divide-gray/20">
        <h4 className="line-clamp-2 pb-4 text-lg font-bold -tracking-wide text-black group-hover:text-purple">
          {test.title}
        </h4>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <div className="inline-flex items-center gap-1 text-purple">
            <Trophy weight="duotone" size={24} />

            <p className="text-lg font-bold">{test.score}</p>
          </div>

          <div className="inline-flex items-start gap-1 text-gray">
            <CalendarDots weight="duotone" size={18} />

            <p className="text-sm font-semibold">
              {formatDateWithoutTime(test.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
