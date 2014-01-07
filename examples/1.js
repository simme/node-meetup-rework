// Get rework and plugins
var rework = require('rework');
var rework_importer = require('rework-importer');
var rework_variant = require('rework-variant');
var rework_mixins = require('rework-mixins');

// fs for loading stylesheet
var fs = require('fs');

// Process CSS
var str = fs.readFileSync('style.css', 'utf8');
var css = rework(str)
  .use(rework_importer())
  .use(rework_variant())
  .use(rework.mixin(rework_mixins))
  .toString();

console.log(css);

