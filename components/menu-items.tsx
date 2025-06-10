import Image from "next/image"
import type { MenuItem } from "@/types/menu"

interface MenuItemsProps {
  items: MenuItem[]
}

export default function MenuItems({ items }: MenuItemsProps) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="border-b border-amber-100 pb-6 last:border-0 last:pb-0 hover:bg-amber-50 transition-colors duration-300 rounded-xl p-4"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start w-full">
                  <h3 className="text-lg sm:text-xl font-semibold text-amber-800">{item.name}</h3>
                  <div className="ml-2 bg-amber-100 px-3 py-1 rounded-full text-amber-800 font-medium whitespace-nowrap">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <p className="text-amber-700 mt-2 text-sm sm:text-base">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
