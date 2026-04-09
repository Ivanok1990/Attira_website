import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}