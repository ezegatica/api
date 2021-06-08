require('dotenv').config();

module.exports = {
    DATABASE_URL: process.env.DB_URL || null,
    PORT: process.env.PORT || 5000,
    FRONT_ADDRESS: process.env.FRONT_ADDRESS,
    SECRET: process.env.JWT_SECRET
}