"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="rounded-full bg-stone-200 hover:bg-stone-300 disabled:opacity-30 disabled:hover:bg-stone-200 w-10 h-10"
      >
        <ChevronLeft className="h-5 w-5 text-stone-700" />
      </Button>

      <div className="text-stone-700 font-medium text-lg min-w-[60px] text-center">
        {currentPage} / {totalPages}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="rounded-full bg-stone-200 hover:bg-stone-300 disabled:opacity-30 disabled:hover:bg-stone-200 w-10 h-10"
      >
        <ChevronRight className="h-5 w-5 text-stone-700" />
      </Button>
    </div>
  )
}
