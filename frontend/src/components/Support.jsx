import {
  Phone,
  Mail,
  MapPin,
  Clock
} from "lucide-react";

function Support() {
  return (
    <section className="py-20 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center text-blue-700 mb-10">
          Support
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <Phone className="text-blue-600 mb-4" size={40} />

            <h2 className="text-2xl font-bold mb-3">
              Call Us
            </h2>

            <p className="text-gray-600">
              +91 9876543210
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <Mail className="text-green-600 mb-4" size={40} />

            <h2 className="text-2xl font-bold mb-3">
              Email
            </h2>

            <p className="text-gray-600">
              support@aarogyanirmaan.com
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <MapPin className="text-red-600 mb-4" size={40} />

            <h2 className="text-2xl font-bold mb-3">
              Address
            </h2>

            <p className="text-gray-600">
              Hyderabad, Telangana, India
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <Clock className="text-orange-600 mb-4" size={40} />

            <h2 className="text-2xl font-bold mb-3">
              Working Hours
            </h2>

            <p className="text-gray-600">
              Monday - Sunday
            </p>

            <p className="text-gray-600">
              24 × 7 Support
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Support;