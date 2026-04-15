import Link from 'next/link'

export default function BlogCard({ post }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Barra decorativa superior */}
      <div className="h-1 bg-linear-to-r from-[#8B3A4F] to-[#653F3C]"></div>

      <div className="p-6 flex flex-col flex-1">
        {/* Fecha */}
        <p className="text-xs tracking-widest text-[#8B3A4F] uppercase mb-3">
          {new Date(post.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        {/* Título */}
        <h2 className="text-xl font-bold text-[#131416] mb-3 leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:text-[#8B3A4F] transition-colors">
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-[#653F3C] text-sm leading-relaxed flex-1 mb-6">
          {post.excerpt}
        </p>

        {/* CTA */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B3A4F] hover:gap-3 transition-all"
        >
          Leer artículo <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  )
}
