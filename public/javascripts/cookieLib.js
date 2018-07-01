function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, value, days) {
  var expires = "";
  if (days) {
     var date = new Date();
     date.setTime(date.getTime() + (days*24*60*60*1000));
     expires = "; expires=" + date.toUTCString();
  }
  document.cookie = cname + "=" + (value || "") + expires + "; path=/";
}

function unsetCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
}