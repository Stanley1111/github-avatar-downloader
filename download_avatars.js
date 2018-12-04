var request = require('request');
var secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function downloadImageByURL(url, filePath) {
  // ...
  var fs = require('fs');

  request.get(url)
         .on('error', function (err) {
           throw err;
         })
         .on('response', function (response) {
           console.log('Response Status Code: ', response.statusCode);
         })
         .pipe(fs.createWriteStream(filePath));
}

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'Stanley1111',
      'Authorization': 'token '+ secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var tempArr = JSON.parse(body);
    var avatarUrls = {};

    tempArr.forEach(function(item) {
      avatarUrls[item.login] = item.avatar_url;
    });
    //console.log(avatarUrls);

    for (var i in avatarUrls){
      cb(avatarUrls[i], "avatars/" + i + ".jpg");
    }
    // for(var i = 0; i < avatarUrls.length; i++){
    //   cb(avatarUrls[i],"avatars/")
    // }
  });
}



//Testing
//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")


getRepoContributors("jquery", "jquery", downloadImageByURL) ;

