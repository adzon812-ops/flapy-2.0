'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, PlusCircle, MessageSquare, User, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const navItems = [
  { href: '/', label: 'Объекты', icon: Home },
  { href: '/agents', label: 'Риэлторы', icon: Users },
  { href: '/add', label: 'Добавить', icon: PlusCircle },
  { href: '/chat', label: 'Чат', icon: MessageSquare },
  { href: '/profile', label: 'Профиль', icon: User },
]

export function TopNav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <span className="text-xl font-bold text-white">F</span>
            </div>
            <span className="text-xl font-bold dark:text-white hidden sm:block">Flapy</span>
          </Link>

          {/* Десктоп меню - иконки с подписями */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    isActive 
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Правая часть - тема и мобильное меню */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Мобильное меню - выпадающее снизу */}
            <MobileMenu pathname={pathname} />
          </div>
        </div>
      </div>
    </nav>
  )
}

// Мобильное меню
function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 p-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
