const concerts = require('express').Router();
const Music = require('../../models/music');
const Concerts = require('../../models/concerts');
const MusicConcerts = require('../../models/musicConcerts')

concerts.get('/', async (req, res) => {
    const ConcertsData = await Concerts.findAll();
    return res.json(ConcertsData);
});

concerts.post('/', async (req, res) => {
    const ConcertsData = await Concerts.create(req.body)
    return res.json(ConcertsData)
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
        const concert = await Concerts.findByPk(concert_id);
        const music = await Music.findByPk(piece_id);

        if (!concert || !music) {
            return res.status(404).json({ error: 'Concert or piece does not exist' });
        }

        // Create a new entry in the MusicConcerts junction table
        await MusicConcerts.create({ concert_id: concert_id, piece_id: piece_id });

        res.json({ message: 'Music association successful' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to associate' });
    }
});

concerts.get('/:concert_id', async (req, res) => {
    const concert_id = req.params.concert_id;
    try {
        const concert = await Concerts.findByPk(concert_id, {
            include: {
                model: Music,
                through: MusicConcerts,
            },
        });

        if (!concert) {
            return res.status(404).json({ error: 'Concert not found' });
        }

        res.json(concert);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve concert and associated music' });
    }
});

concerts.get('/user/:user_id', async (req, res) => {
    const ConcertsData = await Concerts.findAll({
        where: {
            user_id: req.params.user_id,
        },
    });
    return res.json(ConcertsData);
});

module.exports = concerts;