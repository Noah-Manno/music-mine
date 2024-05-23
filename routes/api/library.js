const library = require('express').Router();
const Music = require('../../models/music');

library.get('/', async (req, res) => {
    const musicData = await Music.findAll();

    return res.json(musicData);
});

library.post('/', async (req, res) => {
   const musicData = await Music.create(req.body)

   return res.json(musicData)
});

library.get('/:user_id', async (req, res) => {
    const musicData = await Music.findAll({
        where: {
            user_id: req.params.user_id,
        },
    });
    return res.json(musicData);
});

library.delete('/:piece_id', async (req, res) => {
    const musicData = await Music.destroy({
        where: {
            piece_id: req.params.piece_id,
        },
    });
    return res.json(musicData);
});

module.exports = library;
