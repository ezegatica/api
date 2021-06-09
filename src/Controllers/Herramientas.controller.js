const Herramientas = [];
const Crypto = require('crypto');
const ytdl = require("ytdl-core")
const config = require('../config')
Herramientas.salt = async (req, res) => {
    try {
        const input = parseInt(req.params.id, 10);
        const regex = /^\d+$/;
        const valid = regex.test(input);
        if (!valid) { return res.status(400).json({ message: 'Solo se pueden ingresar numeros' }) }
        if (input <= 0 || input > 8192) return res.status(400).json({ message: "El numero de bytes no puede ser menor a 1, o mayor a 8192" })
        const salt = Crypto.randomBytes(input).toString('hex')
        res.json({ resultado: salt })
    } catch (error) {
        res.status(500).json({ message: "Error de servidor interno", error: error.message })
    }
}

Herramientas.youtube = async (req, res) => {
    var URL = req.query.URL || req.query.v;
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    try {
        ytdl(URL, {
            format: 'mp4'
        }).pipe(res)
    } catch (e) {
        res.json({
            error: 'No se pudo encontrar un video con esa ID'
        })
    }
}
Herramientas.twitter = async (req, res) => {
    try {
        const tweet_url = req.query.url;
        const tweet_id = req.query.id;
        const direct_id = req.params.id;
        const url_valid = /^(https?:\/\/)?(www\.)?twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/.test(tweet_url);
        const url_to_tweet = tweet_url && tweet_url.split("/") || [];
        const id = url_to_tweet[url_to_tweet.length - 1] || tweet_id || direct_id;
        if (!url_valid && !tweet_id && !direct_id) { return res.status(400).json({ message: 'URL del tweet invalido' }) }
        var Twitter = require('twitter');
        var client = new Twitter({
            consumer_key: config.TWITTER_CONSUMER_KEY,
            consumer_secret: config.TWITTER_CONSUMER_SECRET,
            access_token_key: config.TWITTER_ACCESS_TOKEN,
            access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
        });

        var params = { id, tweet_mode: 'extended' };
        client.get('statuses/show', params, function (error, tweet, response) {
            if (!error) {
                var bitrate = 0;
                var hq_video_url;
                try {
                    for (var j = 0; j < tweet.extended_entities.media[0].video_info.variants.length; j++) {
                        if (tweet.extended_entities.media[0].video_info.variants[j].bitrate) {
                            if (tweet.extended_entities.media[0].video_info.variants[j].bitrate > bitrate) {
                                bitrate = tweet.extended_entities.media[0].video_info.variants[j].bitrate;
                                hq_video_url = tweet.extended_entities.media[0].video_info.variants[j].url;
                            }
                        }
                    }
                    res.redirect(hq_video_url);
                } catch (error) {
                    res.status(500).json({ message: "El tweet no es un video" })
                }

            } else {
                res.status(500).json({ codigo: error[0].code, message: "No se encontraron videos con esa id!" })
            }
        });
    } catch (error) {
        res.status(500).json({ error, stack: error.stack, message: error.message })
    }
}

Herramientas.reddit = async (req, res) => {
    try {
        const { url } = req.query
        res.json('hgola')
    } catch (error) {
        res.status(500).json({ error, stack: error.stack, message: error.message })
    }
}


module.exports = Herramientas;