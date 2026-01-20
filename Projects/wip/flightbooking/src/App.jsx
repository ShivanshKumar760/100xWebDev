/*eslint-disable*/
import React, { useState } from "react";
import {
  Search,
  Plane,
  Calendar,
  Users,
  CreditCard,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const App = () => {
  const [step, setStep] = useState("search");
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    departDate: "",
    returnDate: "",
    adults: 1,
  });
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Mock flight search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockFlights = [
        {
          id: 1,
          airline: "Air India",
          flightNumber: "AI202",
          departure: searchParams.origin || "DEL",
          arrival: searchParams.destination || "BOM",
          departTime: "08:00",
          arriveTime: "10:30",
          duration: "2h 30m",
          price: 4500,
          currency: "INR",
        },
        {
          id: 2,
          airline: "IndiGo",
          flightNumber: "6E345",
          departure: searchParams.origin || "DEL",
          arrival: searchParams.destination || "BOM",
          departTime: "14:15",
          arriveTime: "16:45",
          duration: "2h 30m",
          price: 3800,
          currency: "INR",
        },
        {
          id: 3,
          airline: "Vistara",
          flightNumber: "UK955",
          departure: searchParams.origin || "DEL",
          arrival: searchParams.destination || "BOM",
          departTime: "18:30",
          arriveTime: "21:00",
          duration: "2h 30m",
          price: 5200,
          currency: "INR",
        },
      ];
      setFlights(mockFlights);
      setStep("results");
      setLoading(false);
    }, 1500);
  };

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    setStep("booking");
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePayment = async (method) => {
    setPaymentMethod(method);
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setBookingConfirmed(true);
      setStep("confirmation");
    }, 2000);
  };

  // Razorpay Integration
  const processRazorpay = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: selectedFlight.price * 100,
      currency: "INR",
      name: "Flight Booking",
      description: `${selectedFlight.flightNumber} - ${selectedFlight.departure} to ${selectedFlight.arrival}`,
      handler: function (response) {
        handlePayment("razorpay");
      },
    };

    // In production: const rzp = new window.Razorpay(options);
    // rzp.open();
    handlePayment("razorpay");
  };

  // Stripe Integration
  const processStripe = () => {
    // In production, use Stripe Elements
    handlePayment("stripe");
  };

  // UPI Integration
  const processUPI = () => {
    handlePayment("upi");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Plane className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">SkyBook</h1>
          </div>
          <p className="text-gray-600">Book your perfect flight in minutes</p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {["search", "results", "booking", "payment", "confirmation"].map(
              (s, i) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step === s
                        ? "bg-blue-600 text-white"
                        : [
                            "search",
                            "results",
                            "booking",
                            "payment",
                            "confirmation",
                          ].indexOf(step) > i
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {[
                      "search",
                      "results",
                      "booking",
                      "payment",
                      "confirmation",
                    ].indexOf(step) > i ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < 4 && <div className="flex-1 h-1 bg-gray-300 mx-2" />}
                </div>
              )
            )}
          </div>
        </div>

        {/* Search Form */}
        {step === "search" && (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Search Flights
            </h2>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origin
                  </label>
                  <input
                    type="text"
                    placeholder="DEL - New Delhi"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchParams.origin}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        origin: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    placeholder="BOM - Mumbai"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchParams.destination}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        destination: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchParams.departDate}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        departDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchParams.returnDate}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        returnDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passengers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="9"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchParams.adults}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        adults: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center disabled:bg-gray-400"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2" />
                    Search Flights
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Flight Results */}
        {step === "results" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Available Flights
            </h2>
            <div className="space-y-4">
              {flights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">
                        {flight.airline}
                      </h3>
                      <p className="text-gray-600">{flight.flightNumber}</p>
                    </div>
                    <div className="flex items-center gap-8 flex-1">
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {flight.departTime}
                        </p>
                        <p className="text-gray-600">{flight.departure}</p>
                      </div>
                      <div className="flex-1 text-center">
                        <ArrowRight className="w-8 h-8 mx-auto text-gray-400" />
                        <p className="text-sm text-gray-600 mt-1">
                          {flight.duration}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {flight.arriveTime}
                        </p>
                        <p className="text-gray-600">{flight.arrival}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">
                        ₹{flight.price}
                      </p>
                      <button
                        onClick={() => handleFlightSelect(flight)}
                        className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking Form */}
        {step === "booking" && selectedFlight && (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Passenger Details
            </h2>

            {/* Selected Flight Summary */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="font-semibold">
                {selectedFlight.airline} - {selectedFlight.flightNumber}
              </p>
              <p className="text-sm text-gray-600">
                {selectedFlight.departure} → {selectedFlight.arrival} |{" "}
                {searchParams.departDate}
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={bookingDetails.firstName}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        firstName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={bookingDetails.lastName}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        lastName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={bookingDetails.email}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={bookingDetails.phone}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        phone: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Continue to Payment
              </button>
            </form>
          </div>
        )}

        {/* Payment Selection */}
        {step === "payment" && selectedFlight && (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Choose Payment Method
            </h2>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-xl font-bold">
                Total Amount: ₹{selectedFlight.price}
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={processRazorpay}
                disabled={loading}
                className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center disabled:bg-gray-400"
              >
                {loading && paymentMethod === "razorpay" ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  <CreditCard className="mr-2" />
                )}
                Pay with Razorpay
              </button>

              <button
                onClick={processStripe}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center disabled:bg-gray-400"
              >
                {loading && paymentMethod === "stripe" ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  <CreditCard className="mr-2" />
                )}
                Pay with Stripe
              </button>

              <button
                onClick={processUPI}
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center disabled:bg-gray-400"
              >
                {loading && paymentMethod === "upi" ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  <CreditCard className="mr-2" />
                )}
                Pay with UPI
              </button>
            </div>
          </div>
        )}

        {/* Confirmation */}
        {step === "confirmation" && bookingConfirmed && selectedFlight && (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600">
                Your flight has been successfully booked
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-6 text-left">
              <h3 className="font-bold text-lg mb-4">Booking Details</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Booking ID:</span> BK
                  {Date.now()}
                </p>
                <p>
                  <span className="font-semibold">Passenger:</span>{" "}
                  {bookingDetails.firstName} {bookingDetails.lastName}
                </p>
                <p>
                  <span className="font-semibold">Flight:</span>{" "}
                  {selectedFlight.airline} - {selectedFlight.flightNumber}
                </p>
                <p>
                  <span className="font-semibold">Route:</span>{" "}
                  {selectedFlight.departure} → {selectedFlight.arrival}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {searchParams.departDate}
                </p>
                <p>
                  <span className="font-semibold">Amount Paid:</span> ₹
                  {selectedFlight.price}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              A confirmation email has been sent to {bookingDetails.email}
            </p>

            <button
              onClick={() => {
                setStep("search");
                setSelectedFlight(null);
                setBookingConfirmed(false);
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Book Another Flight
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
