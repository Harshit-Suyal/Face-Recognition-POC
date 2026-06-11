const router = require("express").Router();
const multer = require("multer");

const searchController =
    require("../controllers/search.controller");

const upload = multer();

/**
 * Search for the closest matching face.
 *
 * Expects:
 * - image file
 */
router.post(
    "/",
    upload.single("image"),
    searchController.searchFace
);

module.exports = router;