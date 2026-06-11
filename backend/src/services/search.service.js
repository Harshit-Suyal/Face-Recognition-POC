const axios = require("axios");
const FormData = require("form-data");

const Person =
    require("../models/person.model");

/**
 * Complete face search workflow.
 *
 * 1. Receive uploaded image
 * 2. Generate embedding through FastAPI
 * 3. Fetch registered users
 * 4. Compare embeddings
 * 5. Return best match
 */
exports.searchFace = async (req) => {

    if (!req.file) {
        throw {
            statusCode: 400,
            message: "No image uploaded"
        };
    }

    // Prepare image for FastAPI
    const form = new FormData();

    form.append(
        "file",
        req.file.buffer,
        "face.jpg"
    );

    // Generate embedding for uploaded face
    const response = await axios.post(
        `${process.env.AI_SERVICE_URL}/embedding`,
        form,
        {
            headers: form.getHeaders()
        }
    );

    if (!response.data.success) {
        throw {
            statusCode: 400,
            message: response.data.message
        };
    }

    const queryEmbedding =
        response.data.embedding;

    // Fetch all registered users
    const users =
        await Person.find();

    if (users.length === 0) {
        throw {
            statusCode: 404,
            message: "No registered users found"
        };
    }

    let bestMatch = null;
    let bestScore = 0;

    // Compare uploaded face against
    // every stored embedding
    for (const user of users) {

        if (!user.embedding) {
            continue;
        }

        const compare =
            await axios.post(
                `${process.env.AI_SERVICE_URL}/compare`,
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

    return {
        success: true,
        matchedUser: bestMatch,
        confidence:
            (bestScore * 100).toFixed(2),
        status
    };
};