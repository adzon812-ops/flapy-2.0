'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Maximize, BedDouble, Phone, Heart } from 'lucide-react'
import { useState } from 'react'

interface Property {
  id: string
  title: string
  price: number
  district: string
  address: string
  area: number
  rooms?: number | null
  floor: string
  type: string
  typeName: string
  image: string
  owner: {
    name: string
    rating: number
    phone: string
  }
  date: string
}

const typeColors: Record<string, string> = {
  apartment: 'bg-blue-500',
  house: 'bg-emerald-500',
  office: 'bg-violet-500',
  commercial: 'bg-orange-500',
  land: 'bg-amber-500',
}

export function PropertyCard({ property }: { property: Property }) {
  const [liked, setLiked] = useState(false)
  
  const formatPrice = (p: number) => 
    p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return (
    <article className="property-card group">
      {/* Фото */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Градиент сверху */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        
        {/* Тип объекта */}
        <div className="absolute top-4 left-4">
          <span className={`${typeColors[property.type] || 'bg-gray-500'} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide`}>
            {property.typeName}
          </span>
        </div>
        
        {/* Лайк */}
        <button 
          onClick={(e) => {
            e.preventDefault()
            setLiked(!liked)
          }}
          className="absolute top-4 right-4 p-2.5 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
        >
          <Heart className={`w-5 h-5 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>
        
        {/* Дата */}
        <div className="absolute bottom-4 right-4">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
            {property.date}
          </span>
        </div>
      </div>

      {/* Контент */}
      <div className="p-5 space-y-4">
        {/* Заголовок и цена */}
        <div>
          <h3 className="font-bold text-lg text-white leading-tight mb-2 line-clamp-2">
            {property.title}
          </h3>
          <p className="text-2xl font-bold text-green-400">
            {formatPrice(property.price)} ₸
          </p>
        </div>

        {/* Локация */}
        <div className="flex items-start gap-2 text-gray-400">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{property.district}, {property.address}</span>
        </div>

        {/* Характеристики */}
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-gray-500" />
            <span>{property.area} м²</span>
          </div>
          {property.rooms && (
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-gray-500" />
              <span>{property.rooms} комн.</span>
            </div>
          )}
          <span className="text-gray-500">{property.floor}</span>
        </div>

        {/* Риэлтор и действие */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              {property.owner.name[0]}
            </div>
            <div>
              <p className="font-medium text-white text-sm">{property.owner.name}</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-gray-400 text-xs">{property.owner.rating}</span>
              </div>
            </div>
          </div>
          
          <a
            href={`tel:${property.owner.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 px-4 py-2.5 rounded-xl font-medium transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Позвонить</span>
          </a>
        </div>
      </div>
    </article>
  )
}
