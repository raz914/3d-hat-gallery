"use client"

import { X } from "lucide-react"
import { useEffect } from "react"
import Image from "next/image"

interface QRCodePanelProps {
    qrCodeUrl: string
    isOpen: boolean
    onClose: () => void
    modelName: string
}

export function QRCodePanel({ qrCodeUrl, isOpen, onClose, modelName }: QRCodePanelProps) {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            return () => document.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-stone-50 to-white shadow-2xl z-50 transform transition-transform duration-300 ease-out">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-stone-200">
                    <div>
                        <h2 className="text-xl font-semibold text-stone-800">AR View</h2>
                        <p className="text-sm text-stone-500 mt-1">Scan to view in AR</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-stone-100 transition-colors duration-200"
                        aria-label="Close panel"
                    >
                        <X className="h-6 w-6 text-stone-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center justify-center p-8 h-[calc(100%-88px)]">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border-4 border-transparent bg-gradient-to-br from-[#cbbeaa] to-[#eae1d3] bg-clip-padding">
                        <div className="bg-white rounded-xl p-4">
                            <Image
                                src={qrCodeUrl}
                                alt={`QR code for ${modelName}`}
                                width={300}
                                height={300}
                                className="w-full h-auto"
                                priority
                            />
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-stone-700 font-medium">{modelName}</p>
                        <p className="text-sm text-stone-500 mt-2">
                            Point your device camera at this QR code to view the hat in augmented reality
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
