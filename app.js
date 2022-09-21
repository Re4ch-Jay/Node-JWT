const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT;
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const {requireAuth, checkUser} = require('./middleware/authMiddleware')

// middleware

app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())
// view engine
app.set('view engine', 'ejs');

//database connection & listen to port

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(PORT, () => console.log('Connected to Database\nServer is running on port '+ PORT)))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home', {title: 'Home'}));
app.get('/home', (req, res) => res.redirect('/'))
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies', {title: 'Smoothies'}));
app.use(authRoutes)



app.get('/about', (req, res) => res.render('about', {title: 'About'}))
app.get('/reviews', (req, res) => res.render('reviews', {title: 'Reviews'}))
app.use((req, res) => res.status(404).render('404', {title: "404"}))