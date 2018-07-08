var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var dummyData = require('../lib/defaultArticleData.js')

/* GET topic page. 
If no topicID is provided

*/
router.get('/viewTopic', [function(req, res, next) {

  //First, validate cookie header is set and formatted correctly
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
  	res.render('index', dummyData);
  	return undefined;
  }

  //We have a correctly-formatted cookieID, so let's get the user data
  req.db.models.user.findOne({
  	where: {
  	  cookieID: cookieID
  	}
  }).then((user) => {
  	if(user) {
  	  req.user = user.dataValues
  	  return next();
  	} else {
  	  res.render('index', dummyData);
  	  return undefined;
  	}
  }).catch(err => {
    console.error('Unable to connect to the database.', err);
    res.status(500);
    res.send({error: 'Unable to connect to the database.'})
  });
}, function(req, res, next) {
  var contentParse = function(content){
    content = content.replace(/\n?\r\n/g, '<br />' );
    return content;
  };

  var excerptStripTags = function(content){
    return content.replace('<p>', '').replace('</p>', '');
  }

  //Get all topics for the user depending on liberalness and experiment group
  var articleWhereClause = {};
  if (req.user.experimentGroup !== 'C') {
  	//Select either conservative or liberal articles,
  	//based on conservativeness of user and experiementGroup
  	var userConservative = req.user.liberalness <= 2;
  	if (req.user.experimentGroup === 'A') {
  	  articleWhereClause.conservative = userConservative;
  	} else if (req.user.experimentGroup === 'B') {
  	  articleWhereClause.conservative = !userConservative;
  	}
  }

  req.db.models.topic.findAll({
  	include: [{
  	  model: req.db.models.article,
  	  as: 'articles',
  	  where: articleWhereClause
  	}]
  }).then((topics) => {	//Filter based on conservative/liberal
  	var topicsProcessed = topics.map((topic) => {
  		var topicData = topic.dataValues;
  		topicData.articles = topic.articles.map((article) => {
  			return article.dataValues
  		});
  		return topicData
  	});

    //If provided and valid, select main article as that of req.query.topicid
    var slimmedTopics = topicsProcessed.filter(function(element) {
      return element.id === parseInt(req.query.topicid || '-1')
    });
    var topicToShow;
    var mainTopic;

    if (slimmedTopics.length == 1) {
      mainTopic = slimmedTopics[0];
      topicToShow = topicsProcessed.indexOf(mainTopic)
    } else {
      //If no topic is requested, randomly select an topic for the user to read
      //TODO This should exclude previously read articles by the user
      var numTopics = topicsProcessed.length;
      topicToShow = Math.floor(Math.random() * numTopics);
      mainTopic = topicsProcessed[topicToShow];
    }

    topicsProcessed.splice(topicToShow, 1);
  	var mainArticles = mainTopic.articles.map((article) => {
  	  return {
        title: article.title,
        body: contentParse(article.body),
        color: article.color,
        topicID: article.topicId
      }
  	});

  	var title = (mainArticles.length == 2) ? mainTopic.title : mainArticles[0].title;

  	var sideArticles = topicsProcessed.map((topic) => {
  	  if(topic.articles.length == 2) { //Dual view: reference the topic info for the preview
        return {
  	  	  title: topic.title,
	        excerpt: excerptStripTags(topic.excerpt.substring(0,140)) + '...',
	        color: topic.color,
          topicID: topic.id
  	    }
  	  } else {	//Single-view: reference the article info for the preview
  	  	var article = topic.articles[0]
  	  	return {
  	  	  title: article.title,
	        excerpt: excerptStripTags(article.body.substring(0,140)) + '...',
	        color: article.color,
          topicID: article.topicId
  	    }
  	  }
  	});

  	var content = {
	    configured: true,
  	  dualView: mainArticles.length == 2,
	    mainArticle: mainArticles,
	    title: title,
	    sideArticles: sideArticles
	  };

    req.content = content;
    return next();
  }).catch(err => {
    console.error('Unable to connect to the database.', err);
    res.status(500);
    res.send({error: 'Unable to connect to the database.'})
  });
}, function(req, res, next) {
  //Make a record of the topicActivity for the user and mainTopic
  console.log(req.content.mainArticle)
  var topicActivityData = {
    cookieID: req.user.cookieID,
    topicId: req.content.mainArticle[0].topicID
  };
  req.db.models.topicActivity.create(topicActivityData).then((activity) => {
    console.log(activity);
    console.log(activity.dataValues.id)
    req.content.activityID = activity.dataValues.id;
    res.render('index', req.content);
  }).catch((err) => {
    console.error('Unable to log topicActivity', err);
    res.render('index', req.content);
  });
}]);

module.exports = router;
