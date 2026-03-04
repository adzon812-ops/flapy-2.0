'use client'

import { ArrowLeftRight, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import { BottomNav } from '@/components/BottomNav'

export default function ExchangePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <ArrowLeftRight className="w-6 h-6" />
            Обмен объектами
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-2">Найдите обмен</h2>
          <p className="text-green-100 mb-4">Предложите свой объект в обмен на другой</p>
          <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-medium hover:bg-green-50 transition-colors">
            Добавить предложение
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по обменам..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white"
            />
          </div>
          <button className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">Отдают</div>
                  <div className="font-semibold dark:text-white">2-комнатная, Есиль, 65 м²</div>
                </div>
                <ArrowLeftRight className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div className="flex-1 text-right">
                  <div className="text-sm text-gray-500 mb-1">Получают</div>
                  <div className="font-semibold dark:text-white">3-комнатная, любой район</div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600" />
                  <span className="text-sm dark:text-gray-300">Айжан К.</span>
                </div>
                <button className="text-green-600 font-medium text-sm hover:underline">
                  Предложить обмен
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
