const music = require('express').Router();
const Music = require('../../models/music');

music.get('/', async (req, res) => {
    const musicData = await Music.findAll();

    return res.json(musicData);
});

music.post('/', async (req, res) => {
   const musicData = await Music.create(req.body)

   return res.json(musicData)
});

music.get('/:library_id', async (req, res) => {
    const musicData = await Music.findAll({
        where: {
            library_id: req.params.library_id,
        },
    });
    return res.json(musicData);
});

music.delete('/:piece_id', async (req, res) => {
    const musicData = await Music.destroy({
        where: {
            piece_id: req.params.piece_id,
        },
    });
    return res.json(musicData);
});

module.exports = music;
