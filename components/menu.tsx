"use client"

import { useState } from "react"
import { menuData } from "@/data/menu-data"
import type { MenuCategory } from "@/types/menu"
import MenuItems from "./menu-items"

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>(menuData[0].id)

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
  }

  const activeItems = menuData.find((category) => category.id === activeCategory) as MenuCategory

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide bg-gradient-to-r from-amber-100 to-orange-100">
        {menuData.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-6 py-4 text-sm md:text-base font-medium whitespace-nowrap transition-all duration-300 ${
              activeCategory === category.id
                ? "text-amber-800 border-b-2 border-amber-500 bg-white shadow-sm"
                : "text-amber-700 hover:text-amber-900 hover:bg-amber-50"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-6 font-serif">{activeItems.name}</h2>
        <MenuItems items={activeItems.items} />
      </div>
    </div>
  )
}
