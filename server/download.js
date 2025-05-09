import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
    new Promise((resolve, reject) => {
        if (!videoId) {
            throw new Error("Vídeo inválido, tente novamente!");
        }

        const videoURL = `https://www.youtube.com/watch?v=${videoId}`
        console.log("Realizando o download do vídeo: ", videoId);

        ytdl(videoURL, {
            quality: "lowestaudio",
            filter: "audioonly"
        })
            .on("end", () => {
                console.log("Download do vídeo finalizado.");
                resolve()

            }).on("error", (error) => {
                console.log("Não foi possível fazer o download do vídeo" + error);

                if (error.statusCode === 403) {
                    reject(new Error("Acesso proibido ao recurso. Verifique as restrições de IP, validade do URL ou políticas do YouTube."));
                } else {
                    reject(error)
                }

            }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
    }) 