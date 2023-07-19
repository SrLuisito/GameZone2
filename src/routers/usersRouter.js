const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const userController = require("../controllers/usersController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}_img_${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Profile
router.get("/", userController.index);

// Creación de usuario
router.get("/create", userController.create);
router.post("/create", upload.single("img"), userController.createPost);

// Login
router.get("/login", userController.login);
router.post("/login", userController.loginProcess);

// Logout
router.get("/logout", userController.logout);

module.exports = router;
