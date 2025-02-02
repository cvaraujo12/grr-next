// Tipos para Meta Tags
export interface MetaData {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
}

// Tipos para Navegação
export interface NavItem {
  label: string
  href: string
  isExternal?: boolean
}

// Tipos para Layout
export interface LayoutProps {
  children: React.ReactNode
}

// Tipos para Componentes de UI
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

// Tipos para Temas
export interface Theme {
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    error: string
    success: string
  }
  fonts: {
    heading: string
    body: string
  }
}

// Tipos para Respostas da API
export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

// Tipos para Usuário
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin'
}

// Tipos para Formulários
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'textarea'
  required?: boolean
  placeholder?: string
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: RegExp
  }
} 