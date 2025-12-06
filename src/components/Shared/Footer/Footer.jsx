import { NavLink } from "react-router"
import logo from "../../../assets/gtLogo.PNG"

const Footer = () => {
  return (
    <footer className="bg-[#FEEAE6] text-[#442C2E] py-10 mt-10 border-t">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">

        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="GarmentTrack Logo" className="w-12 h-12 rounded-full" />
            <h2 className="text-2xl font-bold">GarmentTrack</h2>
          </div>
          <p className="mt-3 text-sm">
            GarmentTrack is your smart solution to track garment production, manage orders,
            and improve workflow efficiently.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/" className="hover:underline">Home</NavLink></li>
            <li><NavLink to="/all-products" className="hover:underline">All Products</NavLink></li>
            <li><NavLink to="/about-us" className="hover:underline">About Us</NavLink></li>
            <li><NavLink to="/contact" className="hover:underline">Contact</NavLink></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p className="text-sm">Email: support@garmenttrack.com</p>
          <p className="text-sm">Phone: +880 1234-567890</p>
          <p className="text-sm">Address: Dhaka, Bangladesh</p>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="mt-8 pt-5 border-t text-center text-sm text-gray-600">
        © 2025-2026 GarmentTrack Inc. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
