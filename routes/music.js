const music = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid')

music.get('/', (req, res) => {
    console.info(`${req.method} request received for music`);
    readFromFile('./db/music.json').then((data) => res.json(JSON.parse(data)));
})

music.post('/', (req, res) => {
    console.info(`${req.method} request received for music`);
    // Destructure Music
    const { title, composer, ensemble, challenge, voicing, language, desc } = req.body;

    if (title && composer && ensemble && challenge && voicing && language && desc) {
        const newPiece = {
            title,
            composer,
            ensemble,
            challenge,
            voicing,
            language,
            desc,
            id: uuid(),
        };

        readAndAppend(newPiece, './db/music.json');

        const response = {
            status: 'success',
            body: newPiece,
        }
        res.json(response)
    } else {
        res.json('Error in adding piece')
    }
});

music.delete('/:id', (req, res) => {
    const pieceId = req.params.id;

    readFromFile('./db/music.json')
        .then((data) => {
            let allMusic = JSON.parse(data);
            const updatedMusic = allMusic.filter(piece => piece.id !== pieceId)

            if (allMusic.length === updatedMusic.length) {
                res.status(404).send('piece not found');
            } else {
                writeToFile('./db/music.json', updatedMusic)
                    .then(() => {
                        res.json({ message: 'Piece deleted successfully'});
                    })
                    .catch((err) => {
                        res.status(500).send('Error deleting piece')
                    });
            }
        })
        .catch((err) => {
            res.status(500).send('Error reading Music');
        });
});


module.exports = music;
