// Compiled using marko@4.4.27 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x;

function render(input, out) {
  var data = input;

  out.w(marko_escapeXml(input.form));
}

marko_template._ = render;

marko_template.meta = {};
