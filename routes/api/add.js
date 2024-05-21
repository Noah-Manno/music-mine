const add = require('express').Router();
const Music = require('../../models/music');

add.get('/', async (req, res) => {
    const musicData = await Music.findAll();

    return res.json(musicData);
});

add.post('/', async (req, res) => {
   const musicData = await Music.create(req.body)

   return res.json(musicData)
});

add.get('/:user_id', async (req, res) => {
    const musicData = await Music.findByPk(req.params.user_id)

    return res.json(musicData);
});

add.delete('/:piece_id', async (req, res) => {
    const musicData = await Music.destory({
        where: {
            piece_id: req.params.piece_id,
        },
    });

    return res.json(musicData);
});

module.exports = add;
