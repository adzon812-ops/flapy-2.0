'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  Home, Users, PlusCircle, MessageSquare, User, 
  Moon, Sun, Menu, X, ChevronLeft 
} from 'lucide-react'
import { useTheme } from 'next-themes'

const navItems = [
  { href: '/', label: 'Объекты', icon: Home, shortLabel: 'Объекты' },
  { href: '/agents', label: 'Риэлторы', icon: Users, shortLabel: 'Риэлторы' },
  { href: '/add', label: 'Добавить', icon: PlusCircle, shortLabel: 'Добавить' },
  { href: '/chat', label: 'Чат', icon: MessageSquare, shortLabel: 'Чат' },
  { href: '/profile', label: 'Профиль', icon: User, shortLabel: 'Профиль' },
]

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setVisible(true)
      } else {
        setVisible(currentScrollY < 100)
      }
      
      setScrolled(currentScrollY > 20)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const isHome = pathname === '/'

  return (
    <>
      {/* ДЕСКТОП: Боковой сайдбар */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col z-50">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <span className="text-2xl font-bold text-white">F</span>
            </div>
            <span className="text-2xl font-bold dark:text-white">Flapy</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
          </button>
        </div>
      </aside>

      {/* МОБИЛЬНЫЙ: "Умный" хедер */}
      <header 
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-shadow ${
          scrolled ? 'shadow-lg' : ''
        }`}>
          <div className="flex items-center justify-between h-14 px-4">
            <div className="flex items-center gap-3 w-24">
              {!isHome ? (
                <button 
                  onClick={() => window.history.back()}
                  className="p-2 -ml-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              ) : (
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-white">F</span>
                  </div>
                </Link>
              )}
            </div>

            <h1 className="font-semibold text-gray-900 dark:text-white truncate flex-1 text-center">
              {navItems.find(i => pathname === i.href || pathname.startsWith(i.href + '/'))?.label || 'Flapy'}
            </h1>

            <div className="flex items-center gap-1 w-24 justify-end">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {isHome && (
            <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
              {navItems.slice(0, 4).map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.shortLabel}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </header>

      {/* МОБИЛЬНОЕ МЕНЮ */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-800 shadow-2xl">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="font-bold text-lg dark:text-white">Меню</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      isActive
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:hidden h-14" />
      {isHome && <div className="lg:hidden h-12" />}
    </>
  )
}
