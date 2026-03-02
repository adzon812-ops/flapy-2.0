export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">F</span>
            </div>
            <span className="text-xl font-bold">Flapy</span>
          </div>
          <button className="btn-primary">Войти</button>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          Объекты недвижимости Астаны
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-4">
              <div className="aspect-video bg-gray-200 rounded-xl mb-4" />
              <h3 className="font-semibold text-lg">3-комнатная квартира</h3>
              <p className="text-gray-500">Есиль, 85 м²</p>
              <p className="text-green-600 font-bold text-xl mt-2">45 000 000 ₸</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
