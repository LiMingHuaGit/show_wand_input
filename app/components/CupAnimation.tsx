'use client'
import Lottie from 'lottie-react'
import cupAnimation from '@/public/animation/cup.json'

export const CupAnimation = () => {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
      <div className="w-[600px] h-[600px]">
        <Lottie
          animationData={cupAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  )
} 