'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Camera, Mic, MapPin } from 'lucide-react'
import { BottomNav } from '@/components/BottomNav'

export default function AddObjectPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    type: '',
    district: '',
    address: '',
    price: '',
    area: '',
    rooms: '',
    floor: '',
    description: '',
  })

  const formatPrice = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Шапка */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors dark:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold dark:text-white">Новое объявление</h1>
          <span className="ml-auto text-sm text-gray-500">Шаг {step} из 3</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-20 pb-6">
        {/* Прогресс */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold dark:text-white mb-4">Тип недвижимости</h2>
            {['Квартира', 'Дом', 'Офис', 'Коммерция', 'Участок'].map(type => (
              <button
                key={type}
                onClick={() => {
                  setFormData({...formData, type})
                  setStep(2)
                }}
                className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                  formData.type === type 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:bg-gray-800'
                }`}
              >
                <span className="font-medium dark:text-white">{type}</span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold dark:text-white mb-4">Расположение и цена</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Район</label>
              <select 
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white"
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
              >
                <option value="">Выберите район</option>
                {['Есиль', 'Алматинский', 'Сарыарка', 'Байконур', 'Нура'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Адрес</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ул. Пример, 123"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Цена (₸)</label>
              <input
                type="text"
                placeholder="45 000 000"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: formatPrice(e.target.value)})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Площадь, м²</label>
                <input
                  type="number"
                  placeholder="85"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Комнат</label>
                <input
                  type="number"
                  placeholder="3"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white"
                  value={formData.rooms}
                  onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                />
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-medium transition-colors mt-6"
            >
              Продолжить
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold dark:text-white mb-4">Фото и описание</h2>
            
            <div className="grid grid-cols-3 gap-3">
              <button className="aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-2 hover:border-green-500 transition-colors">
                <Camera className="w-8 h-8 text-gray-400" />
                <span className="text-xs text-gray-500">Добавить</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Описание</label>
              <textarea
                rows={4}
                placeholder="Опишите объект подробно..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white">
              <Mic className="w-5 h-5" />
              <span>Записать голосовое описание</span>
            </button>

            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-medium transition-colors mt-6"
            >
              Опубликовать
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
