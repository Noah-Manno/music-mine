const user = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');

user.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch(err) {
        res.status(500).json(err);
    }
});

user.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { username } })

        if(!existingUser) {
            res.status(200).json({ message: 'No User' })
        } else {
            const passwordMatch = await bcrypt.compare(password, existingUser.password);

            if (passwordMatch) {
                res.status(200).json( { message: 'Login successful', user: existingUser });
            } else {
                res.status(401).json({ message: 'Login failed' });
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

user.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const existingUser = await User.findOne({ where: { username } })

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ username, password: hashedPassword, email });
            res.status(200).json({ message: 'Created new user' })
        } else {
            res.status(401).json({ message: 'User already exists' })
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

user.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        if (!userData) {
            res.status(404).json({ message: 'No user found' });
            return;
        }
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err);
    }
});

user.put('/:id', async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!userData[0]) {
            res.status(404).json({ message: 'No user with this id' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

user.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!userData) {
            res.status(404).json( {message: 'No user with this id' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = user;