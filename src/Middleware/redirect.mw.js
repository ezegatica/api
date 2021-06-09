const path = require('path');
function e404(req, res, next) {
    // res.json("https://eze.wtf"+req.url)
    res.status(404).sendFile('404page.html', { root: path.join(__dirname, '../Pages') });
};


module.exports = e404;
