'use client'
import { useEffect, useState } from 'react';

interface MagicAnimationProps {
  type: string;
}

export const MagicAnimation = ({ type }: MagicAnimationProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  switch (type.toLowerCase()) {
    case 'upanddown':
      return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[60vw] h-[50vh] flex items-center justify-center">
            <div className="relative">
              {/* 灯泡线 */}
              <div className="absolute top-0 left-1/2 w-1 h-20 bg-gray-300 transform -translate-x-1/2 -translate-y-full" />
              
              {/* 灯泡 */}
              <div className="relative w-32 h-32">
                {/* 灯泡玻璃 */}
                <div className="absolute inset-0 rounded-full bg-yellow-100 animate-bulb-glow">
                  {/* 内部光芒 */}
                  <div className="absolute inset-2 rounded-full bg-yellow-200 animate-inner-glow" />
                  <div className="absolute inset-4 rounded-full bg-yellow-300 animate-core-glow" />
                </div>
                
                {/* 灯泡底座 */}
                <div className="absolute bottom-0 left-1/2 w-8 h-6 bg-gray-400 transform -translate-x-1/2 translate-y-4 rounded-b-lg" />
                
                {/* 光晕效果 */}
                <div className="absolute inset-0 rounded-full bg-yellow-400/20 animate-halo blur-xl" />
              </div>
            </div>
          </div>
        </div>
      );
    
    default:
      return null;
  }
}; 