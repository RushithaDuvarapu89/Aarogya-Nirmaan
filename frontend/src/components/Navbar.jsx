import { Link, useLocation } from "react-router-dom";
import { HeartPulse } from "lucide-react";

function Navbar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

                {/* Logo */}

                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                    <HeartPulse
                        className="text-red-600"
                        size={34}
                    />

                    <h1 className="text-3xl font-bold text-blue-700">
                        Aarogya Nirmaan
                    </h1>
                </Link>

                {/* Navigation */}

                <div className="flex items-center gap-8 text-lg font-medium">

                    <Link
                        to="/"
                        className={`transition ${
                            isActive("/")
                                ? "text-blue-700 font-bold"
                                : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/media"
                        className={`transition ${
                            isActive("/media")
                                ? "text-blue-700 font-bold"
                                : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                        Media
                    </Link>

                    <Link
                        to="/about"
                        className={`transition ${
                            isActive("/about")
                                ? "text-blue-700 font-bold"
                                : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                        About
                    </Link>

                    <Link
                        to="/faqs"
                        className={`transition ${
                            isActive("/faqs")
                                ? "text-blue-700 font-bold"
                                : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                        FAQs
                    </Link>

                    <Link
                        to="/support"
                        className={`transition ${
                            isActive("/support")
                                ? "text-blue-700 font-bold"
                                : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                        Support
                    </Link>

                </div>

                {/* Register/Login */}

                <Link
                    to="/roles"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-lg"
                >
                    Register / Login
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;