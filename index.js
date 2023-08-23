const express = require("express");
const path = require("path");
const connectMongo = require("./connectMongo");
const urlRoute = require("./routes/urlRoute");
const URL = require("./models/urlSchema")
const staticRoute = require("./routes/staticRouter")


const app = express();
const PORT = 8005;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended : false })) 
app.use(express.static("./views"))
app.use("/url",urlRoute);//custom middleware

app.use("/",staticRoute);

// view engines
app.set("view engine", "ejs");
app.set("views", path.resolve('./views')); 

 
// mongo connection establish
connectMongo();

// creating dynamic route for get site
app.get("/url/:shortId",async (req,res)=>{
    const userShortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId: userShortId
    },{
        $push : {
            visitHistory : { timestamp : Date.now()}
        }
    })
    if (!(entry.redirectURL.indexOf("http://") == 0 || entry.redirectURL.indexOf("https://") == 0)) {
        entry.redirectURL= "http://" + entry.redirectURL;
    }
    return res.redirect(entry.redirectURL);
})



// server
app.listen(PORT,()=>{
    console.log(`server running on ${PORT} `)
})