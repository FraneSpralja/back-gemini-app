const PORT = 8000
const express = require('express')
const cors = require('cors');
const exp = require('constants');
const app = express();
app.use(cors())
app.use(express.json())
require('dotenv').config()

const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY)

app.post('/gemini', async (req, res) => {
    try {
        console.log(req.body.history)
        console.log(req.body.message)
    
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
        const chat = model.startChat({
            history: req.body.history
        })
    
        const msg = req.body.message
    
        const result = await chat.sendMessage(msg)
        const response = await result.response
        const text = response.text()
    
        res.send(text)   
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => console.log(`Listening in port ${PORT}`) )