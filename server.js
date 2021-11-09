// console.log("Hello world");

// require express
const express = require("express");

// instance of express
const app = express();

// middleware body-parser
app.use(express.json());

// simple route
app.get('/', (req, res) => {
    res.send("Hello World")
})

// CRUD
let users = [
    {
        name: "nouceiba",
        email: "nouceiba@gmail.com",
        id: 1
    },
    {
        name: "rania",
        email: "rania@gmail.com",
        id: 2
    },
    {
        name: "seif",
        email: "seif@gmail.com",
        id: 3
    }
]

/**
 * get all users
 * method : GET
 * path : /users
 */
app.get('/users', (req, res) => {
    res.status(200).send({msg: "List of users", users})
})

/**
 * get user
 * method : GET
 * path : /users/user/:userId
 */
app.get('/users/user/:userId', (req, res) => {
    const userId = Number(req.params.userId)
    const userToGet = users.find( user => user.id === userId)
    if (userToGet) {
        res.status(200).send({msg: "I find the user", userToGet})
    } else {
        res.status(400).send({msg: "Can not find the user"})
    }
})

/**
 * add user
 * method : POST
 * path : /users/add_user
 */
app.post('/users/add_user', (req, res) => {
    const newUser = req.body
    users = [...users, newUser]
    res.status(200).send({msg: "User added", users})
})

/**
 * delete user
 * method : DELETE
 * path : /users/delete_user/:userId
 */
app.delete('/users/delete_user/:userId', (req, res) => {
    const userId = Number(req.params.userId)
    const userToDelte = users.find(user => user.id === userId)
    if (userToDelte) {
        users = users.filter(user => user.id !== userId)
        res.status(200).send({msg: "User deleted ", users})
    } else {
        res.status(400).send({msg: "User not found !!"})
    }
})

/**
 * edit user
 * method : put
 * path : /users/edit_user/:userId
 */
app.put('/users/edit_user/:userId', (req, res) => {
    const userId = Number(req.params.userId)
    const newUser = req.body
    const userToEdit = users.find(user =>user.id === userId)
    if (userToEdit) {
        users = users.map(user => user.id === userId ? {...user, ...newUser}: user)
        res.status(200).send({msg:" User edited", users})
    } else {
        res.status(400).send({msg: "User not foiund !!"})
    }
})


// create server
const port = 8500;
app.listen(port, (error) => {
    error ? console.log(error)
    :
    console.log(`Server is running on port ${port} ... `)
})