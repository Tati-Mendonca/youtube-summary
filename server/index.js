import cors from "cors"
import express from "express"
import { download } from "./download.js"

const app = express()
app.set(cors())

app.get("/summary/:id", (request, response) => {
    download(request.params.id)
    response.send("Id do vídeo: " + request.params.id)
})

app.listen(8080, () => console.log("Server is running on port 8080"))
