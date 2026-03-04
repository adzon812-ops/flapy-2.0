'use client'

import { User, Settings, LogOut, Star, Building2, MessageSquare } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold dark:text-white">Профиль</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Аватар */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-3xl font-bold">
            А
          </div>
          <div>
            <h2 className="text-xl font-bold dark:text-white">Айжан К.</h2>
            <p className="text-gray-500 dark:text-gray-400">Риелтор • 24 сделки</p>
            <div className="flex items-center gap-1 text-yellow-500 mt-1">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">4.8</span>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">12</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Активных</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">24</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Сделок</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">156</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Просмотров</div>
          </div>
        </div>

        {/* Меню */}
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Building2 className="w-5 h-5 text-gray-400" />
            <span className="flex-1 text-left dark:text-white">Мои объекты</span>
          </button>
          <button className="w-full flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <span className="flex-1 text-left dark:text-white">Сообщения</span>
          </button>
          <button className="w-full flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Settings className="w-5 h-5 text-gray-400" />
            <span className="flex-1 text-left dark:text-white">Настройки</span>
          </button>
          <button className="w-full flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-red-600">
            <LogOut className="w-5 h-5" />
            <span className="flex-1 text-left">Выйти</span>
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
