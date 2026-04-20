import Link from 'next/link';

export default function AboutOurBlog() {
  const featuredPosts = [
    {
      slug: "ia-estilismo-personal",
      title: "Cómo la IA está transformando el estilismo personal",
      category: "AI & Tech",
      date: "Abr 12, 2026",
      image: "/images/blog/ai-styling.jpg"
    },
    {
      slug: "piezas-armario-capsula",
      title: "5 piezas básicas para construir tu armario cápsula",
      category: "Style",
      date: "Abr 10, 2026",
      image: "/images/blog/capsule-wardrobe.webp"
    },
    {
      slug: "psicologia-del-color",
      title: "La psicología del color: decide según tu mood",
      category: "Psychology",
      date: "Abr 08, 2026",
      image: "/images/blog/color-psychology.jpg"
    }
  ];

  return (
    <section className="py-32 lg:py-48 bg-[#F6F6F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-24 space-y-6">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter font-display">
            Nuestro <span className="italic font-medium text-[#8B3A4F]">Blog</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Explora nuestras ideas sobre moda consciente, IA y el futuro del estilismo personal.
          </p>
        </header>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
          {featuredPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group cursor-pointer block"
            >
              <article>
                {/* Imagen con efecto cinematográfico */}
                <div className="relative aspect-video mb-8 overflow-hidden rounded-sm bg-slate-800">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                  />
                </div>

                {/* Contenido */}
                <div className="space-y-4">
                  <h3 className="text-xl lg:text-2xl font-bold leading-tight font-display tracking-tight group-hover:text-[#8B3A4F] transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 bg-slate-700 rounded-full" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Botón Ver todos los artículos */}
        <footer className="mt-24 text-center">
          <Link 
            href="/blog" 
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] border-b border-transparent hover:border-[#8B3A4F] pb-2 transition-all"
          >
            Ver todos los artículos
            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
              ↗
            </span>
          </Link>
        </footer>

      </div>
    </section>
  );
}