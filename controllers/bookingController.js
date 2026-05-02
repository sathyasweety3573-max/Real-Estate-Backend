import Booking from "../models/Booking.js";

// ================= CREATE BOOKING =================

export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const propertyId = req.params.id;

    // ✅ CHECK ALREADY BOOKED

    const existingBooking = await Booking.findOne({
      user: userId,
      property: propertyId,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "You already booked this property ❌",
      });
    }

    // ✅ CREATE BOOKING

    const booking = await Booking.create({
      user: userId,
      property: propertyId,
      status: "pending", // important for admin flow
    });

    res.status(201).json({
      message: "Booking request sent successfully 🏡",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: "Booking failed ❌",
      error: error.message,
    });
  }
};

// ================= GET USER BOOKINGS =================

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    }).populate("property");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= ADMIN: GET ALL BOOKINGS =================

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("property", "title price location");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= ADMIN: UPDATE STATUS =================

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "Booking status updated ✅",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};