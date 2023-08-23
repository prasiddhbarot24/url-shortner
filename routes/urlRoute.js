const express = require('express');

const router = express.Router(); 
const { handleGeneratNewURL , handleGetAnalytics }= require('../controllers/urlFuns');

router.post('/',handleGeneratNewURL);
router.get("/analytics/:shortId", handleGetAnalytics);


module.exports = router;