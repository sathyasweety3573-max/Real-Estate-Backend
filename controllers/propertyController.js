import Property from "../models/Property.js";

// ================= ADD PROPERTY ADMIN ONLY =================

export const addProperty = async (req, res) => {
  try {
    const {
      title,
      price,
      location,
      city,
      state,
      country,
      pincode,
      description,
      type,
      purpose,
      bedrooms,
      bathrooms,
      area,
      amenities,
      images,
      isFeatured,
      isAvailable,
    } = req.body;

    if (
      !title ||
      !price ||
      !location ||
      !description ||
      !type ||
      !purpose ||
      !bedrooms ||
      !bathrooms ||
      !area
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const property = await Property.create({
      title,
      price: Number(price),
      location,
      city: city || "",
      state: state || "",
      country: country || "India",
      pincode: pincode || "",
      description,
      type,
      purpose,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      area: Number(area),
      amenities: amenities || [],
      images: images || [],
      isFeatured: isFeatured || false,
      isAvailable: isAvailable === false ? false : true,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Property added successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Property upload failed",
      error: error.message,
    });
  }
};

// ================= GET ALL PROPERTIES =================

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      isAvailable: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
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
    ).populate("createdBy", "name email role");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    property.views += 1;
    await property.save();

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch property",
      error: error.message,
    });
  }
};

// ================= UPDATE PROPERTY ADMIN ONLY =================

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
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
      success: true,
      message: "Property updated successfully",
      property: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Property update failed",
      error: err.message,
    });
  }
};

// ================= DELETE PROPERTY ADMIN ONLY =================

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Property delete failed",
      error: err.message,
    });
  }
};

// ================= SEARCH + FILTER PROPERTIES =================

export const searchProperties = async (req, res) => {
  try {
    const {
      keyword,
      location,
      city,
      minPrice,
      maxPrice,
      type,
      purpose,
      bedrooms,
      bathrooms,
      minArea,
      maxArea,
      amenities,
      sort,
    } = req.query;

    const query = { isAvailable: true };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        { city: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (city) {
      query.city = { $regex: city, $options: "i" };
    }

    if (type) {
      query.type = type;
    }

    if (purpose) {
      query.purpose = purpose;
    }

    if (bedrooms) {
      query.bedrooms = { $gte: Number(bedrooms) };
    }

    if (bathrooms) {
      query.bathrooms = { $gte: Number(bathrooms) };
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

    if (minArea || maxArea) {
      query.area = {};

      if (minArea) {
        query.area.$gte = Number(minArea);
      }

      if (maxArea) {
        query.area.$lte = Number(maxArea);
      }
    }

    if (amenities) {
      query.amenities = {
        $all: amenities.split(",").map((item) => item.trim()),
      };
    }

    let sortOption = { createdAt: -1 };

    if (sort === "priceLow") sortOption = { price: 1 };
    if (sort === "priceHigh") sortOption = { price: -1 };
    if (sort === "popular") sortOption = { views: -1 };

    const properties = await Property.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Search failed",
      error: err.message,
    });
  }
};

// ================= FEATURED PROPERTIES =================

export const getFeaturedProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      isFeatured: true,
      isAvailable: true,
    })
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured properties",
      error: error.message,
    });
  }
};

// ================= TRENDING PROPERTIES =================

export const getTrendingProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      isAvailable: true,
    })
      .sort({ views: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch trending properties",
      error: error.message,
    });
  }
};