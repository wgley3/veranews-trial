var express = require('express');
var router = express.Router();

router.post('/topicActivity', function(req, res, next) {
  var cookieStr = req.headers.cookie;
  var cookieID;
  var cookieValid = true;
  if(!cookieStr) {
    cookieValid = false;
  } else {
    var index = cookieStr.indexOf('viraUserCookie=')
    cookieValid = index != -1;
    cookieID = cookieStr.split('=')[1]
  }

  if(!cookieValid || !cookieID) {
    //No cookie header set, so render page with dummy data
    res.status(401)
    res.send({message: 'Invalid user cookie provided.'})
    return undefined;
  }

  if(!req.body.activityID) {
    res.status(401)
    res.send({message: 'Invalid activity ID provided.'})
    return undefined;
  }

  //console.log(`Updating topicActivity for id = ${req.body.activityID} and userCookie = ${cookieID}`)

  req.db.models.topicActivity.update({}, {
    where: {
      'cookieID': cookieID,
      'id': req.body.activityID
    }
  }).then((result) => {
    if(!result || result[0] === 0) {
      console.error('Failure to update previous topicActivity')
    }
    res.status(200);
    res.send({message: 'Success.'})
    return undefined
  }).catch((err) => {
    console.error(err)
    res.status(500);
    res.send(err);
    return undefined
  })
});

module.exports = router;
