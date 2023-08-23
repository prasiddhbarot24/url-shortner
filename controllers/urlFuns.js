const shortid = require('shortid');
const URL = require("../models/urlSchema")

function handleGeneratNewURL(req, res) {

    if (!req.body.url) return res.status(400).json({ msg: "url is required...." })

    URL.findOne({ redirectURL: req.body.url })
        .then(async existingUrl => {
            // Check if we found the existing URL then render the stored shortId
            if (existingUrl)
                return res.render("home", { id: existingUrl?.shortId })

            // If not found any existing URL then generate newURL record in DB
            else {
                await URL.create({
                    shortId: shortid.generate(),
                    redirectURL: req.body.url,
                    visitHistory: [],
                }).then(newURL => {
                    return res.render("home", { id: newURL?.shortId })
                }).catch(() => {

                })
            }
        }).catch(() => {

        })
}

//Analytics of site visit
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalVisits: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = {
    handleGeneratNewURL,
    handleGetAnalytics,
}