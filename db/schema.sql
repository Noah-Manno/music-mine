DROP DATABASE IF EXISTS music_db;
CREATE DATABASE music_db;

\c music_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL
);

CREATE TABLE music (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    piece_title TEXT,
    composer TEXT,
    ensemble TEXT,
    challenge INTEGER,
    voicing TEXT,
    text_language TEXT,
    piece_description TEXT,
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);