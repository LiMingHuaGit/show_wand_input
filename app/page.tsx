'use client'
import { useState, useEffect } from "react";
import { MagicAnimation } from "./components/MagicAnimation";

export default function Home() {
  const [magics, setMagics] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [hasFirstInput, setHasFirstInput] = useState(false);
  const [titleFloating, setTitleFloating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isLight, setIsLight] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (currentInput.trim()) {
          setMagics(prev => [...prev, currentInput.trim()]);
          
          if (currentInput.toLowerCase().includes('upanddown')) {
            setAnimationKey(prev => prev + 1);
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
          
          setCurrentInput('');
        }
      } 
      else if (e.key === 'Backspace') {
        setCurrentInput(prev => prev.slice(0, -1));
      }
      else if (e.key.length === 1) {
        setCurrentInput(prev => prev + e.key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentInput, hasFirstInput]);

  return (
    <div className={`min-h-screen flex flex-col items-center transition-colors duration-1000 relative
      ${isLight ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <div className={`transition-all duration-1000 ease-in-out fixed
        ${hasFirstInput 
          ? 'top-0 left-0 right-0 z-10' 
          : 'inset-0 flex items-center justify-center'}`}>
        <h1 
          className={`font-magic tracking-wider transition-all duration-1000 ease-in-out text-center mx-auto
            ${hasFirstInput 
              ? 'text-3xl' + (titleFloating ? ' -translate-y-16 opacity-0' : '')
              : 'text-[120px] font-black leading-normal'
            }`}
          style={{
            textShadow: isLight
              ? '0 0 10px rgba(0, 0, 0, 0.3)'
              : '0 0 20px rgba(255, 255, 255, 0.5)'
          }}
        >
          show your magic
        </h1>
      </div>

      {showAnimation && (
        <MagicAnimation 
          key={animationKey}
          type="upanddown"
        />
      )}

      <div className={`fixed left-8 bottom-24 w-1/5 max-h-[33vh] overflow-y-auto space-y-4 
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent`}>
        {magics.map((magic, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg shadow-md animate-fade-out-slow text-base
              ${isLight ? 'bg-white/80' : 'bg-black/80'} backdrop-blur-sm`}
          >
            {magic}
          </div>
        ))}
      </div>

      <div 
        className={`fixed left-8 bottom-8 text-2xl transition-all duration-1000 ease-out
          ${currentInput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {currentInput}
      </div>
    </div>
  );
}
