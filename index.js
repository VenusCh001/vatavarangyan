import express from "express"
import axios from "axios"
import bodyparser from "body-parser"

const app=express();
const port = process.env.PORT || 3000;
const apiurl="https://api.open-meteo.com/v1/forecast/";
const geourl="https://geocoding-api.open-meteo.com/v1/search";

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
    const geoencoding_response=await axios.get(geourl,{
        params:{
            name:inputdata.place,
            count:1
        }
    });
    const result=geoencoding_response.data.results[0];

    try{
        const weather_response=await axios.get(apiurl,{
            params: {
                latitude:result.latitude,
                longitude:result.longitude,
                timezone:"auto",
                current:"temperature_2m,is_day"
            }});

            res.render("index.ejs", {
            location:result.admin1 + " , " + result.country,
            latitude: weather_response.data.latitude,
            longitude: weather_response.data.longitude,
            temp: weather_response.data.current.temperature_2m,
            tempunit: weather_response.data.current_units.temperature_2m,
            nature: weather_response.data.current.is_day === 1 ? "Day" : "Night"
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

