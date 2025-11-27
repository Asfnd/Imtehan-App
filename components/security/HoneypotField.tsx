'use client'

import { useState } from 'react'

/**
 * Honeypot field component to catch bots
 * Bots typically fill all form fields, including hidden ones
 * Real users won't see or interact with this field
 */

interface HoneypotFieldProps {
  name?: string
  value: string
  onChange: (value: string) => void
}

export default function HoneypotField({ 
  name = 'website', 
  value, 
  onChange 
}: HoneypotFieldProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
      aria-hidden="true"
      tabIndex={-1}
    >
      <label htmlFor={name}>
        Please leave this field blank
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
      />
    </div>
  )
}

/**
 * Hook to use honeypot in forms
 */
export function useHoneypot() {
  const [honeypotValue, setHoneypotValue] = useState('')

  const isBot = honeypotValue !== ''

  const HoneypotComponent = () => (
    <HoneypotField value={honeypotValue} onChange={setHoneypotValue} />
  )

  return {
    isBot,
    honeypotValue,
    HoneypotComponent,
  }
}
