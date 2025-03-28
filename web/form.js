import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    content.classList.add("placeholder");
    const videoURL = input.value;
    let videoID;

    if (videoURL.includes("shorts")) {
        const [_, params] = videoURL.split("/shorts/")
        const [id] = params.split("?si")
        videoID = id;

    } else if (videoURL.includes("youtube.com")) {
        const [_, id] = videoURL.split("/watch?v=");
        videoID = id;

    } else if (videoURL.includes("youtu.be")) {
        const [__, params] = videoURL.split(".be/");
        const [id] = params.split("?si");
        videoID = id;

    } else {
        content.classList.remove("placeholder")
        return content.textContent = "Esse não é um vídeo válido!"
    }

    content.textContent = "Carregando o resumo..."
    const transcription = await server.get("/summary/" + videoID)
    setTimeout(async () => {
        content.textContent = "Aguarde seu resumo está quase pronto..."
    }, 10000);

    try {
        const summary = await server.post("/summary", {
            text: transcription.data.result,
        })
        content.textContent = summary.data.result;

    } catch (error) {
        const msgError = error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : "Ocorreu um erro ao processar o resumo. Tente novamente mais tarde.";
        content.textContent = msgError;
    }
})