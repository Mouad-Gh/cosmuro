const express = require('express');
const {
    getCalendars,
    addCalendar
} = require('../controllers/calendarController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();


router.post('/', requireAuth,addCalendar);
router.get('/',getCalendars);



module.exports = router;