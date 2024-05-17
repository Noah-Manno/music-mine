const add = require('express').Router();
// const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid')
const { Pool } = require('pg');

const pool = new Pool(
    {
        user: 'postgres',
        password: 'sqlsqksqjsqh123',
        host: 'localhost',
        database: 'music_db'
    },
    console.log(`Connected to the music_db database.`)
)

pool.connect()

add.get('/', (req, res) => {
    console.info(`${req.method} request received for music`);
    pool.query(`SELECT * FROM users`, (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data from the database');
        } else {
            res.json(results.rows);
        }
    });
});

add.post('/', (req, res) => {
    console.info(`${req.method} request received for music`);

    // Destructure Music
    const { user_id, title, composer, ensemble, challenge, voicing, language, desc } = req.body;

    if (title) {
        const newPiece = {
            user_id, 
            title,
            composer,
            ensemble,
            challenge,
            voicing,
            language,
            desc,
        };

        // Insert new piece into the music table
        pool.query(
            `INSERT INTO music (user_id, piece_title, composer, ensemble, challenge, voicing, text_language, piece_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [user_id, title, composer, ensemble, challenge, voicing, language, desc],
            (error, results) => {
                if (error) {
                    res.status(500).send('Error adding data to the database');
                } else {
                    const response = {
                        status: 'success',
                        body: newPiece,
                    };
                    res.json(response);
                }
            }
        );
    } else {
        res.json('Error in adding piece');
    }
});

module.exports = add;
