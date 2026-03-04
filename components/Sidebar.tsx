'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, PlusCircle, MessageCircle, ArrowLeftRight, BarChart3, Settings } from 'lucide-react'

const menuItems = [
  { href: '/', icon: Home, label: 'Объекты' },
  { href: '/agents', icon: Users, label: 'Риелторы' },
  { href: '/add', icon: PlusCircle, label: 'Добавить' },
  { href: '/exchange', icon: ArrowLeftRight, label: 'Обмен' },
  { href: '/chat', icon: MessageCircle, label: 'Чат' },
  { href: '/stats', icon: BarChart3, label: 'Статистика' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-[105px] bottom-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Низ сайдбара */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Настройки</span>
        </Link>
      </div>
    </aside>
  )
}
