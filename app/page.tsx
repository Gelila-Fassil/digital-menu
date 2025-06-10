import Menu from "@/components/menu"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SpinButton from "@/components/spin-button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-amber-50 to-orange-50 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-800 font-serif">Our Menu</h1>
            <div className="flex items-center justify-center mt-4">
              <div className="h-0.5 w-12 bg-amber-400"></div>
              <p className="text-amber-700 mx-4 italic">Exquisite dining experience</p>
              <div className="h-0.5 w-12 bg-amber-400"></div>
            </div>
          </header>
          <Menu />
        </div>
      </main>
      <Footer />
      <SpinButton />
    </div>
  )
}
