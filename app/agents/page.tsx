'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, MapPin, Phone, MessageCircle, TrendingUp, Award, Search, Filter } from 'lucide-react'
import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { Sidebar } from '@/components/Sidebar'

const AGENTS = [
  {
    id: '1',
    name: 'Айжан К.',
    agency: 'Элит Недвижимость',
    rating: 4.8,
    reviews: 24,
    deals: 156,
    experience: '5 лет',
    district: 'Есиль',
    phone: '+7 (701) 234-56-78',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    specialization: ['Квартиры', 'Новостройки'],
    top: true,
    tags: ['Топ-риелтор', 'Ипотека']
  },
  {
    id: '2',
    name: 'Бауыржан Р.',
    agency: 'Астана Риелт',
    rating: 4.9,
    reviews: 31,
    deals: 203,
    experience: '7 лет',
    district: 'Алматинский',
    phone: '+7 (707) 345-67-89',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    specialization: ['Офисы', 'Коммерция'],
    top: true,
    tags: ['Топ-риелтор', 'Коммерция']
  },
  {
    id: '3',
    name: 'Елена М.',
    agency: 'Частный риелтор',
    rating: 5.0,
    reviews: 18,
    deals: 89,
    experience: '3 года',
    district: 'Сарыарка',
    phone: '+7 (701) 456-78-90',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    specialization: ['Дома', 'Коттеджи'],
    top: false,
    tags: ['VIP-объекты']
  },
  {
    id: '4',
    name: 'Дамир С.',
    agency: 'ProEstate',
    rating: 4.7,
    reviews: 42,
    deals: 178,
    experience: '6 лет',
    district: 'Есиль',
    phone: '+7 (707) 567-89-01',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    specialization: ['Студии', 'Инвестиции'],
    top: false,
    tags: ['Инвестор']
  },
  {
    id: '5',
    name: 'Гульнар К.',
    agency: 'Уютный дом',
    rating: 4.8,
    reviews: 27,
    deals: 134,
    experience: '4 года',
    district: 'Нура',
    phone: '+7 (707) 789-01-23',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    specialization: ['Участки', 'ИЖС'],
    top: false,
    tags: ['Земля']
  },
]

const DISTRICTS = ['Все районы', 'Есиль', 'Алматинский', 'Сарыарка', 'Байконур', 'Нура']
const SPECIALIZATIONS = ['Все', 'Квартиры', 'Дома', 'Офисы', 'Коммерция', 'Участки']

export default function AgentsPage() {
  const [search, setSearch] = useState('')
  const [district, setDistrict] = useState('Все районы')
  const [spec, setSpec] = useState('Все')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = AGENTS.filter(agent => {
    const matchSearch = !search || agent.name.toLowerCase().includes(search.toLowerCase()) || agent.agency.toLowerCase().includes(search.toLowerCase())
    const matchDistrict = district === 'Все районы' || agent.district === district
    const matchSpec = spec === 'Все' || agent.specialization.includes(spec)
    return matchSearch && matchDistrict && matchSpec
  })

  // Сортируем: топ-риелторы первые, потом по рейтингу
  const sorted = [...filtered].sort((a, b) => {
    if (a.top !== b.top) return b.top ? 1 : -1
    return b.rating - a.rating
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header search={search} setSearch={setSearch} />
      <Sidebar />
      
      <main className="lg:ml-64 pt-[105px] pb-20 lg:pb-6">
        <div className="max-w-5xl mx-auto px-4 py-6">
          {/* Заголовок */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">Риелторы Астаны</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Выберите проверенного специалиста</p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white w-fit"
            >
              <Filter className="w-4 h-4" />
              Фильтры
            </button>
          </div>

          {/* Фильтры */}
          {showFilters && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 border border-gray-100 dark:border-gray-700">
              <div className="flex flex-wrap gap-3">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white text-sm"
                >
                  {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <select
                  value={spec}
                  onChange={(e) => setSpec(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white text-sm"
                >
                  {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Список риелторов */}
          <div className="space-y-4">
            {sorted.map((agent) => (
              <div key={agent.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Аватар */}
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-gray-200">
                      <Image
                        src={agent.avatar}
                        alt={agent.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {agent.top && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Инфо */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
                          {agent.name}
                          {agent.top && (
                            <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs rounded-full font-medium">
                              ТОП
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{agent.agency}</p>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <Star className="w-4 h-4 text-green-600 fill-current" />
                        <span className="font-bold text-green-600 dark:text-green-400">{agent.rating}</span>
                        <span className="text-gray-400 text-sm">({agent.reviews})</span>
                      </div>
                    </div>

                    {/* Теги */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {agent.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {agent.district}
                      </span>
                    </div>

                    {/* Статистика */}
                    <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-y border-gray-100 dark:border-gray-700">
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{agent.deals}</div>
                        <div className="text-xs text-gray-500">Сделок</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{agent.experience}</div>
                        <div className="text-xs text-gray-500">Опыт</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          {Math.round(agent.deals / parseInt(agent.experience))}
                        </div>
                        <div className="text-xs text-gray-500">В год</div>
                      </div>
                    </div>

                    {/* Специализация */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.specialization.map(s => (
                        <span key={s} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          • {s}
                        </span>
                      ))}
                    </div>

                    {/* Кнопки */}
                    <div className="flex gap-3">
                      <a
                        href={`tel:${agent.phone}`}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-green-500/30"
                      >
                        <Phone className="w-4 h-4" />
                        Позвонить
                      </a>
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        Написать
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400">Риелторы не найдены</p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
