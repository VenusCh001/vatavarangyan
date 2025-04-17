import express from "express"
import axios from "axios"
import bodyparser from "body-parser"

const app=express();
const port=3000;
const apiurl="https://api.open-meteo.com/v1/forecast/";
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'))

//fetching the main home page whenever a user comes on the website
app.get("/",(req,res)=>{
    res.render("index.ejs");
});

//sending data to weatherapi server and getting the response from their server
app.post("/submit",async(req,res)=>{
    const inputdata=req.body;
    console.log(inputdata);
    try{
        const response=await axios.get(apiurl,{
            params: {
                latitude:inputdata.latitude,
                longitude:inputdata.longitude,
                timezone:"auto",
                current:"temperature_2m,is_day"
            }});
        console.log(response.data);
        res.render("index.ejs", {
            latitude: response.data.latitude,
            longitude: response.data.longitude,
            temp: response.data.current.temperature_2m,
            tempunit: response.data.current_units.temperature_2m,
            nature: response.data.current.is_day === 1 ? "Day" : "Night"
        });
    }
    catch(error){
        console.log(error);
    }
    
});
//opening the port
app.listen(port,()=>{
    console.log(`port listening at ${port}`);
});

