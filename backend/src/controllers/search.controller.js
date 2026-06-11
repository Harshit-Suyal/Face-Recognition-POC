const searchService =
    require("../services/search.service");

/**
 * Controller responsible for handling
 * face search requests.
 *
 * It receives the request from the route,
 * delegates the business logic to the service,
 * and returns the final response.
 */
exports.searchFace = async (req, res) => {
    try {

        const result =
            await searchService.searchFace(req);

        return res.json(result);

    } catch (error) {

        console.error(
            "Face Search Error:",
            error
        );

        return res.status(
            error.statusCode || 500
        ).json({
            success: false,
            message: error.message
        });
    }
};