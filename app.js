/*
 Authors: Gurpreet Singh
 Your name and student #: Gurpreet Singh A01201759
 Your Partner's Name and student #: No partner
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const os = require("os");
const fs = require('fs')

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res)=> {
  let formData = req.body;
  console.log(formData);
  data = formData['commamovies']
  splittedData = data.split(",")
  console.log(splittedData)
  res.render("pages/index", {
    splittedData : splittedData
  });
});

app.get("/myListQueryString", (req, res) => {
  let movieList = []
  let movie1 = req.query.movie1;
    let movie2 = req.query.movie2;
    if (movie1 === undefined || movie2 === undefined) {
        res.send("<p>Please add first and second movie name!</p>")
    }
    movieList.push(movie1, movie2)
    res.render("pages/index", {
      splittedData : movieList

    });
  
});

app.get("/search/:movieName", (req, res) => {
  let movieName = req.params.movieName;

  fs.readFile('movieDescriptions.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    if(!data.includes(movieName)){
      res.render("pages/searchResult", {result: "Movie could not be found", movie : movieName});
    }
    else{
      dataobj = {}
      newdata = data.split("\n")
      for (const line of newdata) {
        const data = line.split(":");
        dataobj[data[0]] = data[1];
      }
      res.render("pages/searchResult", {result: dataobj[movieName], movie: movieName})
    }
      
  })

});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});