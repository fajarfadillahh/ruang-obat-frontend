import { LogoRuangobat } from "@/public/img/LogoRuangobat";
import { ResultType } from "@/types/results.type";
import { chunkArray } from "@/utils/chunkArray";
import { Check, X } from "@phosphor-icons/react";

type TemplateExportTestProps = {
  data?: ResultType;
};

export default function TemplateExportTest({ data }: TemplateExportTestProps) {
  const questionsPerPage = chunkArray(data?.questions || [], 2);

  return (
    <div className="h-max w-full overflow-hidden bg-white text-sm font-medium leading-[170%] text-black">
      {questionsPerPage.map((pageQuestions, index) => (
        <div key={index} className="space-y-3">
          {pageQuestions.map((question, index) => (
            <div key={index} className="relative grid h-max items-center">
              <div className="flex items-start gap-2">
                <div className="z-10 font-bold">{question.number}.</div>

                <div className="z-10 grid flex-1 gap-2">
                  <div>{question.text}</div>

                  <div className="grid gap-1">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="inline-flex list-outside list-disc items-center gap-2"
                      >
                        <div className="text-[12px]">
                          {option.is_correct ? (
                            <Check
                              weight="bold"
                              size={18}
                              className="text-success"
                            />
                          ) : (
                            <X
                              weight="bold"
                              size={18}
                              className="text-danger"
                            />
                          )}
                        </div>
                        <p
                          className={`${
                            option.is_correct
                              ? "font-bold text-success"
                              : "text-danger"
                          }`}
                        >
                          {option.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2">
                    <h2 className="font-bold">Pembahasan:</h2>
                    <p>{question.explanation}</p>
                  </div>
                </div>
              </div>

              {/* watermark */}
              <div className="absolute inline-flex rotate-45 place-content-center items-center gap-2 justify-self-center opacity-10 grayscale-0">
                <LogoRuangobat className="h-auto w-10" />
                <h1 className="text-[32px] font-extrabold -tracking-wide text-black">
                  RuangObat.
                </h1>
              </div>
            </div>
          ))}

          <div className="break-after-page" />
        </div>
      ))}
    </div>
  );
}
