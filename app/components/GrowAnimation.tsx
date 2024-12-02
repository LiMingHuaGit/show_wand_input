'use client'
import Lottie from 'lottie-react'
import growAnimation from '@/public/animation/grow.json'

export const GrowAnimation = () => {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
      <div className="w-[600px] h-[600px]">
        <Lottie
          animationData={growAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  )
} 