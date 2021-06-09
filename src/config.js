require('dotenv').config();

module.exports = {
    DATABASE_URL: process.env.DB_URL || null,
    PORT: process.env.PORT || 5000,
    FRONT_ADDRESS: process.env.FRONT_ADDRESS,
    SECRET: process.env.JWT_SECRET,
    TWITTER_BEARER: process.env.TWITTER_BEARER,
    TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET
}