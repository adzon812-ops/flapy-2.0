'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Link from 'next/link'
import { PropertyCard } from '@/components/PropertyCard'
import { BottomNav } from '@/components/BottomNav'

// Данные объектов
const OBJECTS = [
  {
    id: '1',
    title: '3-комнатная квартира в ЖК "Нурлы Жол"',
    price: 45000000,
    district: 'Есиль',
    address: 'пр. Кабанбай батыра, 21',
    area: 85,
    rooms: 3,
    floor: '5/12',
    type: 'apartment',
    typeName: 'Квартира',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    owner: { name: 'Айжан К.', rating: 4.8, phone: '+7 (701) 234-56-78' },
    date: '15 янв'
  },
  {
    id: '2',
    title: 'Офис 120 м² в бизнес-центре класса A',
    price: 85000000,
    district: 'Алматинский',
    address: 'ул. Сатпаева, 30/2',
    area: 120,
    rooms: 4,
    floor: '3/8',
    type: 'office',
    typeName: 'Офис',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    owner: { name: 'Бауыржан Р.', rating: 4.9, phone: '+7 (707) 345-67-89' },
    date: '14 янв'
  },
  {
    id: '3',
    title: 'Коттедж 300 м² в закрытом посёлке',
    price: 180000000,
    district: 'Сарыарка',
    address: 'пос. Коктал, 12',
    area: 300,
    rooms: 5,
    floor: '2 этажа',
    type: 'house',
    typeName: 'Дом',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    owner: { name: 'Елена М.', rating: 5.0, phone: '+7 (701) 456-78-90' },
    date: '13 янв'
  },
  {
    id: '4',
    title: 'Студия 42 м² в ЖК "Би Сити Токио"',
    price: 28000000,
    district: 'Есиль',
    address: 'пр. Туран, 55',
    area: 42,
    rooms: 1,
    floor: '12/25',
    type: 'apartment',
    typeName: 'Квартира',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    owner: { name: 'Дамир С.', rating: 4.7, phone: '+7 (707) 567-89-01' },
    date: '12 янв'
  },
  {
    id: '5',
    title: 'Торговое помещение 200 м² на первой линии',
    price: 120000000,
    district: 'Байконур',
    address: 'пр. Республики, 10',
    area: 200,
    rooms: 1,
    floor: '1/5',
    type: 'commercial',
    typeName: 'Коммерция',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    owner: { name: 'Серик Б.', rating: 4.6, phone: '+7 (701) 678-90-12' },
    date: '11 янв'
  },
  {
    id: '6',
    title: 'Участок 10 соток под ИЖС',
    price: 35000000,
    district: 'Нура',
    address: 'мкр. Жетысу-2, уч. 45',
    area: 1000,
    rooms: null,
    floor: '-',
    type: 'land',
    typeName: 'Участок',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    owner: { name: 'Гульнар К.', rating: 4.8, phone: '+7 (707) 789-01-23' },
    date: '10 янв'
  }
]

const DISTRICTS = ['Все районы', 'Есиль', 'Алматинский', 'Сарыарка', 'Байконур', 'Нура']
const TYPES = [
  { id: 'all', name: 'Все' },
  { id: 'apartment', name: 'Квартиры' },
  { id: 'house', name: 'Дома' },
  { id: 'office', name: 'Офисы' },
  { id: 'commercial', name: 'Коммерция' },
  { id: 'land', name: 'Участки' },
]

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [district, setDistrict] = useState('Все районы')
  const [type, setType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = OBJECTS.filter(obj => {
    const matchSearch = !search || 
      obj.title.toLowerCase().includes(search.toLowerCase()) ||
      obj.district.toLowerCase().includes(search.toLowerCase())
    const matchDistrict = district === 'Все районы' || obj.district === district
    const matchType = type === 'all' || obj.type === type
    return matchSearch && matchDistrict && matchType
  })

  return (
    <div className="min-h-screen bg-gradient-radial pb-24">
      {/* Шапка */}
      <header className="sticky top-0 z-40 bg-[#0F1419]/95 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <span className="text-xl font-bold text-white">F</span>
              </div>
              <div>
                <h1 className="font-bold text-white leading-none">Flapy</h1>
                <p className="text-xs text-gray-400">Астана</p>
              </div>
            </Link>
            
            <Link 
              href="/agents"
              className="text-sm text-green-400 hover:text-green-300 font-medium"
            >
              Риэлторы →
            </Link>
          </div>

          {/* Поиск */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по объектам..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-12 pr-12"
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-700 rounded-full"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Фильтры */}
      <div className="sticky top-[88px] z-30 bg-[#0F1419]/95 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Типы — горизонтальный скролл */}
            <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
              {TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-all ${
                    type === t.id
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
            
            {/* Кнопка расширенных фильтров */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-xl transition-colors flex-shrink-0 ${
                showFilters ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Раскрывающийся фильтр районов */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-gray-800 animate-in slide-in-from-top-2">
              <p className="text-xs text-gray-400 mb-2">Район</p>
              <div className="flex flex-wrap gap-2">
                {DISTRICTS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDistrict(d)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      district === d
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-transparent'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Контент */}
      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Заголовок секции */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">
            {filtered.length} {filtered.length === 1 ? 'объект' : filtered.length < 5 ? 'объекта' : 'объектов'}
          </h2>
          <span className="text-xs text-gray-400">
            {district !== 'Все районы' && district}
          </span>
        </div>

        {/* Сетка объектов */}
        <div className="space-y-4">
          {filtered.map((obj) => (
            <Link key={obj.id} href={`/object/${obj.id}`}>
              <PropertyCard property={obj} />
            </Link>
          ))}
        </div>

        {/* Пустое состояние */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-400 mb-2">Ничего не найдено</p>
            <button
              onClick={() => {
                setSearch('')
                setDistrict('Все районы')
                setType('all')
              }}
              className="text-green-400 hover:text-green-300 font-medium"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </main>

      {/* Нижнее меню */}
      <BottomNav />
    </div>
  )
}
