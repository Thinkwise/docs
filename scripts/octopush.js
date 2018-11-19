var octo = require('@octopusdeploy\\octojs');
var glob = require('glob');

if (!process.env.OCTOPUS_CLI_SERVER) {
  throw new Error('Environment variable OCTOPUS_CLI_SERVER must be defined to use the octopush.js script.');
}

if (!process.env.OCTOPUS_CLI_API_KEY) {
  throw new Error('Environment variable OCTOPUS_CLI_API_KEY must be defined to use the octopush.js script.');
}

// Push all zip files in the dist directory to the octopus server.
glob('./dist/*.zip', (err, files) => {
  if (files.length === 0) {
    throw new Error('The dist map either does not exist or contains no packages, make sure to run build and octo:pack before running to octo:push.');
  }

  files.forEach((path) => {
    octo.push(path, {
      server: process.env.OCTOPUS_CLI_SERVER,
      apiKey: process.env.OCTOPUS_CLI_API_KEY,
      replace: true,
      verbose: true
      }, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log(result);
      }
    });
  });
});