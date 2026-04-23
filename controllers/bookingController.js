import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const booking = await Booking.create({
    user: req.user.id,
    property: req.params.id,
  });

  res.json(booking);
};