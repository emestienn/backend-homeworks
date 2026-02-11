import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json()) 

const users = ['Ali', 'Aziz', 'Abbos']

app.get('/', (req, res) => {
    res.send('Hello from server')
})

app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.post('/users', (req, res) => {
    try {
        if(!req.body?.name) {
            return res.status(400).send('Ism kiritilishi shart!')
        } else if(req.body.name.length < 3) {
            return res.status(400).send('Min 3 chars')
        } else if(users.includes(req.body.name)) {
            return res.status(400).send('Already exists')
        }
        users.push(req.body.name)
        res.status(201).json({users})
    } catch(error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

app.listen(4200, () => {
    console.log('Server is running on http://localhost:4200')
})