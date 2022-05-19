require('dotenv').config();
const { google } = require('googleapis');

const service = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
});

async function videos(q, max_results) {

    try {
        const resultado = await service.search.list({
            "part" : [
                "snippet"
            ],
            "channelType": 'any',
            "q" : q,
            'maxResults' : max_results
        });    

        return resultado;

    } catch (error) {
        return await 500;
    }
    
}

module.exports = {
    videos
}