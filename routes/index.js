var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var expGroupPossible = 'ABC'
  var experimentGroup = expGroupPossible.charAt(Math.floor(Math.random() * expGroupPossible.length));

  var introductionMessage = 'Before we get started, help us select articles for you<br/>by answering a couple of questions...';
  var introductionMessageAuto = 'Vira shows you <em>different perspectives</em> on various political issues.<br/><br/>Loading articles...';
  if (experimentGroup === 'A') {
    introductionMessage = 'We want to make sure <em>your perspective is represented</em>. Help us select<br/>articles for you by answering a couple of questions...\n'
    introductionMessageAuto = 'Vira makes sure that <em>your perspective is represented</em>.<br/><br/>Loading articles...'
  } else if (experimentGroup === 'B') {
    introductionMessage = 'We want to expose you to perspectives <em>different than your own</em>. Help us<br/>select articles for you by answering a couple of questions...\n' 
    introductionMessageAuto = 'Vira is all about <em>challenging your perspective</em>.<br/><br/>Loading articles...'
  }

  var sampleArticleBody = '';
  for(i in [0, 1, 2, 3, 4]) {
  	sampleArticleBody += 'This article is only a sample article. If you\'d like to find out more, please complete your preferences!\n';
  }

  var sampleArticles = [];
  for(i in [0, 1, 2, 3, 4]) {
  	sampleArticles.push({
  	  title: 'A Sample Article',
  	  excerpt: 'Complete your preferences to read full articles.',
  	  color: '#808080'
  	})
  }
  var sampleParameters = {
    configured: false,
    experimentGroup: experimentGroup,
    introductionMessage: introductionMessage,
    introductionMessageAuto: introductionMessageAuto,
    dualView: false,
    mainArticle: [{
      title: 'Welcome to Vira!',
      body: sampleArticleBody,
      color: '#808080'
    }],
    title: 'Welcome to Vira!',
    sideArticles: sampleArticles,
  };

  req.db.models.batchActivity.create({
    converted: false,
    experimentGroup: experimentGroup
  }).then((result) => {
    //console.log(result);
    sampleParameters.batchActivityID = result.dataValues.id

    res.render('index', sampleParameters);
    return undefined;
  }).catch((err)=> {
    console.log(err)
    console.error('Batch analytic failure on index!')
    res.render('index', sampleParameters);
    return undefined;
  });

  return undefined;
});

module.exports = router;
