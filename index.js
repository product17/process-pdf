const fs = require('fs');
const pdf = require('html-pdf');
const async = require('async');


function noDot (val) {
  return !val.match(/^\./);
}

fs.readdir('./html-files', function (err, files) {
  if (err) {
    console.error(err);
    return;
  }

  const list = files.filter(noDot).map(function (val) {
    return function (callback) {
      fs.readFile('./html-files/' + val, 'utf8', function (err, html) {
        pdf.create(html, {format: 'Letter'}).toFile('./pdf-files/' + val.replace('.html', '.pdf'), function (err, res) {
          if (err) {
            callback(err);
          } else {
            callback(null, res);
          }
        });
      });
    }
  });

  async.parallel(list, function (err, results) {
    console.log('All Done');
    console.log(results);
  });
});

// const html = fs.readFileSync('./test/businesscard.html', 'utf8');
// const options = { format: 'Letter' };
//
// pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
//   if (err) return console.log(err);
//   console.log(res); // { filename: '/app/businesscard.pdf' }
// });
