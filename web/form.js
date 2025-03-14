import { server } from "./server.js"
const form = document.getElementById("form")
const input = document.getElementById("url")
const content = document.getElementById("content")

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const videoURL = input.value

    if (videoURL.includes("youtube.com")) {
        const [_, videoID] = videoURL.split("/watch?v=")

        content.textContent = "Carregando o resumo..."
        const transcription = await server.get("/summary/" + videoID)

        const summary = await server.post("/summary", {
            text: transcription.data.result,
        })
        content.textContent = summary.data.result


    } else if (videoURL.includes("youtu.be")) {
        const [__, params] = videoURL.split(".be/")
        const [videoID] = params.split("?si")
        console.log(videoID);
        content.textContent = "Carregando o resumo..."
        const transcription = await server.get("/summary/" + videoID)


        const summary = await server.post("/summary", {
            text: transcription.data.result,
        })
        content.textContent = summary.data.result

    } else return content.textContent = "Esse não é um vídeo válido!"
})