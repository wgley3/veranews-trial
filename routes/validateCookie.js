var express = require('express');
var router = express.Router();

router.get('/validateCookie', function(req, res, next) {
  var cookieID = req.query.cookieID
  
  if (!cookieID) {
    res.status(200);
    res.send({valid: false});
  return undefined
  }
  
  req.db.models.user.findOne({
    where: {
      'cookieID' : cookieID
    }
  }).then((result) => {
    res.status(200);
    if(result) {
      res.send({valid: true});
    } else {
      res.send({valid: false});
    }
  return undefined
  }).catch((err) => {
    res.status(500);
    res.send(err);
    return undefined
  })
});

module.exports = router;
