// Reference to the video element that displays
// the live webcam feed
const video = document.getElementById("video");

/**
 * Request access to the user's webcam
 * and display the live stream.
 */
navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((error) => {
        console.error("Unable to access webcam:", error);

        document.getElementById("result").innerHTML =
            "Camera access is required.";
    });

/**
 * Capture an image from the webcam
 * and search for the closest matching face.
 */
document.getElementById("search").addEventListener("click", async () => {
    // Create a temporary canvas
    // to capture the current frame
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0);

    canvas.toBlob(
        async (blob) => {
            try {
                const form = new FormData();

                form.append("image", blob);

                // Send the captured image
                // to the face recognition API
                const response = await fetch("/api/search", {
                    method: "POST",
                    body: form
                });

                const result = await response.json();

                // Handle API errors first
                if (!result.success) {
                    document.getElementById("result").innerHTML =
                        result.message;

                    return;
                }

                // Display recognition result
                document.getElementById("result").innerHTML = `
                    Name: ${result.matchedUser}<br>
                    Confidence: ${result.confidence}%<br>
                    Status: ${result.status}
                `;
            } catch (error) {
                console.error("Search Error:", error);

                document.getElementById("result").innerHTML =
                    "Search failed. Please try again.";
            }
        },
        "image/jpeg"
    );
});