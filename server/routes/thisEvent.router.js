const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//get a specific event's data for the EventPage
router.get('/:id', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT "event".*, "user"."username", "user"."image" 
        AS "captain_image" FROM "event" 
        JOIN "user" ON "user"."id" = "event"."captain_id" 
        WHERE "event"."id" = $1;`);
    pool.query(queryText, [req.params.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

//determine whether a user is attending a specific event
router.get('/isAttending/:id', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT * FROM "event_user" 
        WHERE "user_id" = $1 AND "event_id" = $2;`);
    pool.query(queryText, [req.user.id, req.params.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

module.exports = router;