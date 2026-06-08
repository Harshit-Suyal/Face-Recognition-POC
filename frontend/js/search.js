const video = document.getElementById("video");

navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    });

document.getElementById("search")
    .addEventListener("click", async () => {

        const canvas = document.createElement("canvas");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        canvas
            .getContext("2d")
            .drawImage(video, 0, 0);

        canvas.toBlob(async (blob) => {

            try {

                const form = new FormData();
                form.append("image", blob);

                const response = await fetch(
                    "http://localhost:5000/api/search",
                    {
                        method: "POST",
                        body: form
                    }
                );

                const result = await response.json();

                // Handle errors first
                if (!result.success) {
                    document.getElementById("result").innerHTML =
                        result.message;
                    return;
                }

                document.getElementById("result").innerHTML =
                    `Name: ${result.matchedUser}<br>
                     Confidence: ${result.confidence}%<br>
                     Status: ${result.status}`;

            } catch (error) {

                document.getElementById("result").innerHTML =
                    "Search failed. Please try again.";

                console.error(error);
            }

        }, "image/jpeg");

    });