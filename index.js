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
    res.render('signup', {layout: 'index', fpjsToken: process.env.FPJS_PUBLIC_API_KEY})
  })

// signup form submission
  app.post('/signup', async function signup(req, res, next) {
    const {email, visitorId} = req.body

    try {
      if (!email) {
        throw new Error('email is required')
      }

      const hasVisitorId = (await client.query('select * from users where visitor_id = $1', [visitorId])).rows.length > 0

      if (hasVisitorId) {
        throw new Error('Looks like you already have an account, please sign in')
      }

      const result = await client.query('insert into users(email, visitor_id) values($1, $2) returning *', [email, visitorId])
      console.log(`${result.rows[0].email} added to the db`)

      res.render('signup_success', {layout: 'index'})
    } catch (e) {
      console.error(e)

      let message = e.message

      if (e.code === '23505') {
        message = 'User with this email already exists'
      }

      res.render('signup', {layout: 'index', fpjsPublicApiKey: process.env.FPJS_PUBLIC_API_KEY, error: message, email})
    }
  })

// create server
  const server = http.createServer(app)
  server.listen('3002')

}());