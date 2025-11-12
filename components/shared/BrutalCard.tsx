import React from 'react'

interface BrutalCardProps {
  children: React.ReactNode
  variant?: 'white' | 'yellow' | 'cyan' | 'pink' | 'lime' | 'orange' | 'purple' | 'blue'
  className?: string
  onClick?: () => void
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

export function BrutalCard({
  children,
  variant = 'white',
  className = '',
  onClick,
  hover = false,
  padding = 'lg',
}: BrutalCardProps) {
  const variantStyles = {
    white: 'bg-white',
    yellow: 'bg-yellow-400',
    cyan: 'bg-cyan-400',
    pink: 'bg-pink-400',
    lime: 'bg-lime-400',
    orange: 'bg-orange-400',
    purple: 'bg-purple-400',
    blue: 'bg-blue-400',
  }

  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  }

  return (
    <div
      onClick={onClick}
      className={`
        neo-border neo-shadow-md
        ${hover ? 'neo-card-hover cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
