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

var content = {
  configured: true,
  dualView: false,
  mainArticle: [{
    title: 'A Sample Article',
    body: sampleArticleBody,
    color: '#80808F',
    topicID: 1
  }, {
    title: 'A Sample Article',
    body: sampleArticleBody,
    color: '#8F8080',
    topicID: 1
  }],
  title: 'Vira - Abortion in America',
  sideArticles: sampleArticles
};

module.exports = content;