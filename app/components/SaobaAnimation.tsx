'use client'
import Lottie from 'lottie-react'
import saobaAnimation from '@/public/animation/saoba.json'

export const SaobaAnimation = () => {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
      <div className="w-[600px] h-[600px]">
        <Lottie
          animationData={saobaAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  )
} 