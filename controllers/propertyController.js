import Property from "../models/Property.js";

// CREATE PROPERTY
export const createProperty = async (req, res) => {
  try {
    const { title, price, location, rooms, images } = req.body;

    const property = new Property({
      title,
      price,
      location,
      rooms,

      //if no image → empty array
      images: images || [],

      agentId: req.user.id
    });

    await property.save();

    res.json(property);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PROPERTY
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ message: "Not found" });

    // Only the agent who created the property can update it
    if (property.agentId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE PROPERTY
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ message: "Not found" });

    if (property.agentId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await property.deleteOne();

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEARCH FILTER
export const searchProperties = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, rooms } = req.query;

    let query = {};

    if (location) query.location = location;
    if (rooms) query.rooms = rooms;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    const properties = await Property.find(query);

    res.json(properties);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE PROPERTY

export const getSingleProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Add property (admin only)

export const addProperty = async (req, res) => {
  try {

    const { title, price, location, rooms, images } = req.body;

    const property = new Property({
      title,
      price,
      location,
      rooms,
      images: images || []
    });

    await property.save();

    res.status(201).json({
      message: "Property Added Successfully",
      property
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};