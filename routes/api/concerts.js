const concerts = require('express').Router();
const Music = require('../../models/music');
const Concerts = require('../../models/concerts');

concerts.get('/', async (req, res) => {
    const ConcertsData = await Concerts.findAll();
    return res.json(ConcertsData);
});

concerts.post('/', async (req, res) => {
   const ConcertsData = await Concerts.create(req.body)
   return res.json(ConcertsData)
});

concerts.get('/:user_id', async (req, res) => {
    const ConcertsData = await Concerts.findAll({
        where: {
            user_id: req.params.user_id,
        },
    });
    return res.json(ConcertsData);
});

concerts.delete('/:concert_id', async (req, res) => {
    const ConcertsData = await Concerts.destroy({
        where: {
            concert_id: req.params.concert_id,
        },
    });
    return res.json(ConcertsData);
});

concerts.post('/:concert_id/music/:piece_id', async (req, res) => {
    const concert_id = req.params.concert_id;
    const piece_id = req.params.piece_id;
    try {
        const concert = await Concerts.findByPk(concert_id)
        const music = await Music.findByPk(piece_id)
        if (!concert || !music) {
            return res.status(404).json({error: 'Concert or piece does not exist'})
        }
        await concert.addMusic(music);

        res.json({ message: 'Music association successful'})
    } catch (error) {
        res.status(500).json({ error: 'Failed to associate'})
    }
});

module.exports = concerts;