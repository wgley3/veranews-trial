function redirectToHome () {
  if(document.location.href.toString().indexOf('viewTopic') != -1) {
    document.location.href = '/'
  } 
}

function redirectToArticle(id) {
  if(document.location.href.toString().indexOf('viewTopic') == -1) {
    if (id) {
      document.location.href = 'viewTopic?topicid=' + id
    } else {
      document.location.href = 'viewTopic'
    }
  } else {
    if (id) {
      document.location.href = 'viewTopic?topicid=' + id
    }
  }
}