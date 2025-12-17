"use client"

import { useState } from "react"
import { ModelGrid } from "@/components/model-grid"
import { StartScreen } from "@/components/start-screen"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<"summer" | "winter" | null>(null)

  const handleSelectCollection = (category: "summer" | "winter") => {
    setSelectedCategory(category)
  }

  const handleBack = () => {
    setSelectedCategory(null)
  }

  if (!selectedCategory) {
    return <StartScreen onSelectCollection={handleSelectCollection} />
  }

  return <ModelGrid category={selectedCategory} onBack={handleBack} />
}

