const router = require("express").Router();
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const Person = require("../models/Person");

const upload = multer();

router.post("/", upload.single("image"), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded"
            });
        }

        if (!req.body.name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        const form = new FormData();

        form.append(
            "file",
            req.file.buffer,
            "face.jpg"
        );

        const response = await axios.post(
            "http://localhost:8000/embedding",
            form,
            {
                headers: form.getHeaders()
            }
        );

        if (!response.data.success) {
            return res.status(400).json({
                success: false,
                message: response.data.message
            });
        }

        const embedding = response.data.embedding;

        if (!embedding) {
            return res.status(400).json({
                success: false,
                message: "Failed to generate embedding"
            });
        }

        await Person.create({
            name: req.body.name,
            embedding
        });

        return res.json({
            success: true,
            message: "Face Registered"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;