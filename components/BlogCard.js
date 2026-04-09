import Link from 'next/link'

export default function BlogCard({ post }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-500 text-sm mb-4">{post.date}</p>
        <p className="text-gray-700 mb-4">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          Leer más →
        </Link>
      </div>
    </article>
  )
}