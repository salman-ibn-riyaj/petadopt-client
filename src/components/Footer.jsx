// components/Footer.jsx
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import ScrollMotion from "./ScrollMotion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <ScrollMotion>
      <footer className="bg-[#170C79] dark:bg-slate-950 text-white transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: About / Brand */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">PetAdopt</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Connecting loving homes with loyal companions, one paw at a
                time. PetAdopt is dedicated to making pet adoption simple, safe,
                and heart-centered for everyone.
              </p>
            </div>

            {/* Column 2: Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">
                Contact Information
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-blue-300 mt-1">📍</span>
                  <p>Mymensingh, Bangladesh</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-300 mt-1">📞</span>
                  <p>+880 1894692543</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-300 mt-1">✉️</span>
                  <p>salmanibnriyaj@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Column 3: Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="hover:text-blue-300 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/all-pets"
                    className="hover:text-blue-300 transition-colors"
                  >
                    All Pets
                  </Link>
                </li>

                <li></li>
              </ul>
            </div>

            {/* Column 4: Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
              <div className="flex gap-4">
                <Link
                  href="https://www.facebook.com/salmanshahibneriyaj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-full transition-all hover:scale-110"
                >
                  <FaFacebookF size={20} />
                </Link>
                <Link
                  href="https://x.com/salmanshahrz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-full transition-all hover:scale-110"
                >
                  <FaTwitter size={20} />
                </Link>

                <Link
                  href="https://www.linkedin.com/in/salman-ibn-riyaj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-full transition-all hover:scale-110"
                >
                  <FaLinkedinIn size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 my-10"></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
            <p>© {currentYear} PetAdopt. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </ScrollMotion>
  );
}
