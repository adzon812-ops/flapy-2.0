'use client'

import { useState } from 'react'
import { MapPin, Maximize, Phone, Filter, Plus, Search, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'

// ... (весь код объектов остаётся такой же)

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

export default function HomePage() {
  // ... (весь код состояния и фильтров остаётся)

  const formatPrice = (p: number) => p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Шапка */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <span className="text-xl font-bold text-white">F</span>
            </div>
            <span className="text-xl font-bold hidden sm:block dark:text-white">Flapy</span>
          </Link>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-xl transition-colors ${showFilters ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white'}`}
            >
              <Filter className="w-5 h-5" />
            </button>
            <Link href="/add" className="hidden sm:flex btn-primary items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>Добавить</span>
            </Link>
          </div>
        </div>

        {/* Фильтры */}
        {showFilters && (
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4">
            <div className="max-w-7xl mx-auto flex gap-4">
              <select 
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="input-field w-48"
              >
                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input-field w-48"
              >
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        )}
      </header>

      {/* Контент */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold dark:text-white">Объекты недвижимости</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">Найдено: {filtered.length}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((obj) => (
            <Link href={`/object/${obj.id}`} key={obj.id}>
              <article className="card group cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={obj.image}
                    alt={obj.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      {obj.type}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-xs rounded-full dark:text-white">
                      {obj.date}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">{obj.title}</h3>
                  
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{obj.district}, {obj.address}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      <span>{obj.area} м²</span>
                    </div>
                    <span>{obj.floor}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                      {formatPrice(obj.price)} ₸
                    </span>
                    <span 
                      className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Phone className="w-4 h-4" />
                      <span className="hidden sm:inline">Подробнее</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-bold">
                      {obj.owner.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{obj.owner.name}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-xs">★</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{obj.owner.rating}</span>
                      </div>
                    </div>
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
    </div>
  )
}
