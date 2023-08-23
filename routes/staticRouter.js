const express = require ('express');
const router = express.Router();
const URL = require("../models/urlSchema")

router.get("/", async (req,res)=>{

    const allUrls = await URL.find({});
    return res.render("home" ,{
        urls : allUrls
    });
})


router.get("/analytics", async (req,res)=>{

    const allUrls = await URL.find({});
    return res.render("analytics" ,{
        urls : allUrls
    });
})

router.get('*', (req, res)=>{
    res.redirect('/');
});

module.exports = router;