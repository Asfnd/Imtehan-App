'use client'

import { useState, useEffect } from 'react'

interface AnimatedTextProps {
  words: string[]
  interval?: number
}

export function AnimatedText({ words, interval = 1400 }: AnimatedTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <span
      className="inline-block relative overflow-hidden"
      style={{
        width: '11.5ch',
        height: '1.4em',
        verticalAlign: 'baseline',
        lineHeight: '1.4em'
      }}
    >
      {words.map((word, index) => (
        <span
          key={word}
          className="absolute left-0 text-gray-500 whitespace-nowrap transition-all duration-350 ease-in-out"
          style={{
            top: '0.18em',
            opacity: currentWordIndex === index ? 1 : 0,
            transform: currentWordIndex === index
              ? 'translateY(0)'
              : currentWordIndex === (index - 1 + words.length) % words.length
              ? 'translateY(-100%)'
              : 'translateY(100%)',
            pointerEvents: currentWordIndex === index ? 'auto' : 'none'
          }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}
