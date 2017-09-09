// Compiled using marko@4.4.27 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    components_helpers = require("marko/src/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/activerules$1.0.0/common/ar/site/default/view/components/login-form/index.marko", function() {
      return module.exports;
    }),
    marko_component = require("./component"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_attr = marko_helpers.a;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<form" +
    marko_attr("id", __component.id) +
    "><label for=\"login\">Login</label><input type=\"text\" name=\"login\"><button" +
    marko_attr("data-marko", {
      onclick: __component.d("onButtonClick", [
          "Finally"
        ])
    }, false) +
    ">Login</button></form>");
}

marko_template._ = marko_renderer(render, {
    type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      "./style.css",
      {
          type: "require",
          path: "./"
        }
    ]
  };
