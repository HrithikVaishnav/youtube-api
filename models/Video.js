const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true
    },
    channelId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    thumbnails: {
        type: Object,
        required: false
    },
    publishedAt: {
        type: Date,
        required: false
    }
}, { timestamps : true});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;