var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/blogz';

// now i make this object that does all the heavy lifting

var heavyLifting = {
  query: function(sqlStuff, values, callback) {
    pg.connect(connectionString, function(err, client, done) {
      client.query(sqlStuff, values, function(err, result) {
        done();
        callback(err, result);
      });
    });
  }
};

exports.qq = heavyLifting;
