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
    <div className="bg-gray-white w-80 rounded-lg p-4 shadow-lg">
      <input
        type="text"
        value={result}
        disabled
        className="w-full bg-transparent px-5 py-1 text-right text-2xl text-purple"
      />

      <div className="mt-4 grid grid-cols-4 gap-x-3 gap-y-4">
        <button className="rounded-lg bg-purple p-2 text-white" onClick={clear}>
          AC
        </button>
        <button
          className="rounded-lg bg-purple p-2 text-white"
          onClick={deleteElement}
        >
          DE
        </button>
        <button
          id="."
          className="rounded-lg bg-purple p-2 text-white"
          onClick={handleClick}
        >
          .
        </button>
        <button
          id="/"
          className="rounded-lg bg-purple p-2 text-white"
          onClick={handleClick}
        >
          /
        </button>

        <button
          id="7"
          className="rounded-lg bg-gray-200 p-2 text-gray-700"
          onClick={handleClick}
        >
          7
        </button>
        <button
          id="8"
          className="rounded-lg bg-gray-200 p-2 text-gray-700"
          onClick={handleClick}
        >
          8
        </button>
        <button
          id="9"
          className="rounded-lg bg-gray-200 p-2 text-gray-700"
          onClick={handleClick}
        >
          9
        </button>
        <button
          id="*"
          className="rounded-lg bg-purple p-2 text-white"
          onClick={handleClick}
        >
          *
        </button>

        <button
          id="4"
          className="rounded-lg bg-gray-200 p-2 text-gray-700"
          onClick={handleClick}
        >
          4
        </button>
        <button
          id="5"
          className="rounded-lg bg-gray-200 p-2 text-gray-700"
          onClick={handleClick}
        >
          5
        </button>
        <button
          id="6"
          className="rounded-lg bg-gray-200 p-2 text-gray-700"
          onClick={handleClick}
        >
          6
        </button>
        <button
          id="-"
          className="rounded-lg bg-purple p-2 text-white"
          onClick={handleClick}
        >
          -
        </button>

        <button
          id="1"
          className="rounded-lg bg-gray-200 p-2 text-gray-700"
          onClick={handleClick}
        >
          1
        </button>
        <button
          id="2"
          className="rounded-lg bg-gray-200 p-2 text-gray-700"
          onClick={handleClick}
        >
          2
        </button>
        <button
          id="3"
          className="rounded-lg bg-gray-200 p-2 text-gray-700"
          onClick={handleClick}
        >
          3
        </button>
        <button
          id="+"
          className="rounded-lg bg-purple p-2 text-white"
          onClick={handleClick}
        >
          +
        </button>

        <button
          id="00"
          className="rounded-lg bg-gray-200 p-2 text-gray-700"
          onClick={handleClick}
        >
          00
        </button>
        <button
          id="0"
          className="rounded-lg bg-gray-200 p-2 text-gray-700"
          onClick={handleClick}
        >
          0
        </button>
        <button
          id="="
          className="col-span-2 rounded-lg bg-purple p-2 text-white"
          onClick={calculate}
        >
          =
        </button>
      </div>
    </div>
  );
}
