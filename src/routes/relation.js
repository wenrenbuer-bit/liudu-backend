const express = require('express');
const router = express.Router();
const relationController = require('../controllers/relationController');

router.post('/', relationController.create);
router.get('/', relationController.list);
router.put('/:id', relationController.update);
router.delete('/:id', relationController.remove);

module.exports = router; 