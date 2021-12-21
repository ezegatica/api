const Auth = [];
const User = require("../Models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config")
Auth.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // validacion
        if (!username || !password)
            return res.status(400).json({ errorType: "no-username-or-password" })
        if (password.length < 6)
            return res.status(400).json({ errorType: "short-password" })

        const existsUsername = await User.findOne({ username: username })
        if (existsUsername)
            return res.status(400).json({ errorType: "username-used" })

        //hash password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        //guardar a la base de datos
        const newUser = new User({
            username: username,
            passwordHash: passwordHash
        })
        const savedUser = await newUser.save()

        //login luego de registrarse

        const token = jwt.sign({
            user: savedUser._id
        }, config.SECRET);

        //enviar el token como cookie
        return res.json({token});
        res.cookie("token", token, {
            httpOnly: true,

        }).send();


    } catch (err) {
        console.error(err)
        res.status(500).send();
    }
}

Auth.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // validate
        if (!username || !password)
            return res.status(400).json({ errorType: "no-username-or-password" })

        //encontrar si usuario esta registrado 
        const existingUser = await User.findOne({ username: username })
        if (!existingUser)
            return res.status(401).json({ errorType: "wrong-username-or-password" })

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash)
        if (!passwordCorrect)
            return res.status(401).json({ errorType: "wrong-username-or-password" })

        //generando token
        const token = jwt.sign({
            user: existingUser._id
        }, config.SECRET);

        //enviar el token como cookie
        res.cookie("token", token, {
            httpOnly: true
        }).json({token}).send();

    } catch (err) {
        console.error(err)
        res.status(500).send();
    }
}

Auth.logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(69)
    }).cookie("username", "", {
        httpOnly: true,
        expires: new Date(69)
    }).send()
}

Auth.check = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token)
            return res.json(false);

        jwt.verify(token, config.SECRET)
        
        res.send(true)

    } catch (err) {
        console.error(err)
        res.json(false);
    }
}

module.exports = Auth;
