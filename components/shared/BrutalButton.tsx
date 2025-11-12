import React from 'react'

interface BrutalButtonProps {
  children: React.ReactNode
  variant?: 'yellow' | 'cyan' | 'pink' | 'lime' | 'orange' | 'purple' | 'outline' | 'black'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
}

export function BrutalButton({
  children,
  variant = 'yellow',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  icon,
}: BrutalButtonProps) {
  const variantStyles = {
    yellow: 'bg-yellow-400 text-black hover:bg-yellow-300',
    cyan: 'bg-cyan-400 text-black hover:bg-cyan-300',
    pink: 'bg-pink-400 text-black hover:bg-pink-300',
    lime: 'bg-lime-400 text-black hover:bg-lime-300',
    orange: 'bg-orange-400 text-black hover:bg-orange-300',
    purple: 'bg-purple-400 text-white hover:bg-purple-300',
    outline: 'bg-white text-black hover:bg-gray-50',
    black: 'bg-black text-white hover:bg-gray-900',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        neo-border neo-shadow-md neo-hover neo-press
        font-bold uppercase tracking-wide
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${icon ? 'flex items-center justify-center gap-3' : ''}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  )
}
