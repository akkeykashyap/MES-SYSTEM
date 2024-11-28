const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// View inventory items
router.get('/', inventoryController.index);

// Route to add a new item (POST request)
router.post('/add', async (req, res) => {
    try {
        // Create a new item from the request body
        const { name, quantity, location } = req.body;
        const newItem = new Item({ name, quantity, location });

        // Save the new item to the database
        await newItem.save();

        // Redirect to the inventory page after the item is added
        res.redirect('/inventory');
    } catch (err) {
        console.error('Error adding item:', err);
        res.status(500).send(err.message);
    }
});

module.exports = router;
