
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {

  console.log("HEADER:", req.headers.authorization);
  console.log("SECRET:", process.env.JWT_SECRET);

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json("No token");
  }

    try {

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();
      } catch (err) {

    console.log("JWT ERROR:", err.message);

    res.status(401).json("Invalid token");
  }
};