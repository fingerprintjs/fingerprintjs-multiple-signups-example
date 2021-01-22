(async function () {

  require('dotenv').config()
  const express = require('express')
  const http = require('http')
  const hbs = require('express-handlebars')
  const path = require('path')
  const {Client} = require('pg')

  const app = express()

// configure db and connect
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  await client.connect()

// setup express
  app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
  }));

  app.set('view engine', 'hbs');

// middleware
  app.use(express.static(path.join(__dirname, '/public')))
  app.use(express.urlencoded({
    extended: true
  }))

// routes
  app.get('/signup', function (req, res, next) {
    res.render('signup', {layout: 'index'})
  })

// signup form submission
  app.post('/signup', async function signup(req, res, next) {
    const {email} = req.body

    try {
      if (!email) {
        throw new Error('email is required')
      }

      const result = await client.query('INSERT INTO users(email) VALUES($1) RETURNING *', [email])
      console.log(`${result.rows[0].email} added to the db`)

      res.render('signup_success', {layout: 'index'})
    } catch (e) {
      console.error(e)

      let message = e.message

      if (e.code === '23505') {
        message = 'User with this email already exists'
      }

      res.render('signup', {layout: 'index', error: message, email})
    }
  })

// create server
  const server = http.createServer(app)
  server.listen('3002')

}());