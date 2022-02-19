const express=require("express");
const https=require("https");
const bodyParser=require("body-parser"); 

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    
    const query=req.body.cityName;
    const apikey= "b7223b680f6bde0f52e26938f6c6d15c";
    const unit="metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units="+unit+"&appid="+apikey+"";

    https.get(url,function(response){
        console.log(response.statusCode);
 
        response.on("data",function(data){
            const wD=JSON.parse(data)

            console.log(wD);

            const t=wD.main.temp
            const c=wD.sys.country 
            const d=wD.weather[0].description
            const i=wD.weather[0].icon

            const imageURL ="http://openweathermap.org/img/wn/"+ i +"@2x.png"

            res.write("<h1>The Temparature in "+query+" is </h1>")
            res.write("<h1> "+t+" degrees celcius</h1>")
            res.write("<p> Weather: "+d+" </p>")
            res.write("<h3>Country: "+c+ "  </h3>")
            res.write("<img scr="+ imageURL +">");
            res.send()

        })

    })

})

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 3000;
// }
// app.listen(port);

app.listen(process.env.PORT || 3000,function(){
    console.log("Server started on port 3000");
})