const Actions = [];

Actions.goToPanel = (req, res) => {
    res.redirect('https://admin.ezegatica.com')
}

Actions.pong = (req, res) => {
    res.json('Pong!')
}
module.exports = Actions;