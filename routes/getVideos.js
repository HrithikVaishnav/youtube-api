const express = require('express');
const router = express.Router();
const Video = require('./../models/Video');

// to get all videos data 
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

// pagination endpoint to get videos details in chunk of 20 videos
router.get('/getPaginationVideo', async(req, res) =>{
    const pageNumber = req.query.pageNumber;
    // per page video data 
    const perPageView = 20;
    let videos = [];
    try {
        // sorting data on publishedAt desc
        videos = await Video.find({ sort: { publishedAt: -1 }}).limit(pageNumber*perPageView);
    } catch (err) {
        return res.status(422).send(err.message);
    }
    let videoList = [];
    
    if (Array.isArray(videos) && videos.length > 0) {
        const startingIndex = (pageNumber - 1)*perPageView;
        for (let i=startingIndex; i<videos.length; i++) {
            videoList.push(videos[i]);
        }
    }
    res.send(videoList);
});

// to get data on the basis of title search
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