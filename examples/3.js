// Writing your own plugin!

var visit = require('rework-visit');

module.exports = function () {
  return function (stylesheet) {
    // Declarations is an array of CSS properties and their values
    // Rule is an object containing pretty much the stylesheet, or context of it, I think...
    visit(stylesheet, function (declarations, rule) {
      var i = declarations.length;

      // We loop backwards, because we might need to replace stuff in the
      // array. Doing that during a forward loop or with .forEach() is a bad
      // idea because it will mess up your loop.
      for (i; i >= 0; i--) {
        var declaration = declarations[i];
        if (!declaration) continue;

        // Our custom header
        if (declaration.property === 'header') {
          // Extract the color
          var color = declaration.value;

          // Remove the custom property and replace it with a font and the
          // color specified.
          declarations.splice(i, 1, {
            type: 'declaration',
            property: 'font',
            value: 'bold 18px Helvetica, sans-serif'
          }, {
            type: 'declaration',
            property: 'color',
            value: color
          });
        }
      }
    });
  };
};

// --------------------------------------------------------------------------
// IMAGINE THIS IS IN ANOTHER FILE
// --------------------------------------------------------------------------

// Get rework and plugins
var rework = require('rework');
var rework_importer = require('rework-importer');
var rework_variant = require('rework-variant');
var rework_mixins = require('rework-mixins');

// fs for loading stylesheet
var fs = require('fs');

// Process CSS
var str = fs.readFileSync('custom.css', 'utf8');
var css = rework(str)
  .use(rework_importer())
  .use(rework_variant())
  .use(rework.mixin(rework_mixins))
  .use(module.exports()) // <-- This should really be something else.
  .toString();

console.log(css);

