import { getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = getAllPosts()           // ← Necesitas importar getAllPosts
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// ← Importa getAllPosts aquí también
import { getAllPosts } from '@/lib/posts'

export default async function PostPage({ params }) {
  const { slug } = await params        // ← Esto es lo más importante
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="bg-[#F6F6F6] min-h-screen">
      {/* Header del post */}
      <div className="bg-[#F6F1EE] py-16 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#653F3C] opacity-20 blur-3xl rounded-full"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#8B3A4F] font-semibold mb-6 hover:gap-3 transition-all"
          >
            ← Volver al blog
          </Link>
          <p className="text-xs tracking-widest text-[#8B3A4F] uppercase mb-3">
            {new Date(post.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#131416] leading-tight font-display">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-[#653F3C] text-lg">{post.excerpt}</p>
          )}
        </div>
      </div>

      {/* Contenido del post */}
      <article className="max-w-3xl mx-auto px-6 py-14">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm prose prose-lg max-w-none
          prose-headings:text-[#131416] prose-headings:font-bold
          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
          prose-p:text-[#3D2C2C] prose-p:leading-relaxed
          prose-a:text-[#8B3A4F] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[#131416]
          prose-li:text-[#3D2C2C]
          prose-blockquote:border-l-[#8B3A4F] prose-blockquote:text-[#653F3C] prose-blockquote:bg-[#F6F1EE] prose-blockquote:rounded-r-lg prose-blockquote:px-4 prose-blockquote:py-1
          prose-hr:border-[#e5d8d3]">
          
          {post.content}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-block bg-[#8B3A4F] text-white px-8 py-3 rounded-full font-medium hover:bg-[#653F3C] transition-colors"
          >
            ← Ver todos los artículos
          </Link>
        </div>
      </article>
    </div>
  )
}