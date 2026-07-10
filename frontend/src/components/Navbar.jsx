import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">

            <div className="max-w-7xl mx-auto px-8">

                <div className="flex justify-between items-center h-20">

                    {/* Logo */}

                    <div>

                        <h1 className="text-3xl font-bold text-blue-700">

                            Aarogya Nirmaan

                        </h1>

                    </div>

                    {/* Menu */}

                    <div className="flex items-center gap-8 font-semibold">

                        <Link
                            to="/"
                            className="hover:text-blue-600 transition"
                        >
                            Home
                        </Link>

                        <Link
                            to="/media"
                            className="hover:text-blue-600 transition"
                        >
                            Media
                        </Link>

                        <Link
                            to="/about"
                            className="hover:text-blue-600 transition"
                        >
                            About
                        </Link>

                        <Link
                            to="/faqs"
                            className="hover:text-blue-600 transition"
                        >
                            FAQs
                        </Link>

                        <Link
                            to="/support"
                            className="hover:text-blue-600 transition"
                        >
                            Support
                        </Link>

                        <Link
                            to="/auth"
                            className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-5
                            py-2
                            rounded-lg
                            transition
                            "
                        >

                            Register / Login

                        </Link>

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;