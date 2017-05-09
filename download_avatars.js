const request = require('request');
const fs = require('fs');
const repoOwner = process.argv[2];
const repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

const GITHUB_USER = 'grantran';
const GITHUB_TOKEN = '7147870fc9cc9e962392e12ef25d036266ee5f73'

function downloadImageByURL(url, filePath) {
  request(url, function(err, res) {
    if (err) {
      throw err;
      return;
    } else {
      request(url).pipe(fs.createWriteStream(filePath))
    }
  })
}
function getRepoContributors(repoOwner, repoName, cb) {
  const requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' +
  repoOwner + '/' + repoName + '/contributors';

  const options = {
  url: requestURL,
  headers: {
    'User-Agent': 'GitHub Avatar Downloader - Student Project'}
  };

  request(options, function(err, response, body) {
    if (!err) {
      let parsedBody = JSON.parse(body);
      parsedBody.forEach((avatar) => {
        let login = './avatars/' + avatar.login;
        let avatarURL = avatar.avatar_url;
        downloadImageByURL(avatarURL, login);
    })

    } else {
      console.log('error');
      return;
    }
  })
}

getRepoContributors(repoOwner, repoName, function(err, results){
  console.log('Errors:', err);
  console.log('Results:', results);
});