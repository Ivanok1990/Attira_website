// content/blog/primer-post.js
export const post = {
  slug: "primer-post",
  title: "Bienvenidos al Blog de ATTIRA",
  date: "2024-01-15",
  excerpt: "Descubre las últimas tendencias en moda y estilo",

  content: (
    <div className="space-y-8">
      <h1>Bienvenidos al Blog de ATTIRA</h1>
      
      <p>Este es nuestro primer post del blog. Aquí compartiremos las últimas <strong>tendencias de moda</strong>, consejos de estilo y novedades.</p>

      <h2>¿Qué encontrarás?</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Tendencias de temporada</li>
        <li>Guías de estilo</li>
        <li>Novedades de productos</li>
        <li>Consejos de moda</li>
      </ul>

      <p>¡Suscríbete para no perderte nada!</p>
    </div>
  )
}