'use client'

import React from 'react'

interface ConfirmProps {
  /** Confirm ID from the implementation plan register (e.g. "C-01") */
  id: string
  /** Human-readable description of what needs to be confirmed */
  label: string
  /** Optional fallback content shown in production instead of nothing */
  fallback?: React.ReactNode
  /** Optional: render inline (span) instead of block (div) */
  inline?: boolean
  /** Optional: compact padding and font size for tight headers/footers */
  compact?: boolean
}

export function Confirm({ id, label, fallback, inline = false, compact = false }: ConfirmProps) {
  const isDev = process.env.NODE_ENV === 'development'

  if (!isDev) {
    // In production: render fallback or nothing
    return fallback ? <>{fallback}</> : null
  }

  // In development: render visible amber warning
  const Tag = inline || compact ? 'span' : 'div'
  const isCompactOrInline = inline || compact

  return (
    <Tag
      role="status"
      aria-label={`Unconfirmed content: ${label}`}
      style={{
        display: isCompactOrInline ? 'inline-flex' : 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: isCompactOrInline ? '0.125rem 0.375rem' : '0.75rem 1rem',
        background: '#FFF3CD',
        border: '1px dashed #E6A817',
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: isCompactOrInline ? '0.7rem' : '0.8125rem',
        color: '#7A4F00',
        lineHeight: 1.3,
        maxWidth: '100%',
      }}
    >
      <span style={{ fontSize: isCompactOrInline ? '0.75rem' : '1rem', flexShrink: 0 }}>⚠️</span>
      <span>
        <strong>[CONFIRM {id}]</strong> {label}
      </span>
    </Tag>
  )
}

export function ConfirmInline({ id, label, fallback }: Omit<ConfirmProps, 'inline'>) {
  return <Confirm id={id} label={label} fallback={fallback} inline />
}
