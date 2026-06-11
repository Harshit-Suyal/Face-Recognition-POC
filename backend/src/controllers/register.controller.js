const registerService = require("../services/register.service");

/**
 * Controller layer:
 * Receives the request from the route,
 * invokes the business logic,
 * and returns the response.
 */
exports.registerFace = async (req, res) => {
    try {

        const result = await registerService.registerFace(req);

        return res.status(200).json(result);

    } catch (error) {

        console.error("Registration Error:", error);

        return res.status(
            error.statusCode || 500
        ).json({
            success: false,
            message: error.message
        });
    }
};