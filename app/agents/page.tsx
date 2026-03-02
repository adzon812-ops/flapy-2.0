'use client'

import { useState } from 'react'
import { Star, Phone, Mail, MapPin, CheckCircle, Filter, Search, SortAsc } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Риэлторы с рейтингами
const AGENTS = [
  {
    id: '1',
    name: 'Айжан Куанышева',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    rating: 4.9,
    reviews: 47,
    deals: 156,
    experience: '8 лет',
    specialization: 'Квартиры в Есиле',
    phone: '+7 (701) 234-56-78',
    email: 'aizhan@flapy.kz',
    verified: true,
    top: true,
    description: 'Специалист по элитной недвижимости. Помогу продать вашу квартиру за 14 дней.',
    stats: { sold: 156, buyers: 89, avgTime: '21 день' }
  },
  {
    id: '2',
    name: 'Бауыржан Рахимов',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    rating: 4.8,
    reviews: 38,
    deals: 98,
    experience: '6 лет',
    specialization: 'Коммерческая недвижимость',
    phone: '+7 (707) 345-67-89',
    email: 'baur@flapy.kz',
    verified: true,
    top: true,
    description: 'Эксперт по офисам и торговым помещениям. Юридическое сопровождение сделок.',
    stats: { sold: 98, buyers: 45, avgTime: '35 дней' }
  },
  {
    id: '3',
    name: 'Елена Морозова',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    rating: 5.0,
    reviews: 24,
    deals: 67,
    experience: '4 года',
    specialization: 'Дома и коттеджи',
    phone: '+7 (701) 456-78-90',
    email: 'elena@flapy.kz',
    verified: true,
    top: false,
    description: 'Помогу найти дом вашей мечты или выгодно продать участок.',
    stats: { sold: 67, buyers: 34, avgTime: '45 дней' }
  },
  {
    id: '4',
    name: 'Дамир Сулейменов',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    rating: 4.7,
    reviews: 31,
    deals: 82,
    experience: '5 лет',
    specialization: 'Новостройки',
    phone: '+7 (707) 567-89-01',
    email: 'damir@flapy.kz',
    verified: true,
    top: false,
    description: 'Специалист по новостройкам Астаны. Знаю все застройщики лично.',
    stats: { sold: 82, buyers: 56, avgTime: '18 дней' }
  },
  {
    id: '5',
    name: 'Серик Байтасов',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    rating: 4.6,
    reviews: 52,
    deals: 134,
    experience: '10 лет',
    specialization: 'Вся недвижимость',
    phone: '+7 (701) 678-90-12',
    email: 'serik@flapy.kz',
    verified: true,
    top: false,
    description: 'Работаю по всей Астане. Большая база покупателей.',
    stats: { sold: 134, buyers: 78, avgTime: '28 дней' }
  },
  {
    id: '6',
    name: 'Гульнар Искакова',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    rating: 4.8,
    reviews: 29,
    deals: 71,
    experience: '7 лет',
    specialization: 'Земельные участки',
    phone: '+7 (707) 789-01-23',
    email: 'gulnar@flapy.kz',
    verified: true,
    top: false,
    description: 'Эксперт по земельным вопросам. Помогу с оформлением документов.',
    stats: { sold: 71, buyers: 23, avgTime: '60 дней' }
  }
]

export default function AgentsPage() {
  const [sortBy, setSortBy] = useState<'rating' | 'deals' | 'experience'>('rating')
  const [filterVerified, setFilterVerified] = useState(false)
  const [search, setSearch] = useState('')

  let filtered = AGENTS.filter(a => {
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.specialization.toLowerCase().includes(search.toLowerCase())
    const matchVerified = !filterVerified || a.verified
    return matchSearch && matchVerified
  })

  filtered.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'deals') return b.deals - a.deals
    return parseInt(b.experience) - parseInt(a.experience)
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Шапка */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Выберите риэлтора
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Продайте недвижимость через проверенного специалиста
          </p>
        </div>
      </header>

      {/* Фильтры */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по имени или специализации..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white"
              />
            </div>
            
            <div className="flex gap-2">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="rating">По рейтингу</option>
                <option value="deals">По сделкам</option>
                <option value="experience">По опыту</option>
              </select>
              
              <button 
                onClick={() => setFilterVerified(!filterVerified)}
                className={`px-4 py-2.5 rounded-xl border transition-colors flex items-center gap-2 ${
                  filterVerified 
                    ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400' 
                    : 'border-gray-200 dark:border-gray-600 dark:text-white'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Проверенные</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Список риэлторов */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((agent) => (
            <div key={agent.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-4">
                {/* Фото */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-200">
                    <Image
                      src={agent.photo}
                      alt={agent.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {agent.top && (
                    <span className="absolute -top-2 -right-2 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                      TOP
                    </span>
                  )}
                </div>

                {/* Инфо */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{agent.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{agent.specialization}</p>
                    </div>
                    {agent.verified && (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-gray-900 dark:text-white">{agent.rating}</span>
                      <span className="text-sm text-gray-500">({agent.reviews} отзывов)</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{agent.experience} опыта</span>
                  </div>
                </div>
              </div>

              {/* Статистика */}
              <div className="grid grid-cols-3 gap-4 mt-4 py-4 border-y border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{agent.stats.sold}</p>
                  <p className="text-xs text-gray-500">Продано</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{agent.stats.buyers}</p>
                  <p className="text-xs text-gray-500">Покупателей</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{agent.stats.avgTime}</p>
                  <p className="text-xs text-gray-500">Средний срок</p>
                </div>
              </div>

              {/* Описание */}
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">{agent.description}</p>

              {/* Кнопки */}
              <div className="flex gap-3 mt-4">
                <a 
                  href={`tel:${agent.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Позвонить
                </a>
                <Link 
                  href={`/agents/${agent.id}/request`}
                  className="flex-1 flex items-center justify-center gap-2 border border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 py-3 rounded-xl font-medium transition-colors"
                >
                  Предложить объект
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">Риэлторы не найдены</p>
          </div>
        )}
      </main>
    </div>
  )
}
