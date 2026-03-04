'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PlusCircle, List, MessageCircle, User, ArrowLeftRight } from 'lucide-react'

const navItems = [
  { href: '/', icon: Home, label: 'Объекты' },
  { href: '/add', icon: PlusCircle, label: 'Добавить' },
  { href: '/exchange', icon: ArrowLeftRight, label: 'Обмен' },
  { href: '/chat', icon: MessageCircle, label: 'Чат' },
  { href: '/profile', icon: User, label: 'Профиль' },
]

export function BottomNav() {
  const pathname = usePathname()

  // Не показываем на десктопе
  if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-area-pb">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 p-2 min-w-[64px] rounded-xl transition-colors ${
                  isActive
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-600'
                }`}
              >
                <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
