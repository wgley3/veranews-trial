var express = require('express');
var router = express.Router();

/* POST user config */
router.post('/user', [function(req, res, next) {
  var params = req.body;

  var liberalness = parseFloat(params.liberalness);

  //Validate inputs
  if (isNaN(liberalness) || liberalness < 1 || liberalness > 4) {
  	res.status(400);
  	res.send({message: 'Please indicate where you fall on the political spectrum.'})
  	return undefined
  }

  var topAge = parseFloat(params.topAge);

  if (isNaN(topAge) || topAge < 1 || topAge > 100) {
  	//res.status(400);
  	//res.send({message: 'Please indicate your age.'})
  	//return undefined

    //Age is no longer required:
    topAge = 0;
  }

  if(params.experimentGroup !== 'A' && params.experimentGroup !== 'B' && params.experimentGroup !== 'C') {
  	//res.status(400);
  	//res.send({message: 'Please reload the page and try again.'})
  	//return undefined

    //Experiment Group Assigned after page load
    var expGroupPossible = 'ABC'
    var experimentGroup = expGroupPossible.charAt(Math.floor(Math.random() * expGroupPossible.length));
    params.experimentGroup = experimentGroup;
  }

  //Everything is valid, so create the user
  //Map topAge to ageRange
  var ageRange;
  if (topAge <= 0) {
    ageRange='undefn';
  } else if (topAge <= 18) {
  	ageRange='0-18';
  } else if (topAge <= 24) {
  	ageRange='19-24';
  } else if (topAge <= 34) {
  	ageRange='25-34';
  } else if (topAge <= 44) {
  	ageRange='35-44';
  } else if (topAge <= 54) {
  	ageRange='45-54';
  } else if (topAge <= 64) {
  	ageRange='55-64';
  } else {
  	ageRange='65-100';
  }

  //Create the cookie ID
  var cookieID = "";
  var possible = "abcdef0123456789";

  for( var i=0; i < 20; i++ )
    cookieID += possible.charAt(Math.floor(Math.random() * possible.length));

  var userData = {
  	cookieID : cookieID,
  	liberalness: liberalness,
  	ageRange: ageRange,
  	experimentGroup: params.experimentGroup,
    autoRegister: params.cacheGroupUsed || false
  };

  req.db.models.user.create(userData).then((user) => {
  	//Successful create. Return the cookie ID for storing
  	res.status(200);
    res.send({cookieID: cookieID})

    //Proceed with next handler to update the batch analytics
    req.cookieID = cookieID;
    req.userId = user.dataValues.id
    return next();
  }).catch((err) => {
  	res.status(500);
  	res.send('Response')
  });
}, function(req, res, next) {
  if(!req.body.batchActivityID) {
    console.error('No batchActivityID provided in POST /userConfig');
    return undefined;
  }

  //console.log(`Converting batchActivity ${req.body.batchActivityID}`)
  req.db.models.batchActivity.update({
    converted: true,
    userId: req.userId
  }, {
    where: {
      id: parseInt(req.body.batchActivityID)
    }
  }).then((result) => {
    //console.log(result)
    return;
  }).catch((err) => {
    console.error('Error updating batchActivity on index');
    return;
  })
}]);

module.exports = router;
