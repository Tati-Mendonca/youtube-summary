import { pipeline } from "@xenova/transformers"

export async function transcribe(audio) {
    try {
        console.log("Realizando a transcrição...")

        const transcriber = await pipeline(
            'automatic-speech-recognition', 'Xenova/whisper-tiny');

        const transcription = await transcriber(audio,
            {
                chunk_length_s: 30,
                stride_length_s: 5,
                language: 'portuguese',
                task: "transcribe",
            });
        console.log("Transcrição finalizada")

        return transcription?.text.replace("[Música]", "")
    } catch (error) {
        throw new Error(error)
    }
}