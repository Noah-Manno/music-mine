const libraries = require('express').Router();
const Libraries = require('../../models/libraries');

libraries.get('/', async (req, res) => {
    const LibrariesData = await Libraries.findAll();
    return res.json(LibrariesData);
});

libraries.post('/', async (req, res) => {
   const LibrariesData = await Libraries.create(req.body)
   return res.json(LibrariesData)
});

libraries.get('/:user_id', async (req, res) => {
    const LibrariesData = await Libraries.findAll({
        where: {
            user_id: req.params.user_id,
        },
    });
    return res.json(LibrariesData);
});

libraries.delete('/:library_id', async (req, res) => {
    const LibrariesData = await Libraries.destroy({
        where: {
            library_id: req.params.library_id,
        },
    });
    return res.json(LibrariesData);
});

module.exports = libraries;