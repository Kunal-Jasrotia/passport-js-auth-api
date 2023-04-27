const express = require('express')
const { isLogedIn } = require('../middleware/auhtentication')
const router = express.Router()
const userAction = require('../middleware/userAction')

router.post('/home', isLogedIn, async (req, res) => {
    res.send('home')
})

router.get('/register', async (req, res) => {
    res.send('register')
})

router.post('/registerUser', async (req, res) => {
    try {
        let insertUser = await userAction.insertUser(req.body)
        console.log(insertUser)
        res.send(insertUser)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router