require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile').development);
const app = express();

const footprintRoutes = require('./routes/footprint')
const activityRoutes = require('./routes/activities')
const groceryRoutes = require('./routes/groceries')
const userRoutes = require('./routes/users')

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/footprints', footprintRoutes)
app.use('/activities', activityRoutes)
app.use('/groceries', groceryRoutes)
app.use('/user', userRoutes)

app.listen(port, function() {
    console.log(`Connected to server at port ${port}`)
})