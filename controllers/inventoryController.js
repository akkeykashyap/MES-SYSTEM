const Item = require('../models/Item');  // Assuming you have an Item model

exports.index = async (req, res) => {
    try {
        // Fetch all items from the database
        const items = [
            { name: 'Item 1', quantity: 10, location: 'A1' },
            { name: 'Item 2', quantity: 5, location: 'B2' }
        ];

        // Pass the items to the EJS template
        res.render('inventory/index', { items: items });
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send(err.message);
    }
};
