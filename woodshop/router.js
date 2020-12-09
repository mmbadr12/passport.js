const express = require('express');
const router = express.Router();
const Liana = require('forest-express');
const redshiftClient = require('./databaseclant')


router.post('/stats/nb-users', Liana.ensureAuthenticated, async (request, response) => {

  const query = `
    SELECT count(*) as nb
    FROM users
  `; 

  const data = await redshiftClient.query(query);

  let json = new Liana.StatSerializer({ 
    value: data.rows[0].nb 
  }).perform();

  response.send(json);

});



router.post('/stats/top-5-buyers', Liana.ensureAuthenticated, async (request, response) => {

    const query = `
      SELECT firstname || ' ' || lastname AS key, total_quantity AS value
      FROM   (SELECT buyerid, sum(qtysold) total_quantity
              FROM  sales
              GROUP BY buyerid
              ORDER BY total_quantity desc limit 5) Q, users
      WHERE Q.buyerid = userid
      ORDER BY Q.total_quantity desc
    `; 
  
    const data = await redshiftClient.query(query);
  
    let leaderboard = data.rows;
    let json = new Liana.StatSerializer({ 
      value: leaderboard 
    }).perform();
  
    response.send(json);
  
  });



  module.exports = router;