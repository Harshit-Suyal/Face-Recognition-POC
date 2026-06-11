const router = require("express").Router();

/**
 * Render landing page.
 */
router.get("/", (req, res) => {
    res.render("home");
});

/**
 * Render face registration page.
 */
router.get("/register", (req, res) => {
    res.render("register");
});

/**
 * Render face search page.
 */
router.get("/search", (req, res) => {
    res.render("search");
});

module.exports = router;