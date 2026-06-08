const video = document.getElementById("video");

navigator.mediaDevices.getUserMedia({video:true}).then(stream=>{video.srcObject=stream;});

document.getElementById("capture").addEventListener("click",async ()=>{
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video,0,0);
    canvas.toBlob(async(blob)=>{
        const form = new FormData();
        form.append("name",document.getElementById("name").value);
        form.append("image",blob);
        const response = await fetch("http://localhost:5000/api/register",{method:"POST", body:form });
        const result = await response.json();
        alert(result.message); });
});