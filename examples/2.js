var express = require('express');
var app = express();

// Get rework and plugins
var rework = require('rework');
var rework_importer = require('rework-importer');
var rework_variant = require('rework-variant');
var rework_mixins = require('rework-mixins');

// fs for loading stylesheet
var fs = require('fs');

// Don't load CSS on each page load
var str = fs.readFileSync('style.css', 'utf8');

// Serve CSS
app.get('/css', function (req, res) {
  // You probably want to cache this in a production environment
  // During dev it's nice to have it relaod on each page load though
  var css = rework(str)
    .use(rework_importer())
    .use(rework_variant())
    .use(rework.mixin(rework_mixins))
    .toString();

  res.end(css);
});

app.listen(1337);

