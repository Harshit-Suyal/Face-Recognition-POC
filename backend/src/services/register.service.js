const axios = require("axios");
const FormData = require("form-data");

const Person = require("../models/person.model");

/**
 * Handles the complete face registration workflow:
 *
 * 1. Validate request
 * 2. Send image to FastAPI
 * 3. Generate embedding
 * 4. Save data in MongoDB
 * 5. Return success response
 */
exports.registerFace = async (req) => {

    // Ensure an image was uploaded
    if (!req.file) {
        throw {
            statusCode: 400,
            message: "No image uploaded"
        };
    }

    // Ensure name was provided
    if (!req.body.name) {
        throw {
            statusCode: 400,
            message: "Name is required"
        };
    }

    // Prepare multipart request for FastAPI
    const form = new FormData();

    form.append(
        "file",
        req.file.buffer,
        "face.jpg"
    );

    // Send image to AI service
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

    const embedding = response.data.embedding;

    if (!embedding) {
        throw {
            statusCode: 400,
            message: "Failed to generate embedding"
        };
    }

    // Store user and embedding in MongoDB
    await Person.create({
        name: req.body.name,
        embedding
    });

    return {
        success: true,
        message: "Face Registered Successfully"
    };
};