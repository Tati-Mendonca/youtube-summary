const form = document.getElementById("form")
const input = document.getElementById("url")
const content = document.getElementById("content")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const videoURL = input.value

    if (videoURL.includes("youtube.com")) {
        const [_, videoID] = videoURL.split("/watch?v=")
        console.log(videoID);
        content.textContent = "Baixando o texto do áudio..."

    } else if (videoURL.includes("youtu.be")) {
        const [__, params] = videoURL.split(".be/")
        const [videoID] = params.split("?si")
        console.log(videoID);
        content.textContent = "Baixando o texto do áudio..."

    } else return content.textContent = "Esse não é um vídeo válido!"
})