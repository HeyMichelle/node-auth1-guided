const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const usersRouter = require("./users/users-router")
const db = require("./database/config"); // for storing

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
	resave: false, // avoid creating sessions that have no changed
	saveUninitialized: false, // to comply with GDPR laws
	secret: "Keep it secret, keep it safe", // ccryptographically sign the cookie
	store: new KnexSessionStore({ 
		knex: db,
		createtable: true,
	}) // stores cookie sessions to database to persist vs just being in memory
}))

server.use(usersRouter)

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
