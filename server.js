'use strict'
// http://localhost:3000
//api key= 160757eac693cda92c0ff8c3c1b63f5b

//import the express framework
const express = require('express');

//import cors
//sercer open to all  client  request 
const cors = require('cors');

const movieData = require('./Movie Data/data.json');//import data.json inside movie data

const axios = require('axios');//send a request for a server and multi method
require('dotenv').config();

const server = express();
server.use(cors());



const PORT = 3000;
//constructor to get data from json or any location
function Movielibrary(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}
// Route
server.get('/', homeHandler)
server.get('/favorite', favHandler)
server.get('/trending', trendingHandler)
server.get('/search', searchHandler)
server.get('/collection', collectionHandler)
server.get('/tv',tvHandler);
server.get('*', defultHandler)
server.use(errorHandler);// bulit-in middleware function allow me to handle the Error

// function handler 
function homeHandler(req, res) {
    // const movieData = require('./Movie Data/data.json');//import data.json inside movie data
    const movies = new Movielibrary(movieData.title, movieData.poster_path, movieData.overview);
    res.send(movies);
}
function favHandler(req, res) {
    res.status(200).send("Welcome to Favorite Page")
}
function defultHandler(req, res) {
    res.status(404).send("page not found error");
}
function trendingHandler(req, res) {
    try {
        // const apiKey = process.env.APIKey;
        // console.log(apiKey);
        // const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
        // let axiosRes = await axios.get(url);
        // let mapRes =axiosRes.data.results.map((item) =>{
        // let singleMovie = new Movielibrary(item.id, item.title, item.release_date, item.poster_path, item.overview);
        //     return singleMovie;
        // })
        // res.send(mapRes);
        const apiKey = process.env.APIKey;
        const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
        axios.get(url)
            .then((result) => {          //<<= like await and async
                let mapRes = result.data.results.map((item) => {
                    let singleMovie = new Movielibrary(item.id, item.title, item.release_date, item.poster_path, item.overview);
                    return singleMovie;
                })
                res.send(mapRes);
            })
            .catch((error) => {  //if we have an error well catch here in the server error or in the coding error before
                res.status(500).send(error)
            })

    }
    catch (error) {
        errorHandler(error, req, res);
    }


}
function searchHandler(req, res) {
    try {
        const apiKey = process.env.APIKey;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false
            &query=PIG`;
        axios.get(url)
            .then((result2) => {
                let mapRes = result2.data.results;
                res.send(mapRes);
            })
            .catch((error) => {
                res.status(500).send(error)
            })

    }
    catch (error) {
        errorHandler(error, req, res);
    }

}

function collectionHandler(req, res) {
    try {
        const apiKey = process.env.APIKey;
        const url = `https://api.themoviedb.org/3/collection/10?api_key=${apiKey}&language=en-US`;
        axios.get(url)
            .then((result3) => {
                let Res = result3.data;
                res.send(Res);

            })
            .catch((error) => {
                res.status(500).send(error);
            })

    }
    catch (error) {
        errorHandler(error, req, res);
    }

}
function tvHandler(req,res){
    try {
        const apiKey = process.env.APIKey;
        const url = `https://api.themoviedb.org/3/tv/100?api_key=${apiKey}&language=en-US`;
        axios.get(url)
            .then((result4) => {
                let restV = result4.data;
                res.send(restV);

            })
            .catch((error) => {
                res.status(500).send(error);
            })

    }
    catch (error) {
        errorHandler(error, req, res);
    }





}


//middle ware function 
function errorHandler(error, req, res) {
    const err = {
        status: 500,
        message: error
    }
    res.status(err.status).send(err);
}

//to see the result in a ubuntu
server.listen(PORT, () => {
    console.log(`listening on ${PORT} : I am ready`);
})
