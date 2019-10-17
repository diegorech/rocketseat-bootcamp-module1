const express = require('express')

const app = express()

app.use(express.json())

const users = ['Diego', 'Claudio', 'Gab']


//Middlewares
function checkUserExists(req, res, next) {
    console.log(req.body.name)
    if(!req.body.name) {
        return req.status(400).json({ error: 'User is required'})
    }
    return next()
}

function checkUserInArray(req, res, next) {
    const user = user[req.params.index]
    
    if(!user) {
        return res.status(400).json({ error: 'User does not exists'})
    }

    req.user = user
    return next()
}
app.use((req, res, next) => {
    console.log(`Método ${req.method} URL ${req.url}`)

    return next()
})

app.get('/users', (req, res) => {
    return res.json(users) 
})

app.get('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params
    const user = users[index]
    return res.json({
        message: `Buscando usúario ${user}`
    })
})

app.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body

    users.push(name)

    return res.json(users)
})

app.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
    const { name } = req.body
    const { index } = req.params

    users[index] = name

    return res.json(users)
})


app.delete('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params

    users.splice(index, 1)

    return res.send('Usuário deletado')
})


app.listen(3000, () => console.log('Server ON!!'))