const express = require('express');
const router = express.Router();
const Category = require('../database/modules/Category');
const { jwtCheck } = require('../strategies/auth0')

// Route to insert a new category
router.post('/', jwtCheck,
    async (req, res) => {
        try {
            // Assuming req.body contains the JSON data to insert
            const newCategory = await Category.create(req.body);

            // Send the created category as a response
            res.status(201).json(newCategory);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

router.get('/', jwtCheck,
    async (req, res) => {
        try {
            const category = await Category.find();
            res.status(201).json(category);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

module.exports = router;
