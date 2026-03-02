'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, 
  MapPin, 
  Maximize, 
  Phone, 
  MessageCircle, 
  Share2, 
  Heart,
  Calendar,
  Building,
  CheckCircle
} from 'lucide-react'

// Те же данные что и на главной (потом заменим на API)
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
    condition: 'евроремонт',
    year: 2018,
    description: 'Светлая квартира с панорамными окнами. Встроенная кухня, кондиционеры в каждой комнате. Развитая инфраструктура: школы, детсады, ТЦ "Хан Шатыр" в 5 минутах ходьбы. Закрытый двор, подземный паркинг, консьерж.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800&q=80'
    ],
    owner: { name: 'Айжан К.', rating: 4.8, phone: '+7 (701) 234-56-78', deals: 24 },
    date: '15 января'
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
    condition: 'отличное',
    year: 2020,
    description: 'Премиальный офис с ресепшен, 3 переговорными, серверной. Паркинг, охрана 24/7, кафе в здании. Отличная транспортная доступность.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80'
    ],
    owner: { name: 'Бауыржан Р.', rating: 4.9, phone: '+7 (707) 345-67-89', deals: 56 },
    date: '14 января'
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
    condition: 'под ключ',
    year: 2021,
    description: 'Авторский проект, бассейн, сауна, гараж на 2 авто. Участок 15 соток, ландшафтный дизайн. Охраняемый посёлок, видеонаблюдение.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
    ],
    owner: { name: 'Елена М.', rating: 5.0, phone: '+7 (701) 456-78-90', deals: 12 },
    date: '13 января'
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
    condition: 'чистовая',
    year: 2023,
    description: 'Новостройка сдача 2023. Вид на набережную. Рядом метро, парки, рестораны. Идеально для инвестиций или молодой пары.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80'
    ],
    owner: { name: 'Дамир С.', rating: 4.7, phone: '+7 (707) 567-89-01', deals: 8 },
    date: '12 января'
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
    condition: 'отличное',
    year: 2019,
    description: 'Высокий пешеходный трафик, парковка, витринное остекление. Под магазин, кафе, салон. Документы готовы.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      'https://images.unsplash.com/photo-1441986387999-c5a32b0a7e02?w=800&q=80'
    ],
    owner: { name: 'Серик Б.', rating: 4.6, phone: '+7 (701) 678-90-12', deals: 33 },
    date: '11 января'
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
    condition: null,
    year: null,
    description: 'Ровный участок, коммуникации по границе, асфальтированный подъезд. Рядом новая школа, детсад, поликлиника. Отличное место для строительства.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'
    ],
    owner: { name: 'Гульнар К.', rating: 4.8, phone: '+7 (707) 789-01-23', deals: 19 },
    date: '10 января'
  }
]

export default function ObjectPage() {
  const params = useParams()
  const id = params.id as string
  
  const obj = OBJECTS.find(o => o.id === id)
  
  if (!obj) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">Объект не найден</p>
          <Link href="/" className="mt-4 text-green-600 hover:underline">На главную</Link>
        </div>
      </div>
    )
  }

  const formatPrice = (p: number) => p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Шапка */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Назад</span>
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
              <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Галерея */}
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
        <Image
          src={obj.image}
          alt={obj.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
          1 / {obj.images.length}
        </div>
      </div>

      {/* Контент */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Левая колонка */}
          <div className="lg:col-span-2 space-y-6">
            {/* Заголовок */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
                  {obj.type}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">{obj.date}</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{obj.title}</h1>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{obj.district}, {obj.address}</span>
              </div>
            </div>

            {/* Цена */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                {formatPrice(obj.price)} ₸
              </span>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Торг возможен</p>
            </div>

            {/* Характеристики */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Характеристики</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Maximize className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Площадь</p>
                    <p className="font-medium dark:text-white">{obj.area} м²</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Этаж</p>
                    <p className="font-medium dark:text-white">{obj.floor}</p>
                  </div>
                </div>
                {obj.condition && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Состояние</p>
                      <p className="font-medium dark:text-white">{obj.condition}</p>
                    </div>
                  </div>
                )}
                {obj.year && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Год постройки</p>
                      <p className="font-medium dark:text-white">{obj.year}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Описание */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Описание</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{obj.description}</p>
            </div>

            {/* Обсуждения (только для риэлторов) */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Обсуждения риэлторов</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    А
                  </div>
                  <div className="flex-1">
                    <p className="font-medium dark:text-white">Азамат Р.</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Есть клиент под ипотеку, готов показать завтра</p>
                    <p className="text-xs text-gray-400 mt-1">2 часа назад</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                    М
                  </div>
                  <div className="flex-1">
                    <p className="font-medium dark:text-white">Марина К.</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Готова делить комиссию 50/50, у меня покупатель</p>
                    <p className="text-xs text-gray-400 mt-1">5 часов назад</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 py-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Написать сообщение...
              </button>
            </div>
          </div>

          {/* Правая колонка - Контакты */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xl font-bold">
                  {obj.owner.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{obj.owner.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{obj.owner.rating}</span>
                    <span className="text-sm text-gray-400">• {obj.owner.deals} сделок</span>
                  </div>
                </div>
              </div>

              <a 
                href={`tel:${obj.owner.phone}`}
                className="w-full flex items-center justify-center gap-2 btn-primary mb-3"
              >
                <Phone className="w-5 h-5" />
                <span>Позвонить</span>
              </a>
              
              <button className="w-full flex items-center justify-center gap-2 btn-secondary">
                <MessageCircle className="w-5 h-5" />
                <span>Написать</span>
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                Номер телефона показан 5 раз за сегодня
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
