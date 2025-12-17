"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { modelUrls } from "@/lib/models-data"
import { ModelCard } from "./model-card"
import { PaginationControls } from "./pagination-controls"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

interface ModelGridProps {
  category?: "summer" | "winter"
  onBack?: () => void
}

export function ModelGrid({ category, onBack }: ModelGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Reset to page 1 when switching between mobile/desktop
  useEffect(() => {
    setCurrentPage(1)
  }, [isMobile])

  const ITEMS_PER_PAGE = isMobile ? 2 : 4

  const filteredModels = useMemo(() => {
    if (!category) return modelUrls
    return modelUrls.filter((model) => model.category === category)
  }, [category])

  const totalPages = Math.ceil(filteredModels.length / ITEMS_PER_PAGE)

  const currentModels = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredModels.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [currentPage, filteredModels, ITEMS_PER_PAGE])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-stone-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 relative">
          {/* Logo - Top Left on desktop, centered on mobile */}
          <div className="md:absolute md:left-0 md:top-0 flex justify-center md:justify-start mb-4 md:mb-0">
            <Image src="/Logo_Tirabasso.png" alt="Tirabasso Logo" width={100} height={40} className="object-contain" />
          </div>

          {/* Collection Title - Centered */}
          <div className="text-center md:pt-8">
            <h1 className="text-4xl font-bold text-stone-800 capitalize">{category} Collection</h1>
          </div>

          {/* Back Button - Optional */}
          {onBack && (
            <div className="md:absolute md:right-0 md:top-0 flex justify-center md:justify-end mt-4 md:mt-0">
              <Button onClick={onBack} variant="ghost" size="sm" className="gap-2 text-stone-600 hover:text-stone-800">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </div>
          )}
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-7xl mx-auto">
          {currentModels.map((model) => (
            <ModelCard key={model.id} model={model} isVisible={true} />
          ))}
        </div>

        {/* Pagination */}
        <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  )
}

