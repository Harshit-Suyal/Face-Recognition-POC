const router = require("express").Router();
const multer = require("multer");

const registerController = require("../controllers/register.controller");

// Store uploaded image temporarily in memory
const upload = multer();

/**
 * Register a new face.
 *
 * Expects:
 * - image file
 * - person's name
 */
router.post(
    "/",
    upload.single("image"),
    registerController.registerFace
);

module.exports = router;