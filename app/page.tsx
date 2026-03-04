'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Maximize, Phone } from 'lucide-react'
import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'

const OBJECTS = [
  {
    id: '1',
    title: '3-комнатная квартира в ЖК "Нурлы Жол"',
    price: 45000000,
    district: 'Есиль',
    address: 'пр. Кабанбай батыра, 21',
    area: 85,
    floor: '5/12',
    type: 'Квартира',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    owner: { name: 'Айжан К.', rating: 4.8 },
    date: '15 янв'
  },
  {
    id: '2',
    title: 'Офис 120 м² в бизнес-центре',
    price: 85000000,
    district: 'Алматинский',
    address: 'ул. Сатпаева, 30/2',
    area: 120,
    floor: '3/8',
    type: 'Офис',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    owner: { name: 'Бауыржан Р.', rating: 4.9 },
    date: '14 янв'
  },
  {
    id: '3',
    title: 'Коттедж 300 м² в закрытом посёлке',
    price: 180000000,
    district: 'Сарыарка',
    address: 'пос. Коктал, 12',
    area: 300,
    floor: '2 этажа',
    type: 'Дом',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    owner: { name: 'Елена М.', rating: 5.0 },
    date: '13 янв'
  },
  {
    id: '4',
    title: 'Студия 42 м² в ЖК "Би Сити Токио"',
    price: 28000000,
    district: 'Есиль',
    address: 'пр. Туран, 55',
    area: 42,
    floor: '12/25',
    type: 'Квартира',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    owner: { name: 'Дамир С.', rating: 4.7 },
    date: '12 янв'
  },
  {
    id: '5',
    title: 'Торговое помещение 200 м²',
    price: 120000000,
    district: 'Байконур',
    address: 'пр. Республики, 10',
    area: 200,
    floor: '1/5',
    type: 'Коммерция',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    owner: { name: 'Серик Б.', rating: 4.6 },
    date: '11 янв'
  },
  {
    id: '6',
    title: 'Участок 10 соток под ИЖС',
    price: 35000000,
    district: 'Нура',
    address: 'мкр. Жетысу-2, уч. 45',
    area: 1000,
    floor: '-',
    type: 'Участок',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    owner: { name: 'Гульнар К.', rating: 4.8 },
    date: '10 янв'
  }
]

const DISTRICTS = ['Все районы', 'Есиль', 'Алматинский', 'Сарыарка', 'Байконур', 'Нура']
const TYPES = ['Все типы', 'Квартира', 'Дом', 'Офис', 'Коммерция', 'Участок']

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [district, setDistrict] = useState('Все районы')
  const [type, setType] = useState('Все типы')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = OBJECTS.filter(obj => {
    const matchSearch = !search || obj.title.toLowerCase().includes(search.toLowerCase())
    const matchDistrict = district === 'Все районы' || obj.district === district
    const matchType = type === 'Все типы' || obj.type === type
    return matchSearch && matchDistrict && matchType
  })

  const formatPrice = (p: number) => p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-20">
      <Header 
        search={search} 
        setSearch={setSearch}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {/* Фильтры */}
      {showFilters && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-3">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
            >
              {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
            >
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Контент */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold dark:text-white">Объекты недвижимости</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">Найдено: {filtered.length}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((obj) => (
            <Link href={`/object/${obj.id}`} key={obj.id}>
              <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={obj.image}
                    alt={obj.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      {obj.type}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-xs rounded-full dark:text-white">
                      {obj.date}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 text-sm">
                    {obj.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mb-2">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{obj.district}, {obj.address}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300 mb-3">
                    <span className="flex items-center gap-1">
                      <Maximize className="w-3.5 h-3.5" />
                      {obj.area} м²
                    </span>
                    <span>{obj.floor}</span>
                  </div>

                  <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      {formatPrice(obj.price)} ₸
                    </span>
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        window.location.href = `tel:+77012345678`
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-xs font-medium"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Звонок</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold">
                      {obj.owner.name[0]}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-300 truncate">{obj.owner.name}</span>
                    <span className="text-xs text-yellow-500 ml-auto">★ {obj.owner.rating}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">Ничего не найдено</p>
            <button
              onClick={() => {setSearch(''); setDistrict('Все районы'); setType('Все типы')}}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
