const express = require('express');
const router = express.Router();
const { upload, eventRegistration } = require('../controller/eventRegistration');

router.post('/eventRegistration', upload.fields([
    {name: 'receipt', maxCount:1}
]), eventRegistration);

module.exports = router;