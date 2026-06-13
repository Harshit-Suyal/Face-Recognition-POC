// Get reference to the video element
const video = document.getElementById("video");

/**
 * Request access to the user's webcam
 * and display the live video feed.
 */
navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((error) => {
        console.error("Unable to access webcam:", error);

        alert("Camera access is required for face registration.");
    });

/**
 * Capture a frame from the webcam,
 * convert it into an image,
 * and send it to the backend for registration.
 */
document.getElementById("capture").addEventListener("click", async () => {
    try {
        const name = document.getElementById("name").value.trim();

        // Prevent empty names
        if (!name) {
            alert("Please enter a name.");
            return;
        }

        // Create a temporary canvas
        // to capture the current video frame
        const canvas = document.createElement("canvas");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");

        context.drawImage(video, 0, 0);

        canvas.toBlob(
            async (blob) => {
                const form = new FormData();

                form.append("name", name);
                form.append("image", blob);

                // Send image and name
                // to the registration API
                const response = await fetch("/api/register", {
                    method: "POST",
                    body: form
                });

                const result = await response.json();

                alert(result.message);
            },
            "image/jpeg"
        );
    } catch (error) {
        console.error("Registration Error:", error);

        alert("Something went wrong while registering the face.");
    }
});