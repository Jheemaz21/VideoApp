const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("video-web"));

// Konfigurasi penyimpanan video dan thumbnail
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/assets/videos");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

app.post("/upload", upload.fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 }
]), (req, res) => {
  const { title, kategori } = req.body;
  const video = req.files.video?.[0];
  const thumbnail = req.files.thumbnail?.[0];

  if (!title || !kategori || !video || !thumbnail) {
    return res.json({ success: false, error: "Data tidak lengkap" });
  }

  // Di sini kamu bisa menyimpan data ke file .json / database
  // Contoh: Menyimpan data ke videos.json untuk dirender ulang

  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
