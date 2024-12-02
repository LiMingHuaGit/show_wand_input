'use client'
import Lottie from 'lottie-react'
import feizeiAnimation from '@/public/animation/feizei.json'

export const FeizeiAnimation = () => {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
      <div className="w-[600px] h-[600px]">
        <Lottie
          animationData={feizeiAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  )
} 