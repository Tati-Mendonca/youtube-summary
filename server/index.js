import cors from "cors"
import express from "express"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"
import { convert } from "./convert.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/summary/:id", async (request, response) => {
    await download(request.params.id)
    const audioConverted = await convert()
    const result = await transcribe(audioConverted)

    return response.json({ result })
})

app.post("/summary", async (request, response) => {
    const result = await summarize(request.body.text)
    return response.json({ result })
})

app.listen(8080, () => console.log("Server is running on port 8080"))
