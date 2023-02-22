'use strict'
// http://localhost:3000

//import the express framework
const express = require('express');

//import cors
const cors = require('cors');

const server = express();

const PORT =3000;
function Movielibrary(title,poster_path,overview){
    this.title =title;
    this.poster_path=poster_path;
    this.overview=overview;
}
//Home route
server.get('/',(req,res)=>{
    //to get data from json file
     const movieData = require('./Movie Data/data.json');
    const movies = new Movielibrary(movieData.title,movieData.poster_path,movieData.overview);
     res.send(movies);
});

// favourite  route 
server.get('/favorite',(req,res)=>{
    res.status(200).send("Welcome to Favorite Page")
})
// handle the server error (status 500)
server.get('*',(req,res)=>{
    res.status(500).send("Sorry, something went wrong");
})
//handle "page not found error" (status 404)
server.get('*',(req,res)=>{
    res.status(404).send("page not found error");
})


server.listen(PORT, () =>{
    console.log(`listening on ${PORT} : I am ready`);
})
