// /*eslint-disable*/
// import React, { useState, useEffect } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
//   useMap,
// } from "react-leaflet";
// import {
//   Car,
//   User,
//   MapPin,
//   CreditCard,
//   Clock,
//   DollarSign,
//   Navigation,
// } from "lucide-react";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import io from "socket.io-client";

// // Fix Leaflet default marker icon
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const carIcon = new L.Icon({
//   iconUrl:
//     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxOCIgZmlsbD0iIzAwMDAwMCIvPjxwYXRoIGQ9Ik0yMCAxMEwyNSAyMEgxNUwyMCAxMFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+",
//   iconSize: [40, 40],
//   iconAnchor: [20, 20],
// });

// const socket = io("http://localhost:5000");

// const MapController = ({ center }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (center) map.setView(center, 13);
//   }, [center, map]);
//   return null;
// };

// export default function UberClone() {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [view, setView] = useState("login");
//   const [userRole, setUserRole] = useState("rider");

//   // Location & Map
//   const [currentLocation, setCurrentLocation] = useState([18.5204, 73.8567]); // Pune
//   const [pickupLocation, setPickupLocation] = useState(null);
//   const [dropoffLocation, setDropoffLocation] = useState(null);
//   const [driverLocation, setDriverLocation] = useState(null);

//   // Ride Management
//   const [currentRide, setCurrentRide] = useState(null);
//   const [availableRides, setAvailableRides] = useState([]);
//   const [rideHistory, setRideHistory] = useState([]);
//   const [fare, setFare] = useState(0);

//   // Forms
//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const [registerData, setRegisterData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     role: "rider",
//   });

//   useEffect(() => {
//     if (token) {
//       fetchUserProfile();
//       getUserLocation();
//     }
//   }, [token]);

//   useEffect(() => {
//     socket.on("newRideRequest", (ride) => {
//       if (userRole === "driver") {
//         setAvailableRides((prev) => [...prev, ride]);
//       }
//     });

//     socket.on("rideAccepted", (ride) => {
//       if (currentRide && ride._id === currentRide._id) {
//         setCurrentRide(ride);
//       }
//     });

//     socket.on("driverLocation", (data) => {
//       if (currentRide && data.rideId === currentRide._id) {
//         setDriverLocation(data.location);
//       }
//     });

//     socket.on("rideStatusUpdate", (ride) => {
//       if (currentRide && ride._id === currentRide._id) {
//         setCurrentRide(ride);
//       }
//     });

//     return () => {
//       socket.off("newRideRequest");
//       socket.off("rideAccepted");
//       socket.off("driverLocation");
//       socket.off("rideStatusUpdate");
//     };
//   }, [currentRide, userRole]);

//   // Simulate driver movement
//   useEffect(() => {
//     if (
//       userRole === "driver" &&
//       currentRide &&
//       currentRide.status !== "completed"
//     ) {
//       const interval = setInterval(() => {
//         setDriverLocation((prev) => {
//           const newLoc = prev || currentLocation;
//           const lat = newLoc[0] + (Math.random() - 0.5) * 0.001;
//           const lng = newLoc[1] + (Math.random() - 0.5) * 0.001;

//           socket.emit("driverLocationUpdate", {
//             driverId: user?.id,
//             location: [lat, lng],
//             rideId: currentRide._id,
//           });

//           return [lat, lng];
//         });
//       }, 2000);

//       return () => clearInterval(interval);
//     }
//   }, [userRole, currentRide, user]);

//   const getUserLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const loc = [position.coords.latitude, position.coords.longitude];
//         setCurrentLocation(loc);
//         setPickupLocation(loc);
//       });
//     }
//   };

//   const fetchUserProfile = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/user/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setUser(data);
//       setUserRole(data.role);
//       setView(data.role === "driver" ? "driverDashboard" : "riderDashboard");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginData),
//       });
//       const data = await res.json();
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         setToken(data.token);
//         setUser(data.user);
//         setUserRole(data.user.role);
//         setView(
//           data.user.role === "driver" ? "driverDashboard" : "riderDashboard"
//         );
//       }
//     } catch (err) {
//       alert("Login failed");
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(registerData),
//       });
//       const data = await res.json();
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         setToken(data.token);
//         setUser(data.user);
//         setUserRole(data.user.role);
//         setView(
//           data.user.role === "driver" ? "driverDashboard" : "riderDashboard"
//         );
//       }
//     } catch (err) {
//       alert("Registration failed");
//     }
//   };

//   const calculateFare = (pickup, dropoff) => {
//     const distance =
//       Math.sqrt(
//         Math.pow(pickup[0] - dropoff[0], 2) +
//           Math.pow(pickup[1] - dropoff[1], 2)
//       ) * 111; // rough km conversion

//     const baseFare = 50;
//     const perKm = 15;
//     return Math.round(baseFare + distance * perKm);
//   };

//   const requestRide = async () => {
//     if (!pickupLocation || !dropoffLocation) {
//       alert("Please select pickup and dropoff locations");
//       return;
//     }

//     const calculatedFare = calculateFare(pickupLocation, dropoffLocation);
//     setFare(calculatedFare);

//     try {
//       const res = await fetch("http://localhost:5000/api/rides/request", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           pickup: {
//             lat: pickupLocation[0],
//             lng: pickupLocation[1],
//             address: "Pickup Location",
//           },
//           dropoff: {
//             lat: dropoffLocation[0],
//             lng: dropoffLocation[1],
//             address: "Dropoff Location",
//           },
//           fare: calculatedFare,
//           distance: Math.abs(pickupLocation[0] - dropoffLocation[0]) * 111,
//         }),
//       });
//       const ride = await res.json();
//       setCurrentRide(ride);
//       setView("waitingForDriver");
//     } catch (err) {
//       alert("Failed to request ride");
//     }
//   };

//   const acceptRide = async (rideId) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/rides/${rideId}/accept`,
//         {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const ride = await res.json();
//       setCurrentRide(ride);
//       setDriverLocation(currentLocation);
//       setView("activeRide");
//     } catch (err) {
//       alert("Failed to accept ride");
//     }
//   };

//   const updateRideStatus = async (status) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/rides/${currentRide._id}/status`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ status }),
//         }
//       );
//       const ride = await res.json();
//       setCurrentRide(ride);

//       if (status === "completed") {
//         setView("payment");
//       }
//     } catch (err) {
//       alert("Failed to update ride status");
//     }
//   };

//   const processPayment = async (method) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/rides/${currentRide._id}/payment`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ paymentMethod: method }),
//         }
//       );
//       const data = await res.json();

//       if (data.success) {
//         alert("Payment successful!");
//         setCurrentRide(null);
//         setPickupLocation(null);
//         setDropoffLocation(null);
//         setDriverLocation(null);
//         setView("riderDashboard");
//       } else {
//         alert("Payment failed. Please try again.");
//       }
//     } catch (err) {
//       alert("Payment processing error");
//     }
//   };

//   const loadAvailableRides = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/rides/available", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const rides = await res.json();
//       setAvailableRides(rides);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (userRole === "driver" && view === "driverDashboard") {
//       loadAvailableRides();
//       const interval = setInterval(loadAvailableRides, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [userRole, view]);

//   if (!token) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex items-center justify-center p-4">
//         <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8">
//           <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-2">
//             <Car size={40} /> UberClone
//           </h1>

//           {view === "login" ? (
//             <form onSubmit={handleLogin} className="space-y-4">
//               <h2 className="text-2xl font-semibold mb-4">Login</h2>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
//                 value={loginData.email}
//                 onChange={(e) =>
//                   setLoginData({ ...loginData, email: e.target.value })
//                 }
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
//                 value={loginData.password}
//                 onChange={(e) =>
//                   setLoginData({ ...loginData, password: e.target.value })
//                 }
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold transition"
//               >
//                 Login
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setView("register")}
//                 className="w-full text-green-400 hover:underline"
//               >
//                 Don't have an account? Register
//               </button>
//             </form>
//           ) : (
//             <form onSubmit={handleRegister} className="space-y-4">
//               <h2 className="text-2xl font-semibold mb-4">Register</h2>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
//                 value={registerData.name}
//                 onChange={(e) =>
//                   setRegisterData({ ...registerData, name: e.target.value })
//                 }
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
//                 value={registerData.email}
//                 onChange={(e) =>
//                   setRegisterData({ ...registerData, email: e.target.value })
//                 }
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
//                 value={registerData.password}
//                 onChange={(e) =>
//                   setRegisterData({ ...registerData, password: e.target.value })
//                 }
//               />
//               <input
//                 type="tel"
//                 placeholder="Phone"
//                 className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
//                 value={registerData.phone}
//                 onChange={(e) =>
//                   setRegisterData({ ...registerData, phone: e.target.value })
//                 }
//               />
//               <select
//                 className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
//                 value={registerData.role}
//                 onChange={(e) =>
//                   setRegisterData({ ...registerData, role: e.target.value })
//                 }
//               >
//                 <option value="rider">Rider</option>
//                 <option value="driver">Driver</option>
//               </select>
//               <button
//                 type="submit"
//                 className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold transition"
//               >
//                 Register
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setView("login")}
//                 className="w-full text-green-400 hover:underline"
//               >
//                 Already have an account? Login
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex flex-col bg-gray-900 text-white">
//       <header className="bg-black p-4 flex justify-between items-center shadow-lg">
//         <div className="flex items-center gap-2">
//           <Car size={32} />
//           <span className="text-2xl font-bold">UberClone</span>
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="flex items-center gap-2">
//             <User size={20} />
//             {user?.name} ({userRole})
//           </span>
//           <button
//             onClick={() => {
//               localStorage.removeItem("token");
//               setToken(null);
//               setUser(null);
//             }}
//             className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       <div className="flex-1 flex">
//         <div className="flex-1 relative">
//           <MapContainer
//             center={currentLocation}
//             zoom={13}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <MapController center={currentLocation} />
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             />

//             {pickupLocation && (
//               <Marker position={pickupLocation}>
//                 <Popup>Pickup Location</Popup>
//               </Marker>
//             )}

//             {dropoffLocation && (
//               <Marker position={dropoffLocation}>
//                 <Popup>Dropoff Location</Popup>
//               </Marker>
//             )}

//             {driverLocation && (
//               <Marker position={driverLocation} icon={carIcon}>
//                 <Popup>Driver Location</Popup>
//               </Marker>
//             )}

//             {pickupLocation && dropoffLocation && (
//               <Polyline
//                 positions={[pickupLocation, dropoffLocation]}
//                 color="blue"
//               />
//             )}
//           </MapContainer>
//         </div>

//         <div className="w-96 bg-gray-800 p-6 overflow-y-auto">
//           {view === "riderDashboard" && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold mb-4">Request a Ride</h2>

//               <div className="bg-gray-700 p-4 rounded-lg">
//                 <label className="block mb-2 font-semibold flex items-center gap-2">
//                   <MapPin size={20} className="text-green-500" />
//                   Pickup Location
//                 </label>
//                 <button
//                   onClick={() => setPickupLocation(currentLocation)}
//                   className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-lg transition"
//                 >
//                   Use Current Location
//                 </button>
//               </div>

//               <div className="bg-gray-700 p-4 rounded-lg">
//                 <label className="block mb-2 font-semibold flex items-center gap-2">
//                   <MapPin size={20} className="text-red-500" />
//                   Dropoff Location
//                 </label>
//                 <button
//                   onClick={() => {
//                     const newLoc = [
//                       currentLocation[0] + (Math.random() - 0.5) * 0.05,
//                       currentLocation[1] + (Math.random() - 0.5) * 0.05,
//                     ];
//                     setDropoffLocation(newLoc);
//                   }}
//                   className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition"
//                 >
//                   Set Random Destination
//                 </button>
//               </div>

//               {pickupLocation && dropoffLocation && (
//                 <div className="bg-gray-700 p-4 rounded-lg">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="font-semibold">Estimated Fare:</span>
//                     <span className="text-2xl font-bold text-green-400">
//                       ₹{calculateFare(pickupLocation, dropoffLocation)}
//                     </span>
//                   </div>
//                   <button
//                     onClick={requestRide}
//                     className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold transition"
//                   >
//                     Request Ride
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {view === "waitingForDriver" && currentRide && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold">Finding Driver...</h2>
//               <div className="bg-gray-700 p-4 rounded-lg">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Clock className="animate-spin" size={20} />
//                   <span>Status: {currentRide.status}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <DollarSign size={20} />
//                   <span>Fare: ₹{currentRide.fare}</span>
//                 </div>
//                 {currentRide.driver && (
//                   <div className="mt-4 pt-4 border-t border-gray-600">
//                     <p className="font-semibold">Driver Found!</p>
//                     <p>Name: {currentRide.driver.name}</p>
//                     <p>Phone: {currentRide.driver.phone}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {view === "driverDashboard" && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold mb-4">Available Rides</h2>
//               {availableRides.length === 0 ? (
//                 <p className="text-gray-400">No rides available</p>
//               ) : (
//                 availableRides.map((ride) => (
//                   <div key={ride.rideId} className="bg-gray-700 p-4 rounded-lg">
//                     <div className="flex justify-between items-start mb-2">
//                       <div>
//                         <p className="font-semibold">New Ride Request</p>
//                         <p className="text-sm text-gray-400">
//                           Fare: ₹{ride.fare}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => acceptRide(ride.rideId)}
//                         className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
//                       >
//                         Accept
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}

//           {view === "activeRide" && currentRide && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold">Active Ride</h2>
//               <div className="bg-gray-700 p-4 rounded-lg space-y-3">
//                 <div>
//                   <p className="font-semibold">
//                     Rider: {currentRide.rider?.name}
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     {currentRide.rider?.phone}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Status: {currentRide.status}</p>
//                   <p className="text-sm text-gray-400">
//                     Fare: ₹{currentRide.fare}
//                   </p>
//                 </div>
//                 <div className="space-y-2 pt-3 border-t border-gray-600">
//                   {currentRide.status === "accepted" && (
//                     <button
//                       onClick={() => updateRideStatus("arrived")}
//                       className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition"
//                     >
//                       Mark as Arrived
//                     </button>
//                   )}
//                   {currentRide.status === "arrived" && (
//                     <button
//                       onClick={() => updateRideStatus("started")}
//                       className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-lg transition"
//                     >
//                       Start Trip
//                     </button>
//                   )}
//                   {currentRide.status === "started" && (
//                     <button
//                       onClick={() => updateRideStatus("completed")}
//                       className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded-lg transition"
//                     >
//                       Complete Trip
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {view === "payment" && currentRide && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold">Payment</h2>
//               <div className="bg-gray-700 p-4 rounded-lg">
//                 <div className="mb-4 pb-4 border-b border-gray-600">
//                   <p className="text-3xl font-bold text-green-400">
//                     ₹{currentRide.fare}
//                   </p>
//                   <p className="text-sm text-gray-400">Total Fare</p>
//                 </div>
//                 <div className="space-y-2">
//                   <button
//                     onClick={() => processPayment("cash")}
//                     className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg flex items-center justify-center gap-2 transition"
//                   >
//                     <DollarSign size={20} />
//                     Pay with Cash
//                   </button>
//                   <button
//                     onClick={() => processPayment("card")}
//                     className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg flex items-center justify-center gap-2 transition"
//                   >
//                     <CreditCard size={20} />
//                     Pay with Card (Mock)
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import {
  Car,
  User,
  MapPin,
  CreditCard,
  Clock,
  DollarSign,
  Navigation,
  MessageCircle,
  Send,
  X,
  Check,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import io from "socket.io-client";

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const carIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxOCIgZmlsbD0iIzAwMDAwMCIvPjxwYXRoIGQ9Ik0yMCAxMEwyNSAyMEgxNUwyMCAxMFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const dropoffIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "dropoff-marker",
});

const socket = io("http://localhost:5000");

const MapController = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 13);
  }, [center, map]);
  return null;
};

// Component to handle map clicks
const MapClickHandler = ({ onMapClick, isSelecting }) => {
  useMapEvents({
    click: (e) => {
      if (isSelecting) {
        onMapClick([e.latlng.lat, e.latlng.lng]);
      }
    },
  });
  return null;
};

export default function UberClone() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [view, setView] = useState("login");
  const [userRole, setUserRole] = useState("rider");

  // Location & Map
  const [currentLocation, setCurrentLocation] = useState([18.5204, 73.8567]);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [isSelectingDropoff, setIsSelectingDropoff] = useState(false);

  // Ride Management
  const [currentRide, setCurrentRide] = useState(null);
  const [availableRides, setAvailableRides] = useState([]);
  const [fare, setFare] = useState(0);

  // Chat
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Forms
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "rider",
  });

  useEffect(() => {
    if (token) {
      fetchUserProfile();
      getUserLocation();
    }
  }, [token]);

  useEffect(() => {
    socket.on("newRideRequest", (ride) => {
      if (userRole === "driver") {
        setAvailableRides((prev) => [...prev, ride]);
      }
    });

    socket.on("rideAccepted", (data) => {
      if (
        currentRide &&
        data.rideId.toString() === currentRide._id.toString()
      ) {
        setCurrentRide(data.ride);
        // Show notification
        alert(`Driver ${data.ride.driver.name} accepted your ride!`);
      }
    });

    socket.on("driverLocation", (data) => {
      if (currentRide && data.rideId === currentRide._id) {
        setDriverLocation(data.location);
      }
    });

    socket.on("rideStatusUpdate", (ride) => {
      if (currentRide && ride._id === currentRide._id) {
        setCurrentRide(ride);
      }
    });

    socket.on("newMessage", (data) => {
      if (currentRide && data.rideId === currentRide._id) {
        setMessages((prev) => [...prev, data.message]);
      }
    });

    return () => {
      socket.off("newRideRequest");
      socket.off("rideAccepted");
      socket.off("driverLocation");
      socket.off("rideStatusUpdate");
      socket.off("newMessage");
    };
  }, [currentRide, userRole]);

  // Auto scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Join ride room when ride starts
  useEffect(() => {
    if (currentRide) {
      socket.emit("joinRide", currentRide._id);
      loadMessages();
    }
  }, [currentRide]);

  // Simulate driver movement
  useEffect(() => {
    if (
      userRole === "driver" &&
      currentRide &&
      currentRide.status !== "completed"
    ) {
      const interval = setInterval(() => {
        setDriverLocation((prev) => {
          const newLoc = prev || currentLocation;
          const lat = newLoc[0] + (Math.random() - 0.5) * 0.001;
          const lng = newLoc[1] + (Math.random() - 0.5) * 0.001;

          socket.emit("driverLocationUpdate", {
            driverId: user?.id,
            location: [lat, lng],
            rideId: currentRide._id,
          });

          return [lat, lng];
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [userRole, currentRide, user]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const loc = [position.coords.latitude, position.coords.longitude];
        setCurrentLocation(loc);
        setPickupLocation(loc);
      });
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);
      setUserRole(data.role);
      setView(data.role === "driver" ? "driverDashboard" : "riderDashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        setUserRole(data.user.role);
        setView(
          data.user.role === "driver" ? "driverDashboard" : "riderDashboard"
        );
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        setUserRole(data.user.role);
        setView(
          data.user.role === "driver" ? "driverDashboard" : "riderDashboard"
        );
      }
    } catch (err) {
      alert("Registration failed");
    }
  };

  const calculateFare = (pickup, dropoff) => {
    const distance =
      Math.sqrt(
        Math.pow(pickup[0] - dropoff[0], 2) +
          Math.pow(pickup[1] - dropoff[1], 2)
      ) * 111;

    const baseFare = 50;
    const perKm = 15;
    return Math.round(baseFare + distance * perKm);
  };

  const handleMapClick = (latLng) => {
    if (isSelectingDropoff) {
      setDropoffLocation(latLng);
      setIsSelectingDropoff(false);
    }
  };

  const requestRide = async () => {
    if (!pickupLocation || !dropoffLocation) {
      alert("Please select pickup and dropoff locations");
      return;
    }

    const calculatedFare = calculateFare(pickupLocation, dropoffLocation);
    setFare(calculatedFare);

    try {
      const res = await fetch("http://localhost:5000/api/rides/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pickup: {
            lat: pickupLocation[0],
            lng: pickupLocation[1],
            address: "Pickup Location",
          },
          dropoff: {
            lat: dropoffLocation[0],
            lng: dropoffLocation[1],
            address: "Dropoff Location",
          },
          fare: calculatedFare,
          distance: Math.abs(pickupLocation[0] - dropoffLocation[0]) * 111,
        }),
      });
      const ride = await res.json();
      console.log(ride);
      setCurrentRide(ride);
      setView("waitingForDriver");
    } catch (err) {
      alert("Failed to request ride");
    }
  };

  const acceptRide = async (rideId) => {
    console.log(rideId);
    try {
      const res = await fetch(
        `http://localhost:5000/api/rides/${rideId}/accept`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const ride = await res.json();
      setCurrentRide(ride);
      setDriverLocation(currentLocation);
      setPickupLocation([ride.pickup.lat, ride.pickup.lng]);
      setDropoffLocation([ride.dropoff.lat, ride.dropoff.lng]);
      setView("activeRide");
      // Remove from available rides
      setAvailableRides((prev) => prev.filter((r) => r.rideId !== rideId));
    } catch (err) {
      alert("Failed to accept ride");
    }
  };

  const updateRideStatus = async (status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/rides/${currentRide._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      const ride = await res.json();
      setCurrentRide(ride);

      if (status === "completed") {
        setView("payment");
      }
    } catch (err) {
      alert("Failed to update ride status");
    }
  };

  const processPayment = async (method) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/rides/${currentRide._id}/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ paymentMethod: method }),
        }
      );
      const data = await res.json();

      if (data.success) {
        alert("Payment successful!");
        setCurrentRide(null);
        setPickupLocation(null);
        setDropoffLocation(null);
        setDriverLocation(null);
        setMessages([]);
        setChatOpen(false);
        setView("riderDashboard");
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (err) {
      alert("Payment processing error");
    }
  };

  const loadMessages = async () => {
    if (!currentRide) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/rides/${currentRide._id}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentRide) return;

    try {
      socket.emit("sendMessage", {
        rideId: currentRide._id,
        senderId: user.id || user._id,
        message: newMessage,
        senderRole: userRole,
      });

      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const loadAvailableRides = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/rides/available", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const rides = await res.json();
      setAvailableRides(rides);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userRole === "driver" && view === "driverDashboard") {
      loadAvailableRides();
      const interval = setInterval(loadAvailableRides, 5000);
      return () => clearInterval(interval);
    }
  }, [userRole, view]);

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Car size={40} /> UberClone
          </h1>

          {view === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Login</h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold transition"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setView("register")}
                className="w-full text-green-400 hover:underline"
              >
                Don't have an account? Register
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Register</h2>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
                value={registerData.phone}
                onChange={(e) =>
                  setRegisterData({ ...registerData, phone: e.target.value })
                }
              />
              <select
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
                value={registerData.role}
                onChange={(e) =>
                  setRegisterData({ ...registerData, role: e.target.value })
                }
              >
                <option value="rider">Rider</option>
                <option value="driver">Driver</option>
              </select>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold transition"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => setView("login")}
                className="w-full text-green-400 hover:underline"
              >
                Already have an account? Login
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <header className="bg-black p-4 flex justify-between items-center shadow-lg relative z-10">
        <div className="flex items-center gap-2">
          <Car size={32} />
          <span className="text-2xl font-bold">UberClone</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <User size={20} />
            {user?.name} ({userRole})
          </span>
          {currentRide && currentRide.status !== "requested" && (
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
            >
              <MessageCircle size={20} />
              Chat
            </button>
          )}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setToken(null);
              setUser(null);
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex-1 flex relative">
        <div className="flex-1 relative">
          <MapContainer
            center={currentLocation}
            zoom={13}
            style={{
              height: "100%",
              width: "100%",
              cursor: isSelectingDropoff ? "crosshair" : "grab",
            }}
          >
            <MapController center={currentLocation} />
            <MapClickHandler
              onMapClick={handleMapClick}
              isSelecting={isSelectingDropoff}
            />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {pickupLocation && (
              <Marker position={pickupLocation}>
                <Popup>Pickup Location</Popup>
              </Marker>
            )}

            {dropoffLocation && (
              <Marker position={dropoffLocation} icon={dropoffIcon}>
                <Popup>Dropoff Location</Popup>
              </Marker>
            )}

            {driverLocation && (
              <Marker position={driverLocation} icon={carIcon}>
                <Popup>Driver Location</Popup>
              </Marker>
            )}

            {pickupLocation && dropoffLocation && (
              <Polyline
                positions={[pickupLocation, dropoffLocation]}
                color="blue"
                weight={4}
                dashArray="10, 10"
              />
            )}
          </MapContainer>

          {isSelectingDropoff && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-10 flex items-center gap-2">
              <MapPin size={20} />
              <span>Click on map to select dropoff location</span>
              <button
                onClick={() => setIsSelectingDropoff(false)}
                className="ml-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Chat Panel */}
        {chatOpen && currentRide && (
          <div className="absolute right-96 top-0 bottom-0 w-80 bg-gray-800 shadow-2xl z-20 flex flex-col">
            <div className="bg-gray-900 p-4 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <MessageCircle size={20} />
                Chat with {userRole === "rider" ? "Driver" : "Rider"}
              </h3>
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <p className="text-gray-500 text-center text-sm">
                  No messages yet. Start the conversation!
                </p>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.senderRole === userRole
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.senderRole === userRole
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    <p className="text-xs font-semibold mb-1">
                      {msg.sender?.name || "User"}
                    </p>
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs text-gray-300 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-gray-900 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-96 bg-gray-800 p-6 overflow-y-auto">
          {view === "riderDashboard" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Request a Ride</h2>

              <div className="bg-gray-700 p-4 rounded-lg">
                <label className="block mb-2 font-semibold flex items-center gap-2">
                  <MapPin size={20} className="text-green-500" />
                  Pickup Location
                </label>
                <button
                  onClick={() => setPickupLocation(currentLocation)}
                  className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-lg transition"
                >
                  Use Current Location
                </button>
                {pickupLocation && (
                  <p className="text-sm text-green-400 mt-2 flex items-center gap-1">
                    <Check size={16} /> Pickup location set
                  </p>
                )}
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <label className="block mb-2 font-semibold flex items-center gap-2">
                  <MapPin size={20} className="text-red-500" />
                  Dropoff Location
                </label>
                <button
                  onClick={() => setIsSelectingDropoff(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition"
                >
                  {isSelectingDropoff
                    ? "Selecting... Click on map"
                    : "Click on Map to Select"}
                </button>
                {dropoffLocation && (
                  <p className="text-sm text-green-400 mt-2 flex items-center gap-1">
                    <Check size={16} /> Dropoff location set
                  </p>
                )}
              </div>

              {pickupLocation && dropoffLocation && (
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Estimated Fare:</span>
                    <span className="text-2xl font-bold text-green-400">
                      ₹{calculateFare(pickupLocation, dropoffLocation)}
                    </span>
                  </div>
                  <button
                    onClick={requestRide}
                    className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold transition"
                  >
                    Request Ride
                  </button>
                </div>
              )}
            </div>
          )}

          {view === "waitingForDriver" && currentRide && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Finding Driver...</h2>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="animate-spin" size={20} />
                  <span>Status: {currentRide.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={20} />
                  <span>Fare: ₹{currentRide.fare}</span>
                </div>
                {currentRide.driver && (
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Check size={20} className="text-green-400" />
                      <p className="font-semibold text-green-400">
                        Driver Found!
                      </p>
                    </div>
                    <p>Name: {currentRide.driver.name}</p>
                    <p>Phone: {currentRide.driver.phone}</p>
                    <button
                      onClick={() => setChatOpen(true)}
                      className="w-full mt-3 bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={20} />
                      Chat with Driver
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {view === "driverDashboard" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Available Rides</h2>
              {availableRides.length === 0 ? (
                <div className="bg-gray-700 p-8 rounded-lg text-center">
                  <Clock size={48} className="mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400">No rides available</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Waiting for new requests...
                  </p>
                </div>
              ) : (
                availableRides.map((ride) => (
                  <div key={ride.rideId} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">New Ride Request</p>
                        <p className="text-sm text-gray-400">
                          Rider: {ride.rider?.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          Phone: {ride.rider?.phone}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">
                          ₹{ride.fare}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => acceptRide(ride._id)}
                      className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
                    >
                      Accept
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {view === "activeRide" && currentRide && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Active Ride</h2>
              <div className="bg-gray-700 p-4 rounded-lg space-y-3">
                <div>
                  <p className="font-semibold">
                    Rider: {currentRide.rider?.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {currentRide.rider?.phone}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Status: {currentRide.status}</p>
                  <p className="text-sm text-gray-400">
                    Fare: ₹{currentRide.fare}
                  </p>
                </div>
                <button
                  onClick={() => setChatOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Chat with Rider
                </button>
                <div className="space-y-2 pt-3 border-t border-gray-600">
                  {currentRide.status === "accepted" && (
                    <button
                      onClick={() => updateRideStatus("arrived")}
                      className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition"
                    >
                      Mark as Arrived
                    </button>
                  )}
                  {currentRide.status === "arrived" && (
                    <button
                      onClick={() => updateRideStatus("started")}
                      className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-lg transition"
                    >
                      Start Trip
                    </button>
                  )}
                  {currentRide.status === "started" && (
                    <button
                      onClick={() => updateRideStatus("completed")}
                      className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded-lg transition"
                    >
                      Complete Trip
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {view === "payment" && currentRide && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Payment</h2>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="mb-4 pb-4 border-b border-gray-600">
                  <p className="text-3xl font-bold text-green-400">
                    ₹{currentRide.fare}
                  </p>
                  <p className="text-sm text-gray-400">Total Fare</p>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => processPayment("cash")}
                    className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <DollarSign size={20} />
                    Pay with Cash
                  </button>
                  <button
                    onClick={() => processPayment("card")}
                    className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <CreditCard size={20} />
                    Pay with Card (Mock)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
