import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-amber-800 text-amber-100 py-8 px-6" id="contact">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Hotel Grand Restaurant</h3>
            <p className="text-sm mb-2">123 Gourmet Avenue</p>
            <p className="text-sm mb-2">Culinary District, CA 90210</p>
            <p className="text-sm">© {new Date().getFullYear()} Hotel Grand. All rights reserved.</p>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Contact Information</h3>
            <p className="text-sm mb-2">Phone: (555) 123-4567</p>
            <p className="text-sm mb-2">Email: dining@hotelgrand.com</p>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-amber-100 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-amber-100 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="text-amber-100 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Opening Hours</h3>
            <p className="text-sm mb-2">Monday - Friday: 7:00 AM - 10:00 PM</p>
            <p className="text-sm mb-2">Saturday: 8:00 AM - 11:00 PM</p>
            <p className="text-sm">Sunday: 8:00 AM - 9:00 PM</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
