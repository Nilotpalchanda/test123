"use client"

import { useState, useEffect } from "react"
import KnowledgeCard from "./KnowledgeCard"
import { KnowledgeApiService } from "../api/mockApi"
import type { KnowledgeItem } from "../types"

interface KnowledgeCardsProps {
  className?: string
  showViewAll?: boolean
  viewAllText?: string
  viewAllUrl?: string
}

export default function KnowledgeCards({
  className = "",
  showViewAll = true,
  viewAllText = "View all knowledge",
  viewAllUrl = "#",
}: KnowledgeCardsProps) {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const data = await KnowledgeApiService.fetchKnowledgeItems()
        setKnowledgeItems(data)
      } catch (err) {
        setError("Failed to load knowledge items")
        console.error("Error fetching knowledge data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Knowledge picks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`w-full ${className}`}>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Knowledge picks</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {knowledgeItems.map((item) => (
          <KnowledgeCard key={item.id} item={item} />
        ))}
      </div>

      {showViewAll && (
        <div className="text-center">
          <a
            href={viewAllUrl}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            {viewAllText}
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      )}
    </div>
  )
}
