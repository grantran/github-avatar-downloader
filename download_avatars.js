var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

const GITHUB_USER = 'grantran';
const GITHUB_TOKEN = '7147870fc9cc9e962392e12ef25d036266ee5f73'

function getRepoContributors(repoOwner, repoName, cb) {
  const requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' +
  repoOwner + '/' + repoName + '/contributors';

  const options = {
  url: requestURL,
  headers: {
    'User-Agent': 'GitHub Avatar Downloader - Student Project',
  }
  };


  request(options, function(err, response, body) {
    if (!err) {
      let parsedBody = JSON.parse(body);
      console.log(parsedBody);
    } else {
      console.log('error');
      return;
    }
  })
}

getRepoContributors("jquery", "jquery", function(err, results){
  console.log('Errors:', err);
  console.log('Results:', results);

});