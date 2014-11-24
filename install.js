'use strict';


var packageInfo = require('./package.json'),
    Download = require('download'),
    progress = require('download-status'),
    fs = require('fs');


// TODO(ernesto): Perhaps supporting more precompiled platforms?
var platform = 'linux';
var arch = 'x64';

var remote = 'https://github.com/ernestoalejo/renderer/releases/' +
    'download/v' + packageInfo.version + '/renderer-' + platform + '-' +
    arch + '-v' + packageInfo.version + '.tar.gz';


var download = new Download({extract: true})
  .get(remote)
  .dest('lib/renderer')
  .use(progress());

download.run(function (err) {
  if (err) {
    throw err;
  }

  var folder = 'renderer-' + platform + '-' + arch;
  fs.chmodSync('lib/renderer/' + folder + '/karma', '755');
  // fs.chmodSync('lib/renderer/' + folder + '/seo', '755');

  console.log('Precompiled binary for renderer downloaded successfully!');
});
