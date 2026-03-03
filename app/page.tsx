'use client'

import { useState } from 'react'
import { MapPin, Maximize, BedDouble, Phone, Filter, Search, Home, Building2, Trees, Warehouse, Users, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// 6 объектов недвижимости Астаны
const OBJECTS = [
  {
    id: '1',
    title: '3-комнатная квартира в ЖК "Нурлы Жол"',
    price: 45000000,
    district: 'Есиль',
    address: 'пр. Кабанбай батыра, 21',
    area: 85,
    floor: '5/12',
    rooms: 3,
    type: 'apartment',
    typeName: 'Квартира',
    condition: 'евроремонт',
    year: 2018,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    owner: { name: 'Айжан К.', rating: 4.8, phone: '+7 (701) 234-56-78' },
    date: '15 янв',
    views: 245
  },
  {
    id: '2',
    title: 'Офис 120 м² в бизнес-центре',
    price: 85000000,
    district: 'Алматинский',
    address: 'ул. Сатпаева, 30/2',
    area: 120,
    floor: '3/8',
    rooms: 4,
    type: 'office',
    typeName: 'Офис',
    condition: 'отличное',
    year: 2020,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    owner: { name: 'Бауыржан Р.', rating: 4.9, phone: '+7 (707) 345-67-89' },
    date: '14 янв',
    views: 189
  },
  {
    id: '3',
    title: 'Коттедж 300 м² в закрытом посёлке',
    price: 180000000,
    district: 'Сарыарка',
    address: 'пос. Коктал, 12',
    area: 300,
    floor: '2 этажа',
    rooms: 5,
    type: 'house',
    typeName: 'Дом',
    condition: 'под ключ',
    year: 2021,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    owner: { name: 'Елена М.', rating: 5.0, phone: '+7 (701) 456-78-90' },
    date: '13 янв',
    views: 312
  },
  {
    id: '4',
    title: 'Студия 42 м² в ЖК "Би Сити Токио"',
    price: 28000000,
    district: 'Есиль',
    address: 'пр. Туран, 55',
    area: 42,
    floor: '12/25',
    rooms: 1,
    type: 'apartment',
    typeName: 'Квартира',
    condition: 'чистовая',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    owner: { name: 'Дамир С.', rating: 4.7, phone: '+7 (707) 567-89-01' },
    date: '12 янв',
    views: 156
  },
  {
    id: '5',
    title: 'Торговое помещение 200 м² на первой линии',
    price: 120000000,
    district: 'Байконур',
    address: 'пр. Республики, 10',
    area: 200,
    floor: '1/5',
    rooms: 1,
    type: 'commercial',
    typeName: 'Коммерция',
    condition: 'отличное',
    year: 2019,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    owner: { name: 'Серик Б.', rating: 4.6, phone: '+7 (701) 678-90-12' },
    date: '11 янв',
    views: 98
  },
  {
    id: '6',
    title: 'Участок 10 соток под ИЖС в Нуре',
    price: 35000000,
    district: 'Нура',
    address: 'мкр. Жетысу-2, уч. 45',
    area: 1000,
    floor: '-',
    rooms: null,
    type: 'land',
    typeName: 'Участок',
    condition: null,
    year: null,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    owner: { name: 'Гульнар И.', rating: 4.8, phone: '+7 (707) 789-01-23' },
    date: '10 янв',
    views: 134
  }
]

// Топ-риэлторы для промо-блока
const TOP_AGENTS = [
  { id: '1', name: 'Айжан К.', rating: 4.9, specialization: 'Квартиры в Есиле' },
  { id: '2', name: 'Бауыржан Р.', rating: 4.8, specialization: 'Коммерция' },
  { id: '3', name: 'Елена М.', rating: 5.0, specialization: 'Дома и коттеджи' },
]

const DISTRICTS = ['Все районы', 'Есиль', 'Алматинский', 'Сарыарка', 'Байконур', 'Нура']
const TYPES = [
  { id: 'all', name: 'Все типы', icon: Home },
  { id: 'apartment', name: 'Квартиры', icon: Building2 },
  { id: 'house', name: 'Дома', icon: Trees },
  { id: 'office', name: 'Офисы', icon: Warehouse },
  { id: 'commercial', name: 'Коммерция', icon: Building2 },
  { id: 'land', name: 'Участки', icon: MapPin },
]

const TYPE_COLORS: Record<string, string> = {
  apartment: 'bg-blue-500',
  house: 'bg-green-500',
  office: 'bg-purple-500',
  commercial: 'bg-orange-500',
  land: 'bg-yellow-500',
}

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [district, setDistrict] = useState('Все районы')
  const [type, setType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = OBJECTS.filter(obj => {
    const matchSearch = !search || 
      obj.title.toLowerCase().includes(search.toLowerCase()) ||
      obj.address.toLowerCase().includes(search.toLowerCase())
    const matchDistrict = district === 'Все районы' || obj.district === district
    const matchType = type === 'all' || obj.type === type
    return matchSearch && matchDistrict && matchType
  })

  const formatPrice = (p: number) => p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Шапка */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Объекты недвижимости
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Найдите квартиру, дом или офис в Астане
          </p>
        </div>
      </header>

      {/* Быстрый доступ к риэлторам - ПРОМО-БЛОК */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">Хотите продать недвижимость?</h2>
              <p className="text-green-100">Выберите проверенного риэлтора</p>
            </div>
            <Link
              href="/agents"
              className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-xl font-medium hover:bg-green-50 transition-colors shadow-lg"
            >
              <Users className="w-5 h-5" />
              Выбрать риэлтора
            </Link>
          </div>
          
          {/* Мини-карточки топ-риэлторов */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2 no-scrollbar">
            {TOP_AGENTS.map((agent) => (
              <Link
                key={agent.id}
                href={`/agents/${agent.id}`}
                className="flex items-center gap-3 bg-white/20 backdrop-blur rounded-xl px-4 py-2 hover:bg-white/30 transition-colors whitespace-nowrap"
              >
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-sm font-bold">
                  {agent.name[0]}
                </div>
                <div>
                  <p className="font-medium text-sm">{agent.name}</p>
                  <div className="flex items-center gap-1 text-xs text-green-100">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{agent.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Фильтры */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Поиск */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по объектам..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white"
            />
          </div>

          {/* Типы недвижимости */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {TYPES.map((t) => {
              const Icon = t.icon
              const isActive = type === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.name}
                </button>
              )
            })}
          </div>

          {/* Район и кнопка фильтров */}
          <div className="flex gap-2 mt-4">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white"
            >
              {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-xl border transition-colors ${
                showFilters
                  ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400'
                  : 'border-gray-200 dark:border-gray-600 dark:text-white'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Список объектов */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Найдено: {filtered.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((obj) => (
            <Link 
              key={obj.id} 
              href={`/object/${obj.id}`}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Фото */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={obj.image}
                  alt={obj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 ${TYPE_COLORS[obj.type] || 'bg-gray-500'} text-white text-xs font-medium rounded-full`}>
                    {obj.typeName}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-xs rounded-full dark:text-white">
                    {obj.date}
                  </span>
                </div>
              </div>

              {/* Контент */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                  {obj.title}
                </h3>
                
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{obj.district}, {obj.address}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <div className="flex items-center gap-1">
                    <Maximize className="w-4 h-4" />
                    <span>{obj.area} м²</span>
                  </div>
                  {obj.rooms && (
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-4 h-4" />
                      <span>{obj.rooms} комн.</span>
                    </div>
                  )}
                  <span>{obj.floor}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    {formatPrice(obj.price)} ₸
                  </span>
                  <span className="text-xs text-gray-400">{obj.views} просмотров</span>
                </div>

                {/* Риэлтор и действия - ИСПРАВЛЕННЫЙ БЛОК */}
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-bold">
                    {obj.owner.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {obj.owner.name}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-xs">★</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{obj.owner.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${obj.owner.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                      title="Позвонить"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <Link
                      href="/agents"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="Другие риэлторы"
                    >
                      Ещё
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">Объекты не найдены</p>
            <button
              onClick={() => {setSearch(''); setDistrict('Все районы'); setType('all')}}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
