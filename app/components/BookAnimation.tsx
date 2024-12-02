'use client'
import Lottie from 'lottie-react'
import bookAnimation from '@/public/animation/book.json'

export const BookAnimation = () => {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
      <div className="w-[600px] h-[600px]">
        <Lottie
          animationData={bookAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  )
} 