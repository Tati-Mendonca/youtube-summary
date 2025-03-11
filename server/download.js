import ytdl from "ytdl-core"
import fs from "fs"

export function download(videoId) {
    if (!videoId) {   //melhorar esta verificação
        throw new Error("Vídeo inválido, tente novamente!");
    }

    const videoURL = `https://www.youtube.com/watch?v=${videoId}`
    console.log("Realizando o download do vídeo: ", videoId);

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
        .on("end", () => {
            console.log("Download do vídeo finalizado.");

        }).on("error", (error) => {
            console.log("Não foi possível fazer o download do vídeo" + error);
        }).pipe(fs.createWriteStream("./tmp/audio.mp4"))

}