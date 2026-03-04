'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Moon, Sun, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

const tabs = [
  { href: '/', label: 'Объекты', icon: '🏠' },
  { href: '/agents', label: 'Риелторы', icon: '⭐' },
  { href: '/add', label: 'Добавить', icon: '➕' },
  { href: '/chat', label: 'Чат', icon: '💬' },
]

export function Header({ search, setSearch }: { search: string, setSearch: (s: string) => void }) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Верхняя строка */}
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">F</span>
          </div>
          <span className="text-lg font-bold hidden sm:block dark:text-white">Flapy</span>
        </Link>

        {/* Поиск */}
        <div className="flex-1 max-w-md mx-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all dark:text-white text-sm"
            />
          </div>
        </div>

        {/* Иконки справа */}
        <div className="flex items-center gap-1">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors dark:text-white"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <Link href="/profile" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors dark:text-white">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Вкладки (как на скриншоте) */}
      <div className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1 py-2 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href))
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-green-500 text-white shadow-md shadow-green-500/30'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
