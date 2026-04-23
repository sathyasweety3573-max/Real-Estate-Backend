export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not logged in" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();

  };
};

export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only access" });
  }
  next();
};