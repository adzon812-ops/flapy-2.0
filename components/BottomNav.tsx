'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PlusCircle, ArrowLeftRight, MessageCircle, User } from 'lucide-react'

const navItems = [
  { href: '/', icon: Home, label: 'Объекты' },
  { href: '/add', icon: PlusCircle, label: 'Добавить' },
  { href: '/exchange', icon: ArrowLeftRight, label: 'Обмен' },
  { href: '/chat', icon: MessageCircle, label: 'Чат' },
  { href: '/profile', icon: User, label: 'Профиль' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 safe-area-pb">
      <div className="max-w-lg mx-auto px-6">
        <div className="flex items-center justify-between py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'nav-active' : 'nav-inactive'
                }`}
              >
                <div className={`p-2 rounded-2xl transition-all ${
                  isActive ? 'bg-green-500/20' : 'hover:bg-gray-800'
                }`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
