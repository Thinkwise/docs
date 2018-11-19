var fs = require('fs');
var execFileSync = require('child_process').execFileSync;
var archiver = require('archiver');
var rimraf = require('rimraf');
var path = require('path');

var cwd = process.cwd();

var buildDir = path.join(cwd, 'website', 'build', 'Thinkwise Docs');

if (!fs.existsSync(buildDir)) {
  throw new Error('Build output directory ' + buildDir +  ' does not exist make sure to run build before packing.');
}

////////////////////////
// Versioning         //
////////////////////////

console.log('Running git describe --tag --long to determine current version number.');

var gitDescribe = execFileSync('git', ['describe', '--tag', '--long'], { encoding: 'utf8' }).trim();

console.log('git described version: ' + gitDescribe);

var splitVersion = gitDescribe.split('-');

if (splitVersion.length != 3) {
  throw new Error('Described version is not in the correct output format. Expected 0.0-0-hash but it was: ' + gitDescribe);
}

var packageVersion = splitVersion[0] + '.' + splitVersion[1];

console.log('Determining octopus package version.')

var currentBranchName = '';

if (process.env.BUILD_SOURCEBRANCHNAME) {
  console.log('Running on Azure DevOps agent.');

  if (process.env.BUILD_SOURCEBRANCH.startsWith('refs/tags')) {
    console.log('Building a tag, setting branch name to \'tag\'.');
    currentBranchName = 'tag';
  } else {
    console.log('Using Build.SourceBranchName');
    currentBranchName = process.env.BUILD_SOURCEBRANCHNAME;
  }
} else {
  console.log('Running git rev-parse --abbrev-ref HEAD to get the current branch name.');
  currentBranchName = execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { encoding: 'utf8' }).trim();

  if (currentBranchName === 'HEAD') {
    if (splitVersion[1] === '0') {
      console.log('Building a tag, setting branch name to \'tag\'.');
      currentBranchName = 'tag';
    } else {
      console.log('Building in detached state and not building a tag, setting branch name to \'headless\'.');
      currentBranchName = 'headless';
    }
  }
}

var octoPackageVersion = packageVersion + '-' + currentBranchName.replace('/', '.').replace('_', '.').replace('-', '.');

console.log('Final package version: ' + octoPackageVersion);

////////////////////////
// Packing            //
////////////////////////

var distDir = path.join(cwd, 'dist');

if (fs.existsSync(distDir)) {
  console.log('Deleting directory: ' + distDir);
  rimraf.sync(distDir);
}

console.log('Creating directory: ' + distDir);
fs.mkdirSync(distDir);

var octoPackageArchive = archiver('zip', {
  zlib: { level: 9 }
});

octoPackageArchive.on('warning', err => {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

octoPackageArchive.on('error', err => {
  throw err;
});

var octoPackageArchivePath = path.join(distDir, 'Documentation.' + octoPackageVersion + '.zip');

console.log('Creating octopus package: ' + octoPackageArchivePath);

var octoPackageArchiveStream = fs.createWriteStream(octoPackageArchivePath);

octoPackageArchive.pipe(octoPackageArchiveStream);
octoPackageArchive.directory(buildDir, false);
octoPackageArchive.finalize();