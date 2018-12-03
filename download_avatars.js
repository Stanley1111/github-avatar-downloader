var request = require('request');
var secret = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'Stanley1111',
      'Authorization': 'secrets.GITHUB_TOKEN'
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

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

//Testing
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);

//   let avatars = JSON.parse(result);
//   avatars.forEach(function(item) {
//     console.log(item.avatar_url);
//   });


// });

