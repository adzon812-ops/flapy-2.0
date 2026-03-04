'use client'

import { ArrowLeft, Phone, MoreVertical, Send, Mic } from 'lucide-react'
import Link from 'next/link'
import { BottomNav } from '@/components/BottomNav'

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Шапка */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg dark:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
            Д
          </div>
          <div className="flex-1">
            <div className="font-semibold dark:text-white">Динара А.</div>
            <div className="text-xs text-green-600">онлайн</div>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg dark:text-white">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg dark:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Сообщения */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-4 space-y-4 overflow-y-auto">
        <div className="flex justify-center">
          <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Сегодня</span>
        </div>
        
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex-shrink-0" />
          <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[80%] dark:text-white">
            <p>Здравствуйте! Есть клиент под ипотеку на вашу квартиру</p>
            <span className="text-xs text-gray-400 mt-1 block">10:30</span>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <div className="bg-green-500 text-white p-3 rounded-2xl rounded-tr-none max-w-[80%]">
            <p>Отлично! Готовы обсудить условия</p>
            <span className="text-xs text-green-100 mt-1 block">10:32</span>
          </div>
        </div>
      </div>

      {/* Ввод */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <Mic className="w-6 h-6" />
          </button>
          <input
            type="text"
            placeholder="Сообщение..."
            className="flex-1 px-4 py-3 rounded-full border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
