'use client'
import Lottie from 'lottie-react'
import fireballAnimation from '@/public/animation/fireball.json'

export const FireballAnimation = () => {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
      <div className="w-[600px] h-[600px]">
        <Lottie
          animationData={fireballAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  )
} 