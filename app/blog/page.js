import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="bg-[#F6F6F6] min-h-screen pt-36">
      {/* Hero del blog */}
      <div className="bg-[#F6F1EE] py-20 text-center relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#653F3C] opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute left-0 bottom-0 w-72 h-72 bg-[#8B3A4F] opacity-15 blur-3xl rounded-full"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <p className="text-sm tracking-widest text-[#8B3A4F] uppercase mb-3">
            Estilo & Tendencias
          </p>
          <h1 className="text-5xl font-bold text-[#131416] mb-4 font-display">
            Blog de Moda
          </h1>
          <p className="text-[#653F3C] text-lg">
            Consejos, tendencias y todo lo que necesitas para vestir mejor cada día.
          </p>
        </div>
      </div>

      {/* Grid de posts */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
