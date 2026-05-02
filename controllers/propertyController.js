import Property from "../models/Property.js";

// ================= ADD PROPERTY ADMIN ONLY =================

export const addProperty = async (req, res) => {
  try {
    const {
      title,
      price,
      location,
      description,
      type,
      bedrooms,
      bathrooms,
      area,
      images,
    } = req.body;

    if (
      !title ||
      !price ||
      !location ||
      !description ||
      !type ||
      !bedrooms ||
      !bathrooms ||
      !area
    ) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const property = new Property({
      title,
      price,
      location,
      description,
      type,
      bedrooms,
      bathrooms,
      area,
      images: images || [],
      createdBy: req.user.id,
    });

    await property.save();

    res.status(201).json({
      message: "Property added successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: "Property upload failed",
      error: error.message,
    });
  }
};

// ================= GET ALL PROPERTIES =================

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({
      createdAt: -1,
    });

    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch properties",
      error: err.message,
    });
  }
};

// ================= GET SINGLE PROPERTY =================

export const getSingleProperty = async (req, res) => {
  try {
    const property = await Property.findById(
      req.params.id
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch property",
      error: error.message,
    });
  }
};

// ================= UPDATE PROPERTY ADMIN ONLY =================

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(
      req.params.id
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Property updated successfully",
      property: updated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Property update failed",
      error: err.message,
    });
  }
};

// ================= DELETE PROPERTY ADMIN ONLY =================

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(
      req.params.id
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    await property.deleteOne();

    res.status(200).json({
      message: "Property deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Property delete failed",
      error: err.message,
    });
  }
};

// ================= SEARCH PROPERTIES =================

export const searchProperties = async (req, res) => {
  try {
    const {
      location,
      minPrice,
      maxPrice,
      type,
      bedrooms,
    } = req.query;

    const query = {};

    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (type) {
      query.type = {
        $regex: type,
        $options: "i",
      };
    }

    if (bedrooms) {
      query.bedrooms = bedrooms;
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    const properties = await Property.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({
      message: "Search failed",
      error: err.message,
    });
  }
};