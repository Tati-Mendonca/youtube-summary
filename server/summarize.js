export async function summarize(text) {
    try {
        console.log("Realizando o resumo...");
        const summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-12-3');
        const output = await summarizer(text);

        if (!output || !output[0] || !output[0].summary_text || output[0].summary_text.trim() === "" || output[0].summary_text.includes("undefined")) {
            throw new Error("Resposta inválida do modelo. Possível erro 403 ou problema no processamento.");
        }

        return output[0].summary_text;

    } catch (error) {
        throw new Error("Desculpe, não conseguimos acessar o vídeo. Verifique se ele não esta indisponível, privado ou restrito no YouTube.");
    }
}