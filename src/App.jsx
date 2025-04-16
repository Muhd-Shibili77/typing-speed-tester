import { useEffect, useRef, useState } from "react";

const TEXTS = [
  "The quick brown fox jumps over the lazy dog.",
  "React and Vite make development lightning fast.",
  "Practice daily to improve your typing speed.",
  "Frontend development is both art and logic."
];

export default function App() {
  const [targetText, setTargetText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    resetTest();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    if (!startTime) setStartTime(Date.now());

    if (value.trim() === targetText.trim()) {
      
      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000 / 60;
      const words = value.trim().split(" ").length;
      const correctChars = [...value].filter((char, i) => char === targetText[i]).length;
      const accuracyCalc = Math.round((correctChars / targetText.length) * 100);

      setWpm(Math.round(words / timeTaken));
      setAccuracy(accuracyCalc);
    }

    setInput(value);
  };

  const resetTest = () => {
    setTargetText(TEXTS[Math.floor(Math.random() * TEXTS.length)]);
    setInput("");
    setStartTime(null);
    setWpm(null);
    setAccuracy(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const getCharClass = (char, index) => {
    if (!input[index]) return "text-gray-500";
    if (input[index] === char) return "text-green-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 px-4 text-white">
      <div className="bg-slate-700 shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Typing Speed Tester</h1>

        <div className="bg-slate-800 p-4 rounded-md mb-4 min-h-[100px] text-lg leading-relaxed tracking-wide">
          {targetText.split("").map((char, i) => (
            <span key={i} className={getCharClass(char, i)}>
              {char}
            </span>
          ))}
        </div>

        <textarea
          ref={inputRef}
          rows="3"
          value={input}
          onChange={handleChange}
          className="w-full p-4 rounded-md bg-slate-900 text-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          placeholder="Start typing here..."
        />

        {wpm !== null && (
          <div className="flex justify-around text-lg text-green-400 font-medium mb-4">
            <p><span className="text-white">WPM:</span> {wpm}</p>
            <p><span className="text-white">Accuracy:</span> {accuracy}%</p>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={resetTest}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
