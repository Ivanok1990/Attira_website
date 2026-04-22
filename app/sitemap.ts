// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://attirai.com'

  const blogBaseUrl = 'https://www.attiraai.com'

  return [
    // === Páginas del sitio principal (attirai.com) ===
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // === Artículos del Blog (en www.attiraai.com) ===
    {
      url: `${blogBaseUrl}/blog/ia-estilismo-personal`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${blogBaseUrl}/blog/piezas-armario-capsula`,
      lastModified: new Date('2026-04-10'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${blogBaseUrl}/blog/psicologia-del-color`,
      lastModified: new Date('2026-04-08'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${blogBaseUrl}/blog/tendencias-primavera-2026`,
      lastModified: new Date('2026-03-10'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${blogBaseUrl}/blog/ia-en-la-moda`,
      lastModified: new Date('2024-04-05'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${blogBaseUrl}/blog/como-armar-armario-capsula`,
      lastModified: new Date('2024-02-20'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${blogBaseUrl}/blog/primer-post`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ]
}