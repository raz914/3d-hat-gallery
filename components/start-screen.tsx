"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface StartScreenProps {
    onSelectCollection: (category: "summer" | "winter") => void
}

export function StartScreen({ onSelectCollection }: StartScreenProps) {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-100 via-stone-50 to-stone-100 p-4">
            <div className="w-full max-w-6xl">
                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-12"
                >
                    <Image
                        src="/Logo_Tirabasso.png"
                        alt="Tirabasso Logo"
                        width={160}
                        height={64}
                        className="object-contain"
                        priority
                    />
                </motion.div>

                {/* Collection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                    {/* Summer Collection */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Title Above Card */}
                        <h2 className="text-3xl font-bold text-stone-800 text-center mb-4">
                            Summer Collection
                        </h2>

                        <button
                            onClick={() => onSelectCollection("summer")}
                            onMouseEnter={() => setHoveredCard("summer")}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="w-full group"
                        >
                            <div className="relative overflow-hidden rounded-3xl border-4 border-transparent bg-gradient-to-br from-[#cbbeaa] to-[#eae1d3] p-[3px] shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
                                <div className="relative overflow-hidden rounded-[1.3rem]">
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src="/summer.jpg"
                                            alt="Summer Collection"
                                            fill
                                            className={`object-cover transition-transform duration-700 ${hoveredCard === "summer" ? "scale-110" : "scale-100"
                                                }`}
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                    </div>

                                    {/* Hover Effect - Explore Text */}
                                    <div
                                        className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${hoveredCard === "summer" ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                            }`}
                                    >
                                        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 text-center">
                                            <p className="text-stone-800 font-semibold text-lg">Explore our 3D Hat Collections</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </motion.div>

                    {/* Winter Collection */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Title Above Card */}
                        <h2 className="text-3xl font-bold text-stone-800 text-center mb-4">
                            Winter Collection
                        </h2>

                        <button
                            onClick={() => onSelectCollection("winter")}
                            onMouseEnter={() => setHoveredCard("winter")}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="w-full group"
                        >
                            <div className="relative overflow-hidden rounded-3xl border-4 border-transparent bg-gradient-to-br from-[#cbbeaa] to-[#eae1d3] p-[3px] shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
                                <div className="relative overflow-hidden rounded-[1.3rem]">
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src="/winter.jpg"
                                            alt="Winter Collection"
                                            fill
                                            className={`object-cover transition-transform duration-700 ${hoveredCard === "winter" ? "scale-110" : "scale-100"
                                                }`}
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                    </div>

                                    {/* Hover Effect - Explore Text */}
                                    <div
                                        className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${hoveredCard === "winter" ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                            }`}
                                    >
                                        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 text-center">
                                            <p className="text-stone-800 font-semibold text-lg">Explore our 3D Hat Collections</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </motion.div>
                </div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-8"
                >
                    <p className="text-stone-600 text-sm italic">&quot;Explore our 3D Hat Collections&quot;</p>
                </motion.div>
            </div>
        </div>
    )
}
