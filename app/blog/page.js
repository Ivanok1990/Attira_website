import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="bg-[#F6F6F6] min-h-screen pt-36 pb-20">
      {/* Hero del blog - Mejorado */}
      <div className="bg-[#F6F1EE] py-24 text-center relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#653F3C] opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-[#8B3A4F] opacity-15 blur-3xl rounded-full"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <p className="text-sm tracking-[0.2em] text-[#8B3A4F] uppercase mb-4 font-medium">
            Estilo & Tendencias
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-[#131416] mb-6 font-display tracking-tight">
            Blog de Moda
          </h1>
          <p className="text-[#653F3C] text-xl max-w-2xl mx-auto">
            Consejos prácticos, tendencias actuales y todo lo que necesitas para vestir mejor cada día con ATTIRA.
          </p>
        </div>
      </div>

      {/* Grid de posts - Mejorado */}
      <div className="max-w-7xl mx-auto px-6 pt-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-slate-600">No hay artículos aún.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>

      
      <div className="text-center mt-20">
        {/*
        <a 
          href="https://attiraai.com/" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 px-10 items-center justify-center bg-[#8B3A4F] text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(139,58,79,0.3)] hover:shadow-[0_0_50px_rgba(139,58,79,0.5)]"
        >
          Descargar App Gratis →
        </a>*/}
      </div>
    </div>

  )
}