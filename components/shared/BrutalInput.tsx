import React from 'react'

interface BrutalInputProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  disabled?: boolean
  required?: boolean
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function BrutalInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  disabled = false,
  required = false,
  label,
  error,
  icon,
}: BrutalInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 font-bold text-sm uppercase tracking-wide">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-full neo-border neo-shadow-sm
            bg-white ${icon ? 'pl-12 pr-4' : 'px-4'} py-3
            text-base font-semibold
            placeholder:text-gray-500 placeholder:font-normal
            focus:outline-none focus:neo-shadow-md focus:transform focus:-translate-x-[2px] focus:-translate-y-[2px]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            ${error ? 'border-red-400' : ''}
            ${className}
          `}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm font-bold text-red-400 animate-shake">
          {error}
        </p>
      )}
    </div>
  )
}
