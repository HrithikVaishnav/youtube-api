const express = require('express');
const router = express.Router();
const Video = require('./../models/Video');

router.get('/getVideos', async(req,res) =>{
    let videos = [];
    try {
        videos = await Video.find({});
    } catch (err) {
        return res.status(422).send(err.message);
    }
    
    const videoList = videos.sort((x,y) => {
        return x.publishedAt < y.publishedAt ? 1 : -1
    });
    res.send(videoList);
});

router.get('/searchVideo', async(req,res) =>{
    const title = req.query.title;
    Video.find({title: title})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        return res.status(422).send(err.message);
    });
});

module.exports = router;