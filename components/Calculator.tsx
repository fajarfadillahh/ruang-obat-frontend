import { MouseEvent, useState } from "react";

export default function Calculator() {
  const [result, setResult] = useState("");

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setResult(result.concat(e.currentTarget.id));
  };

  const clear = () => {
    setResult("");
  };

  const deleteElement = () => {
    setResult(result.slice(0, -1));
  };

  const calculate = () => {
    try {
      setResult(eval(result).toString());
    } catch (error) {
      setResult("Invalid");
    }
  };

  return (
    <div className="bg-gray-white w-full rounded-xl border-2 border-gray/10 p-4">
      <input
        type="text"
        value={result}
        disabled
        className="w-full bg-transparent px-5 py-2 text-right text-2xl font-bold text-purple"
      />

      <div className="mt-4 grid grid-cols-4 gap-x-3 gap-y-4 font-semibold">
        <button
          className="rounded-xl bg-purple p-2 text-white hover:bg-purple/80"
          onClick={clear}
        >
          AC
        </button>
        <button
          className="rounded-xl bg-purple p-2 text-white hover:bg-purple/80"
          onClick={deleteElement}
        >
          DE
        </button>
        <button
          id="."
          className="rounded-xl bg-purple p-2 text-white hover:bg-purple/80"
          onClick={handleClick}
        >
          .
        </button>
        <button
          id="/"
          className="rounded-xl bg-purple p-2 text-white hover:bg-purple/80"
          onClick={handleClick}
        >
          /
        </button>

        <button
          id="7"
          className="rounded-xl bg-gray/10 p-2 text-gray hover:bg-gray/20"
          onClick={handleClick}
        >
          7
        </button>
        <button
          id="8"
          className="rounded-xl bg-gray/10 p-2 text-gray hover:bg-gray/20"
          onClick={handleClick}
        >
          8
        </button>
        <button
          id="9"
          className="rounded-xl bg-gray/10 p-2 text-gray hover:bg-gray/20"
          onClick={handleClick}
        >
          9
        </button>
        <button
          id="*"
          className="rounded-xl bg-purple p-2 text-white hover:bg-purple/80"
          onClick={handleClick}
        >
          *
        </button>

        <button
          id="4"
          className="rounded-xl bg-gray/10 p-2 text-gray hover:bg-gray/20"
          onClick={handleClick}
        >
          4
        </button>
        <button
          id="5"
          className="rounded-xl bg-gray/10 p-2 text-gray hover:bg-gray/20"
          onClick={handleClick}
        >
          5
        </button>
        <button
          id="6"
          className="rounded-xl bg-gray/10 p-2 text-gray hover:bg-gray/20"
          onClick={handleClick}
        >
          6
        </button>
        <button
          id="-"
          className="rounded-xl bg-purple p-2 text-white hover:bg-purple/80"
          onClick={handleClick}
        >
          -
        </button>

        <button
          id="1"
          className="rounded-xl bg-gray/10 p-2 text-gray hover:bg-gray/20"
          onClick={handleClick}
        >
          1
        </button>
        <button
          id="2"
          className="rounded-xl bg-gray/10 p-2 text-gray hover:bg-gray/20"
          onClick={handleClick}
        >
          2
        </button>
        <button
          id="3"
          className="rounded-xl bg-gray/10 p-2 text-gray hover:bg-gray/20"
          onClick={handleClick}
        >
          3
        </button>
        <button
          id="+"
          className="rounded-xl bg-purple p-2 text-white hover:bg-purple/80"
          onClick={handleClick}
        >
          +
        </button>

        <button
          id="00"
          className="rounded-xl bg-gray/10 p-2 text-gray hover:bg-gray/20"
          onClick={handleClick}
        >
          00
        </button>
        <button
          id="0"
          className="rounded-xl bg-gray/10 p-2 text-gray hover:bg-gray/20"
          onClick={handleClick}
        >
          0
        </button>
        <button
          id="="
          className="col-span-2 rounded-xl bg-purple p-2 text-white hover:bg-purple/80"
          onClick={calculate}
        >
          =
        </button>
      </div>
    </div>
  );
}
