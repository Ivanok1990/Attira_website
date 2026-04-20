// lib/posts.js
const allPosts = [
  require('@/content/blog/tendencias-primavera-2026').post,
  require('@/content/blog/como-armar-armario-capsula').post,
  require('@/content/blog/ia-en-la-moda').post,
  require('@/content/blog/primer-post').post,
  require('@/content/blog/ia-estilismo-personal').post,      // nuevo
  require('@/content/blog/piezas-armario-capsula').post,     // nuevo
  require('@/content/blog/psicologia-del-color').post,       // nuevo
]

export function getAllPosts() {
  return [...allPosts].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug) {
  return allPosts.find(post => post.slug === slug) || null
}