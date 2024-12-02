'use client'
import { useState, useEffect, useRef } from "react";
import { MagicAnimation } from "./components/MagicAnimation";
import { FaGithub } from 'react-icons/fa';
import { FireballAnimation } from "./components/FireballAnimation";
import { BookAnimation } from "./components/BookAnimation";
import { CupAnimation } from "./components/CupAnimation";
import { FeizeiAnimation } from "./components/FeizeiAnimation";
import { GrowAnimation } from "./components/GrowAnimation";
import { MofazhenAnimation } from "./components/MofazhenAnimation";
import { SaobaAnimation } from "./components/SaobaAnimation";

// 动画配置类型定义
type AnimationConfig = {
  // 判断是否触发动画的条件函数
  condition: (input: string) => boolean;
  // 激活动画的执行函数，接收所有状态设置器
  activate: (setters: AnimationSetters) => void;
};

// 动画所需的状态设置器类型定义
type AnimationSetters = {
  setAnimationKey: (cb: (prev: number) => number) => void;  // 控制动画重新渲染的key
  setIsLight: (value: boolean) => void;                     // 控制明暗主题切换
  setShowAnimation: (value: boolean) => void;               // 控制上下动画显示
  setShowFireball: (value: boolean) => void;                // 控制火焰动画显示
  setShowBook: (value: boolean) => void;
  setShowCup: (value: boolean) => void;
  setShowFeizei: (value: boolean) => void;
  setShowGrow: (value: boolean) => void;
  setShowMofazhen: (value: boolean) => void;
  setShowSaoba: (value: boolean) => void;
  setHasFirstInput: (value: boolean) => void;               // 控制是否有输入状态
};

// 动画配置映射表
const ANIMATION_CONFIGS: Record<string, AnimationConfig> = {
  // 上下切换动画配置
  upAndDown: {
    // 当输入包含 'upanddown' 时触发
    condition: (input: string) => input.toLowerCase().includes('upanddown'),
    // 激活动画的具体逻辑
    activate: (setters) => {
      setters.setAnimationKey(prev => prev + 1);  // 更新key触发动画重渲染
      setters.setIsLight(true);                   // 切换为亮色主题
      setters.setShowAnimation(true);             // 显示动画
      setters.setHasFirstInput(true);             // 设置已有输入状态

      // 10秒后重置所有状态
      setTimeout(() => {
        setters.setIsLight(false);
        setters.setShowAnimation(false);
        setters.setHasFirstInput(false);
      }, 3000);
    }
  },
  // 火焰动画配置
  horn: {
    // 当输入包含 'horn' 时触发
    condition: (input: string) => input.toLowerCase().includes('horn'),
    activate: (setters) => {
      setters.setShowFireball(true);      // 显示火焰动画
      setters.setHasFirstInput(true);     // 设置已有输入状态

      // 10秒后重置状态
      setTimeout(() => {
        setters.setShowFireball(false);
        setters.setHasFirstInput(false);
      }, 5000);
    }
  },
  book: {
    condition: (input: string) => input.toLowerCase().includes('book'),
    activate: (setters) => {
      setters.setShowBook(true);
      setters.setHasFirstInput(true);
      setters.setIsLight(true); 
      setTimeout(() => {
        setters.setShowBook(false);
        setters.setHasFirstInput(false);
        setters.setIsLight(false); 
      }, 3000);
    }
  },
  cup: {
    condition: (input: string) => input.toLowerCase().includes('cup'),
    activate: (setters) => {
      setters.setShowCup(true);
      setters.setHasFirstInput(true);
      setters.setIsLight(true); 
      setTimeout(() => {
        setters.setShowCup(false);
        setters.setHasFirstInput(false);
        setters.setIsLight(false); 
      }, 4600);
    }
  },
  feizei: {
    condition: (input: string) => input.toLowerCase().includes('feizei'),
    activate: (setters) => {
      setters.setShowFeizei(true);
      setters.setHasFirstInput(true);
      setters.setIsLight(true);
      setTimeout(() => {
        setters.setShowFeizei(false);
        setters.setHasFirstInput(false);
        setters.setIsLight(false); 
      }, 3000);
    }
  },
  grow: {
    condition: (input: string) => input.toLowerCase().includes('grow'),
    activate: (setters) => {
      setters.setShowGrow(true);
      setters.setHasFirstInput(true);
      setters.setIsLight(true);
      setTimeout(() => {
        setters.setShowGrow(false);
        setters.setHasFirstInput(false);
        setters.setIsLight(false); 
      }, 3500);
    }
  },
  mofazhen: {
    condition: (input: string) => input.toLowerCase().includes('mofazhen'),
    activate: (setters) => {
      setters.setShowMofazhen(true);
      setters.setHasFirstInput(true);
      setTimeout(() => {
        setters.setShowMofazhen(false);
        setters.setHasFirstInput(false);
      }, 3000);
    }
  },
  saoba: {
    condition: (input: string) => input.toLowerCase().includes('saoba'),
    activate: (setters) => {
      setters.setShowSaoba(true);
      setters.setHasFirstInput(true);
      setters.setIsLight(true);
      setTimeout(() => {
        setters.setShowSaoba(false);
        setters.setHasFirstInput(false);
      }, 3000);
    }
  }
};

export default function Home() {
  // 状态定义
  const [magics, setMagics] = useState<string[]>([]);           // 存储所有输入的魔法指令
  const [currentInput, setCurrentInput] = useState('');         // 当前输入的内容
  const [hasFirstInput, setHasFirstInput] = useState(false);    // 是否有过输入
  const [titleFloating, setTitleFloating] = useState(false);    // 标题是否浮动
  const [animationKey, setAnimationKey] = useState(0);          // 动画key，用于触发重渲染
  const [isLight, setIsLight] = useState(false);                // 是否为亮色主题
  const [showAnimation, setShowAnimation] = useState(false);     // 是否显示上下动画
  const [showFireball, setShowFireball] = useState(false);      // 是否显示火焰动画
  const [showBook, setShowBook] = useState(false);
  const [showCup, setShowCup] = useState(false);
  const [showFeizei, setShowFeizei] = useState(false);
  const [showGrow, setShowGrow] = useState(false);
  const [showMofazhen, setShowMofazhen] = useState(false);
  const [showSaoba, setShowSaoba] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);               // 滚动容器的引用

  // 处理动画触发的统一函数
  const handleAnimation = (input: string) => {
    // 收集所有状态设置器
    const setters: AnimationSetters = {
      setAnimationKey,
      setIsLight,
      setShowAnimation,
      setShowFireball,
      setShowBook,
      setShowCup,
      setShowFeizei,
      setShowGrow,
      setShowMofazhen,
      setShowSaoba,
      setHasFirstInput
    };

    // 查找匹配的动画配置
    const matchedAnimation = Object.values(ANIMATION_CONFIGS).find(
      config => config.condition(input)
    );

    // 如果找到匹配的动画配置，执行对应的动画
    if (matchedAnimation) {
      matchedAnimation.activate(setters);
    } else {
      // 没有匹配的动画时的默认行为
      if (!hasFirstInput) {
        setHasFirstInput(true);  // 第一次输入，仅设置输入状态
      } else {
        // 非第一次输入，触发标题浮动动画
        setTitleFloating(true);
        setTimeout(() => {
          setTitleFloating(false);
        }, 1000);
      }
    }
  };

  // 键盘事件处理
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {  // 回车键处理
        if (currentInput.trim()) {
          setMagics(prev => [...prev, currentInput.trim()]);  // 保存输入历史
          handleAnimation(currentInput);                       // 处理动画触发
          setCurrentInput('');                                // 清空输入
        }
      } else if (e.key === 'Backspace') {  // 退格键处理
        setCurrentInput(prev => prev.slice(0, -1));
      } else if (e.key.length === 1) {     // 普通字符输入处理
        setCurrentInput(prev => prev + e.key);
      }
    };

    // 添加和清理事件监听器
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentInput, hasFirstInput]);

  // 自动滚动到最新消息
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [magics]);

  return (
    <div className={`
      min-h-screen                     // 最小高度为屏幕高度
      flex flex-col                    // 纵向弹性布局
      items-center                     // 子元素水平居中
      transition-colors duration-1000  // 颜色过渡动画，持续1秒
      relative                        // 相对定位，作为子元素定位参考
      ${isLight ? 'bg-white text-black' : 'bg-black text-white'  // 明暗主题切换
    }`}>
      {/* 标题容器 */}
      <div className={`
        transition-all duration-1000 ease-in-out  // 所有属性过渡动画，缓入缓出
        fixed                                     // 固定定位
        ${hasFirstInput 
          ? 'top-0 left-0 right-0 z-10'          // 有输入时固定在顶部
          : 'inset-0 flex items-center justify-center'  // 无输入时居中显示
        }
      `}>
        {/* 标题文本 */}
        <h1 className={`
          font-magic                              // 使用魔法字体
          tracking-wider                          // 字间距加宽
          transition-all duration-1000 ease-in-out // 过渡动画
          text-center mx-auto                     // 文本居中
          ${hasFirstInput 
            ? 'text-3xl' +                        // 有输入时字体较小
              (titleFloating ? ' -translate-y-16 opacity-0' : '')  // 浮动动画
            : 'text-[120px] font-black leading-normal'            // 无输入时字体大
          }
        `}
          style={{
            textShadow: isLight
              ? '0 0 10px rgba(0, 0, 0, 0.3)'    // 亮色主题阴影
              : '0 0 20px rgba(255, 255, 255, 0.5)'  // 暗色主题阴影
          }}
        >
          show your magic
        </h1>
      </div>

      {/* 动画组件 */}
      {showAnimation && (
        <MagicAnimation 
          key={animationKey}
          type="upanddown"
        />
      )}

      {showFireball && <FireballAnimation />}
      {showBook && <BookAnimation />}
      {showCup && <CupAnimation />}
      {showFeizei && <FeizeiAnimation />}
      {showGrow && <GrowAnimation />}
      {showMofazhen && <MofazhenAnimation />}
      {showSaoba && <SaobaAnimation />}

      {/* 指令历史列表 */}
      <div ref={scrollRef}
        className={`
          fixed left-8 bottom-24           // 固定在左下角
          w-1/5                           // 宽度为屏幕的1/5
          max-h-[33vh]                    // 最大高度为视口高度的1/3
          overflow-y-auto                 // 垂直方向可滚动
          space-y-4                       // 子元素间距
          scrollbar-none                  // 隐藏滚动条
        `}
      >
        {magics.map((magic, index) => (
          <div key={index}
            className={`
              p-4                         // 内边距
              rounded-lg                  // 圆角
              shadow-md                   // 阴影
              animate-fade-out-slow       // 淡出动画
              text-base                   // 基础文字大小
              ${isLight ? 'bg-white/80' : 'bg-black/80'}  // 半透明背景
              backdrop-blur-sm            // 背景模糊效果
            `}
          >
            {magic}
          </div>
        ))}
      </div>

      {/* 当前输入显示 */}
      <div className={`
        fixed left-8 bottom-8            // 固定在左下角
        text-2xl                         // 文字大小
        transition-all duration-1000 ease-out  // 过渡动画
        ${currentInput 
          ? 'opacity-100 translate-y-0'   // 有输入时显示
          : 'opacity-0 translate-y-10'    // 无输入时隐藏并下移
        }
      `}>
        {currentInput}
      </div>

      {/* GitHub 链接 */}
      <a href="https://github.com/LiMingHuaGit/show_wand_input"
        target="_blank"
        rel="noopener noreferrer"
        className={`
          absolute top-8 right-8         // 固定在右上角
          text-3xl                       // 图标大小
          hover:text-gray-900           // 悬停时颜色
          dark:text-white               // 暗色主题文字颜色
          dark:hover:text-gray-200      // 暗色主题悬停颜色
          transition-colors              // 颜色过渡动画
          z-50                          // 保持在最上层
        `}
        aria-label="GitHub repository"   // 无障碍标签
      >
        <FaGithub />
      </a>
    </div>
  );
}
