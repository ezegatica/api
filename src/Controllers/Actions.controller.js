const Actions = [];

Actions.goToPanel = (req, res) => {
    res.redirect('https://admin.eze.wtf')
}

Actions.pong = (req, res) => {
    res.json('Pong!')
}
module.exports = Actions;