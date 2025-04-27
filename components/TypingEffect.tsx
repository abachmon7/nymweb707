import { useEffect, useState } from 'react'

interface TypingEffectProps {
  text: string
  speed?: number
}

export default function TypingEffect({ text, speed = 35 }: TypingEffectProps) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i))
      i++
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <span style={{ whiteSpace: 'pre-line' }}>
      {displayed}
      <span className="blinker" style={{ opacity: 0.5 }}>|</span>
      <style>{`
        .blinker {
          animation: blink 1s linear infinite;
        }
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </span>
  )
}