import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  res.json({ url: result.secure_url });
});

export default router;