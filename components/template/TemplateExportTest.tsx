import { ResultType } from "@/types/results.type";
import { chunkArray } from "@/utils/chunkArray";
import { Chip } from "@nextui-org/react";
import { Check, Circle, IconContext, X } from "@phosphor-icons/react";

type TemplateExportTestProps = {
  data?: ResultType;
  id?: string;
};

export default function TemplateExportTest({
  data,
  id,
}: TemplateExportTestProps) {
  const questionsPerPage = chunkArray(data?.questions || [], 2);

  function getClassName(question: any, option: any) {
    const isSelected = question.user_answer === option.option_id;
    const isCorrect =
      (question.is_correct && isSelected) ||
      question.correct_option === option.option_id;

    return isCorrect
      ? "text-success"
      : isSelected
        ? "text-danger"
        : "text-gray/80";
  }

  function getIcon(question: any, option: any) {
    const isSelected = question.user_answer == option.option_id;
    const isCorrect =
      (question.is_correct && isSelected) ||
      question.correct_option == option.option_id;

    return isCorrect ? <Check /> : isSelected ? <X /> : <Circle />;
  }

  return (
    <div
      id={id as string}
      className="h-max w-full overflow-hidden bg-white font-medium leading-[170%] text-black"
    >
      {questionsPerPage.map((pageQuestions, index) => (
        <div key={index} className="space-y-3">
          <div className="font-medium text-black">
            Copyrights by{" "}
            <Chip
              color="secondary"
              size="sm"
              classNames={{
                base: "px-2",
                content: "font-bold capitalize",
              }}
            >
              Ruangobat.id
            </Chip>
          </div>

          {pageQuestions.map((question, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="z-10 font-bold">{question.number}.</div>

              <div className="z-10 grid flex-1 gap-2">
                <p
                  className="preventive-list preventive-table list-outside font-semibold leading-[170%] text-black"
                  dangerouslySetInnerHTML={{
                    __html: question?.text as string,
                  }}
                />

                <div className="grid gap-1">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="inline-flex list-outside list-disc items-center gap-2"
                    >
                      <IconContext.Provider
                        value={{
                          weight: "bold",
                          size: 18,
                          className: getClassName(question, option),
                        }}
                      >
                        <div className="text-[12px]">
                          {getIcon(question, option)}
                        </div>
                      </IconContext.Provider>
                      <p
                        className={`font-semibold ${getClassName(question, option)}`}
                      >
                        {option.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-2">
                  <h2 className="font-bold">Pembahasan:</h2>
                  <p
                    className="preventive-list preventive-table list-outside font-semibold leading-[170%] text-black"
                    dangerouslySetInnerHTML={{
                      __html: question?.explanation as string,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="break-after-page" />
        </div>
      ))}
    </div>
  );
}
