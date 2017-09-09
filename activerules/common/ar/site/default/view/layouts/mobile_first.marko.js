// Compiled using marko@4.4.27 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    mobile_navbar_template = marko_loadTemplate(require.resolve("./components/mobile-navbar")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    mobile_navbar_tag = marko_loadTag(mobile_navbar_template),
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag")),
    login_form_template = marko_loadTemplate(require.resolve("../components/login-form")),
    login_form_tag = marko_loadTag(login_form_template);

function render(input, out) {
  var data = input;

  out.w("<div>");

  mobile_navbar_tag({}, out);

  out.w("</div><div>");

  include_tag({
      _target: input.arViews.core,
      _arg: input
    }, out);

  out.w("</div><div>");

  login_form_tag({}, out);

  out.w("</div>");
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "./components/mobile-navbar",
      "marko/src/taglibs/core/include-tag",
      "../components/login-form"
    ]
  };
