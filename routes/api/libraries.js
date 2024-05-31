const libraries = require('express').Router();
const Libraries = require('../../models/libraries');

libraries.get('/', async (req, res) => {
    const LibrariesData = await Libraries.findAll();
    return res.json(LibrariesData);
});

libraries.post('/', async (req, res) => {
    try {
   const LibrariesData = await Libraries.create(req.body)
   if (!LibrariesData) {
        return res.status(400).json({ message: 'could not create library' })
   }
   return res.json(LibrariesData)
    } catch (err) {
        res.status(500).json(err)
    }
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