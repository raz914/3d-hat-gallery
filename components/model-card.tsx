"use client"

import { useState, useRef, useEffect } from "react"
import { Loader2, Scan } from "lucide-react"
import type { Model } from "@/lib/models-data"
import { QRCodePanel } from "./qr-code-panel"

interface ModelCardProps {
  model: Model
  isVisible: boolean
}

export function ModelCard({ model, isVisible }: ModelCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [showQRPanel, setShowQRPanel] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Check if device is desktop
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    checkDesktop()
    window.addEventListener("resize", checkDesktop)
    return () => window.removeEventListener("resize", checkDesktop)
  }, [])

  // Only load iframe when it's visible and on current page
  useEffect(() => {
    if (isVisible) {
      // Small delay to stagger loading and prevent browser freeze
      const timer = setTimeout(
        () => {
          setShouldLoad(true)
        },
        100 * (model.id % 4),
      )
      return () => clearTimeout(timer)
    } else {
      setShouldLoad(false)
      setIsLoading(true)
    }
  }, [isVisible, model.id])

  const hasQRCode = Boolean(model.qrCode)

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-3xl border-4 border-transparent bg-gradient-to-br from-[#cbbeaa] to-[#eae1d3] p-[3px] shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden rounded-[1.3rem] bg-gradient-to-br from-stone-50 to-white h-full">
        {/* Model Name - Top Left */}
        <div className="absolute top-4 left-5 z-20">
          <h3 className="text-base font-medium text-stone-700">{model.name}</h3>
        </div>

        {/* 3D Model Container */}
        <div className="aspect-[4/5] md:aspect-[16/8] w-full relative bg-gradient-to-br from-stone-50 to-white">
          {isLoading && shouldLoad && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-50 z-10">
              <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
            </div>
          )}
          {shouldLoad ? (
            <>
              <iframe
                src={model.url}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsLoading(false)}
                title={model.name}
              />
              {/* AR Icon Button - Desktop Only */}
              {isDesktop && hasQRCode && (
                <button
                  onClick={() => setShowQRPanel(true)}
                  className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm border-2 border-stone-200 shadow-lg hover:bg-white hover:border-[#cbbeaa] hover:scale-110 transition-all duration-200 group"
                  aria-label="View AR QR Code"
                  title="View in AR"
                >
                  <Scan className="h-5 w-5 text-stone-700 group-hover:text-stone-900" />
                </button>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-50">
              <span className="text-stone-400 text-sm">Loading...</span>
            </div>
          )}
        </div>
      </div>

      {/* QR Code Panel */}
      {hasQRCode && model.qrCode && (
        <QRCodePanel
          qrCodeUrl={model.qrCode}
          isOpen={showQRPanel}
          onClose={() => setShowQRPanel(false)}
          modelName={model.name}
        />
      )}
    </div>
  )
}
