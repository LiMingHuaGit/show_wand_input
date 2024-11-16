"use client";
import { useState, useEffect } from "react";
import { MagicAnimation } from "./components/MagicAnimation";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const [magics, setMagics] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [hasFirstInput, setHasFirstInput] = useState(false);
  const [titleFloating, setTitleFloating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isLight, setIsLight] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (currentInput.trim()) {
          setMagics((prev) => [...prev, currentInput.trim()]);

          if (currentInput.toLowerCase().includes("upanddown")) {
            setAnimationKey((prev) => prev + 1);
            setIsLight(true);
            setShowAnimation(true);
            setHasFirstInput(true);

            setTimeout(() => {
              setIsLight(false);
              setShowAnimation(false);
              setHasFirstInput(false);
            }, 10000);
          } else {
            if (!hasFirstInput) {
              setHasFirstInput(true);
            } else {
              setTitleFloating(true);
              setTimeout(() => {
                setTitleFloating(false);
              }, 1000);
            }
          }

          setCurrentInput("");
        }
      } else if (e.key === "Backspace") {
        setCurrentInput((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        setCurrentInput((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentInput, hasFirstInput]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center transition-colors duration-1000 relative
      ${isLight ? "bg-white text-black" : "bg-black text-white"}`}>
      <a
        href="https://github.com/LiMingHuaGit/show_wand_input"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-4 text-2xl transition-transform hover:scale-110 z-50" // 增加 z-50
        title="GitHub Repository">
        <FaGithub className={isLight ? "text-black" : "text-white"} />
      </a>
      <div
        className={`transition-all duration-1000 ease-in-out fixed inset-0 flex items-center justify-center z-10`}>
        <h1
          className={`font-magic tracking-wider transition-all duration-1000 ease-in-out text-center mx-auto text-[120px] font-black leading-normal`}
          style={{
            textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
          }}>
          show your magic
        </h1>
      </div>

      {showAnimation && <MagicAnimation key={animationKey} type="upanddown" />}

      <div
        className={`fixed left-8 bottom-24 w-1/5 max-h-[33vh] overflow-y-auto space-y-4 
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent`}>
        {magics.map((magic, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md animate-fade-out-slow text-base
              ${isLight ? "bg-white/80" : "bg-black/80"} backdrop-blur-sm`}>
            {magic}
          </div>
        ))}
      </div>

      <div
        className={`fixed left-8 bottom-8 text-2xl transition-all duration-1000 ease-out
          ${
            currentInput
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}>
        {currentInput}
      </div>
    </div>
  );
}
