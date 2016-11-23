var querystring = require('querystring');
var db = require('./db');

function showBlog(res) {
  // retrieve shit from db
  db.qq['query']('SELECT title, date, content FROM postz ORDER BY id DESC', [], function(err, result) {
    var fuckery = result.rows.map(function(row) {
      var postTitle = row.title;
      var postTS = row.date;
      var postContent = row.content;
      var heading = '<h2>' + postTitle + '</h2>';
      var ts = '<p class="date">' + postTS + '</p>';
      var content = '<p>' + postContent + '</p>';
      return '<div class="post">' + heading + ts + content + '</div>';
    }).join('');

    var home_view = '<html>' +
      '<head>' +
        '<meta http-equiv="Content-Type" content="text/html" charset=UTF-8 />' +
        '<title>i hate myself</title>' +
      '</head>' +
      '<body>' +
        '<a href="/new">new post</a>' +
        '<div class="existing-posts">' +
          fuckery +
        '</div>' +
      '</body>' +
    '</html>';

    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(home_view);
    res.end();
  });
}

function showEditor(res) {
  // i want to eat my sandwich
  var new_post_view = '<html>' +
    '<head>' +
      '<meta http-equiv="Content-Type" content="text/html" charset=UTF-8 />' +
      '<title>new post</title>' +
    '</head>' +
    '<body>' +
      '<form action="/submit" method="post">' +
        '<div>' +
          '<input name="title" type="text" placeholder="Post Title"/>' +
          '<br/>' +
          '<textarea name="content" placeholder="Post Content"></textarea>' +
        '</div>' +
        '<input type="submit" value="submit post" />' +
      '</form>' +
    '</body>' +
  '</html>';

  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(new_post_view);
  res.end();
}

function createNewPost(res, postData) {
  // submit this
  // ha ha get it postData
  // die
  var data = querystring.parse(postData);
  var postTitle = data.title;
  var postTS = (new Date()).toString();
  var postContent = data.content;
  db.qq['query']('INSERT INTO postz (title, date, content) VALUES ($1, $2, $3)', [postTitle, postTS, postContent], function(err, result) {
    res.writeHead(302, {"Location": "/"});
    res.end();
  });
}

exports.home = showBlog;
exports.newP = showEditor;
exports.submit = createNewPost;
