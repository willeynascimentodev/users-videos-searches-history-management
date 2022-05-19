const { videos } = require('../models/videoApiModel');



async function getVideos (req, res) {
    const result = await videos(req.query.title, req.query.max_results);
    res.status(200).json(result.data);
}

module.exports = {
    getVideos
}