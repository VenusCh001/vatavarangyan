import express from "express"
import axios from "axios"
import bodyparser from "body-parser"

//creating the object of my app so as to use different features present in it
const app=express();

//fetching the main home page whenever a user comes on the website
app.get("/",(req,res)=>{
    res.render("index.ejs");
});
