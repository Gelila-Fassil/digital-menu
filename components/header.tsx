import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 overflow-hidden">
              <Image
                src="/placeholder.svg?height=48&width=48"
                alt="Hotel Grand Restaurant Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-amber-800">Hotel Grand</h2>
              <p className="text-xs text-amber-600">Fine Dining</p>
            </div>
          </div>

          <nav>
            <Link
              href="#contact"
              className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full transition-colors duration-300 text-sm font-medium"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
