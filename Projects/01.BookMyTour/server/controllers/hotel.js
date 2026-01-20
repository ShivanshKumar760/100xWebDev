import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    console.log("Saved Hotel is :",savedHotel);
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  console.log("The query object from client request is :",req.query);
  const { min, max, limit,...others} = req.query;
  const parsedLimit=parseInt(limit);
  const othersDetail={...others};
  delete othersDetail.limit;
  console.log("Deleting the limit key from the query object for finding doc:",othersDetail);
  try {
    const hotels = await Hotel.find({
      ...othersDetail,
      cheapestPrice: { $gte: min || 500, $lte: max || 25000 },})
      .limit(parsedLimit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};



export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    // Promise.all() is a method in JavaScript that is used to 
    // handle multiple promises concurrently. It takes an array (or any iterable) 
    // of promises as input and returns a single promise that resolves when all of the 
    // input promises have resolved or when any of them rejects.
    const list = await Promise.all(
      cities.map((city) => {
        let returnVal;
        console.log(city);
        // console.log("Total City document are:",Hotel.countDocuments({ city: city }).then((num)=>{return num}));//this wont work cause console.log is sync but Hotel.countDocuments is async so console.log wont wait for it to finish
        Hotel.countDocuments({city:city}).then((num)=>{//Delhi
          console.log(`Total document for ${city} is : ${num} `);//log delhi part
        });
        console.log("Execute");
        return Hotel.countDocuments({ city: city });
        
        // Order of results: The order of the results in the array returned by 
        // Promise.all() corresponds to the order of the input promises, not the 
        // order in which they resolve
      })
    );

    // Behavior:
    // If all promises resolve: Promise.all() resolves with an array of the 
    // resolved values, in the same order as the promises were passed.

    // sending Response to the client 
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};


export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};