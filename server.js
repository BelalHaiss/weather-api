// Setup empty JS object to act as endpoint for all routes
let projectData = {};


// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const cons = require('consolidate');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));

app.get('/add',(req,res)=>{
    res.send(projectData)
})

app.post('/add',(req,res)=>{
 projectData = {...req.body}

})
// Setup Server
app.listen(3000,()=> {
    console.log('server Running')
})

