import type { KnowledgeItem } from "../types"

interface KnowledgeCardProps {
  item: KnowledgeItem
  className?: string
}

export default function KnowledgeCard({ item, className = "" }: KnowledgeCardProps) {
  return (
    <article className={`group cursor-pointer ${className}`}>
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Date */}
      <time className="text-sm text-gray-500 font-medium tracking-wide uppercase">{item.date}</time>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{item.description}</p>

      {/* Read More Link */}
      <a
        href={item.readMoreUrl || "#"}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm"
      >
        Read more
        <svg
          className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </article>
  )
}
