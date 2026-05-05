import Booking from "../models/Booking.js";
import Property from "../models/Property.js";

// ================= CREATE BOOKING =================

export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const propertyId = req.params.id;

    const {
      name,
      email,
      phone,
      message,
      bookingDate,
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (!property.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "This property is not available",
      });
    }

    if (req.user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot book properties",
      });
    }

    const existingBooking = await Booking.findOne({
      user: userId,
      property: propertyId,
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "You already booked this property",
      });
    }

    const booking = await Booking.create({
      user: userId,
      property: propertyId,
      name,
      email,
      phone,
      message: message || "",
      bookingDate: bookingDate || Date.now(),
      status: "pending",
      paymentStatus: "pending",
      approvedByAdmin: false,
    });

    res.status(201).json({
      success: true,
      message: "Booking request sent successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Booking failed",
      error: error.message,
    });
  }
};

// ================= GET LOGGED USER BOOKINGS =================

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate(
        "property",
        "title price location images type purpose"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch your bookings",
      error: error.message,
    });
  }
};

// ================= ADMIN: GET ALL BOOKINGS =================

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email phone")
      .populate(
        "property",
        "title price location images type purpose"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// ================= ADMIN: UPDATE BOOKING STATUS =================

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = status;
    booking.approvedByAdmin = status === "confirmed";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Booking status update failed",
      error: error.message,
    });
  }
};

// ================= ADMIN: DELETE BOOKING =================

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Booking delete failed",
      error: error.message,
    });
  }
};