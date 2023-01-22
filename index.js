const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const videoRoutes = require('./routes/getVideos');
const config = require('./config.json');
var cron = require('node-cron');
const fetchApiData = require('./common/fetchData');
const moment = require('moment');

const app = express();
app.use(bodyParser.json());

const URI = config.mongoUrl;

mongoose.connect(URI, {
    useNewUrlParser : true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected',()=> {
    console.log("Connected with database");
});

mongoose.connection.on('error',(err)=> {
    console.error('Error occured',err);
});

// cron schedule calling fetchVideo function and fetching video data from youtube api 
let startDate = new Date('2023-01-21T00:15:01Z').getTime();
cron.schedule('1 * * * * *', async () => {
    const publishedDateTime = moment(startDate).format('YYYY-MM-DDTHH:mm:ssZ');
    console.log('fetch Data From youtube api started ');
    await fetchApiData(publishedDateTime);
    startDate += (10 * 1000); // adding 10s in starttime to fetch next 5 videos 
    console.log('fetch Data From youtube api completed');
});

app.use('/api/', videoRoutes);

app.use('/', (req, res) => {
    res.send({
        success: 'ok'
    });
});

app.listen(config.PORT || 8000,()=>{
    console.log("server running on port 8000");
});