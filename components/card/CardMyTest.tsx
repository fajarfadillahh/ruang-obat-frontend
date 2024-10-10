import { MyTestType } from "@/types/tests.type";
import { formatDate } from "@/utils/formatDate";
import { CalendarCheck, Medal } from "@phosphor-icons/react";
import Link from "next/link";

export default function CardMyTest(test: MyTestType) {
  return (
    <Link
      href={`/tests/${test.test_id}/finish`}
      className="group relative flex max-w-[380px] items-start gap-4 rounded-xl border-2 border-gray/20 bg-transparent p-6 hover:cursor-pointer hover:bg-gray/10 xl:max-w-none"
    >
      <Medal weight="bold" size={32} className="text-purple" />

      <div className="flex-1 divide-y-2 divide-dashed divide-gray/20">
        <div className="grid gap-3 pb-4">
          <h4 className="line-clamp-2 text-[18px] font-bold leading-[120%] -tracking-wide text-black group-hover:text-purple">
            {test.title}
          </h4>
        </div>

        <div className="flex items-center justify-between gap-2 pt-4">
          <div className="inline-flex items-center gap-1 text-gray">
            🏆
            <p className="text-[12px] font-semibold">{test.score}</p>
          </div>

          <div className="inline-flex items-center gap-1 text-gray">
            <CalendarCheck weight="bold" size={14} />
            <p className="text-[12px] font-semibold">
              {formatDate(test.created_at)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
