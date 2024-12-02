'use client'
import Lottie from 'lottie-react'
import mofazhenAnimation from '@/public/animation/mofazhen.json'

export const MofazhenAnimation = () => {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
      <div className="w-[600px] h-[600px]">
        <Lottie
          animationData={mofazhenAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  )
} 