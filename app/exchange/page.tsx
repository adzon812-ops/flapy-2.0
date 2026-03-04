'use client'

import { useState } from 'react'
import { ArrowLeftRight, Plus, X, Home, Building, Check } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { BottomNav } from '@/components/BottomNav'

// Мои объекты (для демо)
const MY_OBJECTS = [
  { id: 'my1', title: '2-комнатная, 65 м², Есиль', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400' },
  { id: 'my2', title: 'Студия, 35 м², Алматинский', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400' },
]

// Предложения обмена
const EXCHANGE_OFFERS = [
  {
    id: '1',
    from: { title: '2-комнатная, 65 м²', district: 'Есиль', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400' },
    to: { title: 'Дом 150 м²', district: 'Сарыарка', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400' },
    supplement: '+ 15 000 000 ₸',
    owner: { name: 'Айжан К.', rating: 4.8 }
  },
  {
    id: '2',
    from: { title: 'Студия, 35 м²', district: 'Алматинский', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400' },
    to: { title: '1-комнатная, 45 м²', district: 'Есиль', image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400' },
    supplement: 'Без доплаты',
    owner: { name: 'Дамир С.', rating: 4.7 }
  }
]

export default function ExchangePage() {
  const [selectedMy, setSelectedMy] = useState<string | null>(null)
  const [wantType, setWantType] = useState<'apartment' | 'house' | 'any'>('any')

  return (
    <div className="min-h-screen bg-gradient-radial pb-24">
      {/* Шапка */}
      <header className="sticky top-0 z-40 bg-[#0F1419]/95 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ArrowLeftRight className="w-6 h-6 text-green-400" />
            Обмен недвижимостью
          </h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Мои объекты */}
        <section>
          <h2 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">Мой объект</h2>
          <div className="grid grid-cols-2 gap-3">
            {MY_OBJECTS.map((obj) => (
              <button
                key={obj.id}
                onClick={() => setSelectedMy(obj.id)}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedMy === obj.id ? 'border-green-500' : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="aspect-[4/3] relative">
                  <Image src={obj.image} alt={obj.title} fill className="object-cover" />
                  {selectedMy === obj.id && (
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 bg-gray-800">
                  <p className="text-sm font-medium text-white text-left">{obj.title}</p>
                </div>
              </button>
            ))}
            
            {/* Добавить новый */}
            <Link
              href="/add"
              className="aspect-[4/3] rounded-2xl border-2 border-dashed border-gray-700 hover:border-gray-600 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <Plus className="w-8 h-8" />
              <span className="text-sm">Добавить объект</span>
            </Link>
          </div>
        </section>

        {/* На что меняю */}
        <section>
          <h2 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">Хочу получить</h2>
          <div className="flex gap-2">
            {[
              { id: 'any', name: 'Любое', icon: Home },
              { id: 'apartment', name: 'Квартиру', icon: Building },
              { id: 'house', name: 'Дом', icon: Home },
            ].map((t) => {
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  onClick={() => setWantType(t.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                    wantType === t.id
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.name}
                </button>
              )
            })}
          </div>
        </section>

        {/* Кнопка поиска */}
        <button className="w-full btn-primary py-4 text-lg">
          Найти предложения обмена
        </button>

        {/* Активные предложения */}
        <section>
          <h2 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">Предложения обмена</h2>
          <div className="space-y-4">
            {EXCHANGE_OFFERS.map((offer) => (
              <div key={offer.id} className="bg-gray-800/50 rounded-2xl border border-gray-700 p-4">
                {/* Обмен */}
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="aspect-video rounded-xl overflow-hidden relative mb-2">
                      <Image src={offer.from.image} alt="" fill className="object-cover" />
                    </div>
                    <p className="text-sm font-medium text-white">{offer.from.title}</p>
                    <p className="text-xs text-gray-400">{offer.from.district}</p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-1">
                    <ArrowLeftRight className="w-5 h-5 text-green-400" />
                    <span className="text-xs text-green-400 font-medium">{offer.supplement}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="aspect-video rounded-xl overflow-hidden relative mb-2">
                      <Image src={offer.to.image} alt="" fill className="object-cover" />
                    </div>
                    <p className="text-sm font-medium text-white">{offer.to.title}</p>
                    <p className="text-xs text-gray-400">{offer.to.district}</p>
                  </div>
                </div>
                
                {/* Риэлтор и действия */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                      {offer.owner.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{offer.owner.name}</p>
                      <p className="text-xs text-gray-400">★ {offer.owner.rating}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-500/10 text-green-400 rounded-xl text-sm font-medium hover:bg-green-500/20">
                      Принять
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-300">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
