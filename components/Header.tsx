'use client'

import Link from 'next/link'
import { Search, Filter, Plus, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export function Header({ 
  search, 
  setSearch, 
  showFilters, 
  setShowFilters 
}: {
  search: string
  setSearch: (s: string) => void
  showFilters: boolean
  setShowFilters: (v: boolean) => void
}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold text-white">F</span>
          </div>
          <span className="text-xl font-bold hidden sm:block dark:text-white">Flapy</span>
        </Link>

        {/* Поиск */}
        <div className="flex-1 max-w-md mx-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all dark:text-white text-sm"
            />
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:text-white"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 rounded-xl transition-colors ${
              showFilters 
                ? 'bg-green-100 text-green-600 dark:bg-green-900/30' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white'
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>

          <Link 
            href="/add" 
            className="hidden sm:flex bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-lg items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Добавить</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
