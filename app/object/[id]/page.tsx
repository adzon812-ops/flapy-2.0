'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, 
  MapPin, 
  Maximize, 
  BedDouble, 
  Building, 
  Calendar, 
  Phone, 
  MessageCircle, 
  Share2, 
  Heart,
  MoreVertical,
  Star
} from 'lucide-react'
import { useState } from 'react'
import { BottomNav } from '@/components/BottomNav'

// Моковые данные (потом заменим на API)
const OBJECTS = [
  {
    id: '1',
    title: '3-комнатная квартира в ЖК "Нурлы Жол"',
    price: 45000000,
    priceNegotiable: true,
    district: 'Есиль',
    address: 'пр. Кабанбай батыра, 21',
    area_total: 85,
    area_living: 55,
    area_kitchen: 12,
    floor: 5,
    floors_total: 12,
    rooms: 3,
    type: 'Квартира',
    condition: 'евроремонт',
    year_built: 2018,
    description: 'Светлая квартира с панорамными окнами. Встроенная кухня, кондиционеры в каждой комнате. Развитая инфраструктура: школы, детсады, ТЦ "Хан Шатыр" в 5 минутах ходьбы.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    ],
    owner: { 
      name: 'Айжан К.', 
      rating: 4.8, 
      phone: '+7 (701) 234-56-78',
      deals: 24,
      avatar: null 
    },
    date: '15 января',
    views: 245,
    comments: [
      { id: 1, user: 'Динара А.', text: 'Есть клиент под ипотеку, готов обсудить условия', time: '2 часа назад', isCommission: true },
      { id: 2, user: 'Ерлан К.', text: 'Готов делить комиссию 50/50', time: '5 часов назад', isCommission: true },
    ]
  },
  // ... остальные объекты
]

export default function ObjectPage() {
  const params = useParams()
  const [currentImage, setCurrentImage] = useState(0)
  const [showPhone, setShowPhone] = useState(false)
  const [liked, setLiked] = useState(false)

  const obj = OBJECTS.find(o => o.id === params.id) || OBJECTS[0]

  const formatPrice = (p: number) => p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 lg:pb-0">
      {/* Шапка */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between p-4">
          <Link 
            href="/" 
            className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex gap-2">
            <button 
              onClick={() => setLiked(!liked)}
              className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Галерея */}
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-gray-900">
        <Image
          src={obj.images[currentImage]}
          alt={obj.title}
          fill
          className="object-cover"
          priority
        />
        
        {/* Индикаторы */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {obj.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentImage ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Счетчик */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur rounded-full text-white text-sm">
          {currentImage + 1} / {obj.images.length}
        </div>
      </div>

      {/* Контент */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
          {/* Заголовок и цена */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full mb-2">
                {obj.type}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {obj.title}
              </h1>
            </div>
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
                {formatPrice(obj.price)} ₸
              </div>
              {obj.priceNegotiable && (
                <div className="text-sm text-gray-500 dark:text-gray-400">Торг возможен</div>
              )}
            </div>
          </div>

          {/* Адрес */}
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
            <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <span>{obj.district}, {obj.address}</span>
          </div>

          {/* Характеристики */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <Maximize className="w-5 h-5 text-gray-400 mb-1" />
              <div className="text-lg font-semibold dark:text-white">{obj.area_total} м²</div>
              <div className="text-xs text-gray-500">Общая площадь</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <BedDouble className="w-5 h-5 text-gray-400 mb-1" />
              <div className="text-lg font-semibold dark:text-white">{obj.rooms}</div>
              <div className="text-xs text-gray-500">Комнат</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <Building className="w-5 h-5 text-gray-400 mb-1" />
              <div className="text-lg font-semibold dark:text-white">{obj.floor}/{obj.floors_total}</div>
              <div className="text-xs text-gray-500">Этаж</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <Calendar className="w-5 h-5 text-gray-400 mb-1" />
              <div className="text-lg font-semibold dark:text-white">{obj.year_built}</div>
              <div className="text-xs text-gray-500">Год постройки</div>
            </div>
          </div>

          {/* Описание */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 dark:text-white">Описание</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {obj.description}
            </p>
          </div>

          {/* Доп. инфо */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
            <span>Опубликовано: {obj.date}</span>
            <span>Просмотров: {obj.views}</span>
            <span>ID: {obj.id}</span>
          </div>

          {/* Риелтор */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xl font-bold">
              {obj.owner.name[0]}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-lg dark:text-white">{obj.owner.name}</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  {obj.owner.rating}
                </span>
                <span className="text-gray-500">• {obj.owner.deals} сделок</span>
              </div>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowPhone(!showPhone)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3.5 px-6 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
            >
              <Phone className="w-5 h-5" />
              {showPhone ? obj.owner.phone : 'Позвонить'}
            </button>
            <Link
              href={`/chat?user=${obj.owner.name}`}
              className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3.5 px-6 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Написать
            </Link>
          </div>
        </div>

        {/* Обсуждения (только для риелторов) */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white flex items-center gap-2">
            Обсуждения
            <span className="text-sm font-normal text-gray-500">(только для риелторов)</span>
          </h2>
          
          <div className="space-y-4">
            {obj.comments.map(comment => (
              <div key={comment.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium dark:text-white">{comment.user}</span>
                  <span className="text-xs text-gray-500">{comment.time}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{comment.text}</p>
                {comment.isCommission && (
                  <span className="inline-block mt-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                    Делёж комиссии
                  </span>
                )}
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 hover:border-green-500 hover:text-green-600 transition-colors dark:text-gray-400">
            + Добавить комментарий
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
