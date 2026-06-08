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

        const queryEmbedding =
            response.data.embedding;

        const users =
            await Person.find();

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No registered users found"
            });
        }

        let bestMatch = null;
        let bestScore = 0;

        for (const user of users) {

            if (!user.embedding) {
                continue;
            }

            const compare =
                await axios.post(
                    "http://localhost:8000/compare",
                    {
                        embedding1: queryEmbedding,
                        embedding2: user.embedding
                    }
                );

            if (
                compare.data.success !== false &&
                compare.data.score > bestScore
            ) {
                bestScore =
                    compare.data.score;

                bestMatch =
                    user.name;
            }
        }

        let status = "No Match";

        if (bestScore >= 0.90)
            status = "Exact Match";
        else if (bestScore >= 0.80)
            status = "Strong Match";
        else if (bestScore >= 0.70)
            status = "Possible Match";

        return res.json({
            success: true,
            matchedUser: bestMatch,
            confidence:
                (bestScore * 100).toFixed(2),
            status
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