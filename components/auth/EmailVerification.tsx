'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, RefreshCw } from 'lucide-react'
import { Button } from '../ui/Button'
import { toast } from '../ui/Toast'

interface EmailVerificationProps {
  email: string
  username: string
  onVerified: () => void
}

export function EmailVerification({
  email,
  username,
  onVerified,
}: EmailVerificationProps) {
  const router = useRouter()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return // Only allow single digit

    const newCode = [...code]
    newCode[index] = value

    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }

    // Auto-submit when all digits entered
    if (newCode.every(digit => digit !== '') && !loading) {
      handleVerify(newCode.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    const newCode = pastedData.split('').concat(Array(6).fill('')).slice(0, 6)
    setCode(newCode)

    if (newCode.every(digit => digit !== '')) {
      handleVerify(newCode.join(''))
    }
  }

  const handleVerify = async (verificationCode: string) => {
    setLoading(true)

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Verification failed')
        setCode(['', '', '', '', '', ''])
        document.getElementById('code-0')?.focus()
        setLoading(false)
        return
      }

      toast.success('Email verified successfully!')
      onVerified()
    } catch (error) {
      toast.error('Failed to verify email')
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)

    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Failed to resend code')
        setResending(false)
        return
      }

      toast.success('New verification code sent!')
      setTimeLeft(600) // Reset timer
      setCode(['', '', '', '', '', ''])
      document.getElementById('code-0')?.focus()
    } catch (error) {
      toast.error('Failed to resend code')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="flex justify-center mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Verify Your Email
          </h1>
          <p className="text-foreground/60 mb-2">
            We've sent a 6-digit code to
          </p>
          <p className="text-foreground font-semibold">{email}</p>
        </div>

        <div className="mb-6">
          <div className="flex gap-2 justify-center" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleCodeChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                disabled={loading}
                className="w-12 h-14 text-center text-2xl font-bold border-2 border-foreground/20 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            ))}
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-foreground/60">
            Code expires in{' '}
            <span className={`font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-primary'}`}>
              {formatTime(timeLeft)}
            </span>
          </p>
        </div>

        <Button
          onClick={() => handleVerify(code.join(''))}
          className="w-full mb-4"
          loading={loading}
          disabled={code.some(digit => digit === '') || loading}
        >
          Verify Email
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <div className="text-center">
          <p className="text-sm text-foreground/60 mb-2">
            Didn't receive the code?
          </p>
          <Button
            variant="outline"
            onClick={handleResend}
            disabled={resending || timeLeft > 540} // Can resend after 1 minute
            loading={resending}
            className="w-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Resend Code
          </Button>
        </div>
      </div>
    </div>
  )
}
