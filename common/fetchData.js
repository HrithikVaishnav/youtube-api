const rp = require('request-promise');
const config = require('./../config.json');
const Video = require('./../models/Video');

module.exports = fetchApiData = async (publishedAt) => {
    let itemDetails = [];
    const requestOption = {
        uri: 'https://youtube.googleapis.com/youtube/v3/search',
        method: 'GET',
        useQuerystring: true,
        qs: {
            publishedAfter: publishedAt,
            maxResults: 5,
            type: 'sports',
            key: config.apiKey,
            part: 'snippet'
        },
        json: true, 
    };
    try {
        const response = await rp(requestOption);
        if (response) {
            const items = response.items || [];
            items.forEach(ele => {
                const singleItem = {
                    videoId: ele.id.videoId,
                    channelId: ele.snippet.channelId,
                    title: ele.snippet.title,
                    description: ele.snippet.description,
                    thumbnails: ele.snippet.thumbnails,
                    publishedAt: ele.snippet.publishedAt,
                }
                itemDetails.push(singleItem);
            });

            if(Array.isArray(itemDetails) && itemDetails.length > 0) {
                await Promise.all(itemDetails.map(async (ele) => {
                    const video = new Video(ele);
                    await video.save();
                }))
            }
        }
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}