const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// app.use

app.listen(port, function() {
    console.log(`Connected to server at port ${port}`)
})