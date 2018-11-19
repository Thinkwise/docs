var octo = require('@octopusdeploy\\octojs');
var glob = require('glob');
var argv = require('yargs').argv;

if (process.env.OCTOPUS_CLI_SERVER) {
  var octopusServer = process.env.OCTOPUS_CLI_SERVER;
} else if (argv.octopusServer) {
  var octopusServer = argv.octopusServer;
}

if (!octopusServer) {
  throw new Error('No Octopus Deploy server specified. Set environment variable OCTOPUS_CLI_SERVER or pass --octopusServer=<value> to use the octopush.js script.');
}

if (process.env.OCTOPUS_CLI_API_KEY) {
  var octopusApiKey = process.env.OCTOPUS_CLI_API_KEY;
} else if (argv.octopusApiKey) {
  var octopusApiKey = argv.octopusApiKey;
}

if (!octopusApiKey) {
  throw new Error('No Octopus Deploy API key specified. Set environment variable OCTOPUS_CLI_API_KEY or pass --octopusApiKey=<value> to use the octopush.js script.');
}

// Push all zip files in the dist directory to the octopus server.
glob('./dist/*.zip', (err, files) => {
  if (files.length === 0) {
    throw new Error('The dist map either does not exist or contains no packages, make sure to run build and octo:pack before running to octo:push.');
  }

  files.forEach((path) => {
    octo.push(path, {
      server: octopusServer,
      apiKey: octopusApiKey,
      replace: true,
      verbose: true
      }, (err, result) => {
        if (err) {
          throw new Error(err.body.Errors);
        } else {
          console.log(result);
      }
    });
  });
});