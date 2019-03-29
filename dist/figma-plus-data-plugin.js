(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['figma-plus-data-plugin'] = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var vhtml = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
    module.exports = factory();
  })(commonjsGlobal, function () {

    var emptyTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

    var esc = function esc(str) {
      return String(str).replace(/[&<>"']/g, function (s) {
        return '&' + map[s] + ';';
      });
    };

    var map = {
      '&': 'amp',
      '<': 'lt',
      '>': 'gt',
      '"': 'quot',
      "'": 'apos'
    };
    var sanitized = {};

    function h(name, attrs) {
      var stack = [];

      for (var i = arguments.length; i-- > 2;) {
        stack.push(arguments[i]);
      }

      if (typeof name === 'function') {
        (attrs || (attrs = {})).children = stack.reverse();
        return name(attrs);
      }

      var s = '<' + name;
      if (attrs) for (var _i in attrs) {
        if (attrs[_i] !== false && attrs[_i] != null) {
          s += ' ' + esc(_i) + '="' + esc(attrs[_i]) + '"';
        }
      }

      if (emptyTags.indexOf(name) === -1) {
        s += '>';

        while (stack.length) {
          var child = stack.pop();

          if (child) {
            if (child.pop) {
              for (var _i2 = child.length; _i2--;) {
                stack.push(child[_i2]);
              }
            } else {
              s += sanitized[child] === true ? child : esc(child);
            }
          }
        }

        s += '</' + name + '>';
      } else {
        s += '>';
      }

      sanitized[s] = true;
      return s;
    }

    return h;
  });
  });

  var getDomNode = function getDomNode(selector) {
    return document.querySelector(selector);
  };
  var createHtmlNodes = function createHtmlNodes(string) {
    return document.createRange().createContextualFragment(string);
  };

  var DataGeneratorPlugin = function DataGeneratorPlugin() {
    var _this = this,
        _window$figmaPlus;

    classCallCheck(this, DataGeneratorPlugin);

    defineProperty(this, "attachEvents", function () {
      // No need to removeEventListeners because
      // the hideUI removes your plugin from the DOM.
      ["#input1", "#input2", "#input3", "#input4"].map(function (id) {
        return getDomNode(id).addEventListener("input", _this.onInteract);
      });
      ["#select1", "#select2"].map(function (id) {
        return getDomNode(id).addEventListener("change", _this.onInteract);
      });
      ["#button1", "#button2", "#button3", "#button4", "#button-secondary", "#button-primary"].map(function (id) {
        return getDomNode(id).addEventListener("click", _this.onInteract);
      });
    });

    defineProperty(this, "showUI", function () {
      // Show the plugin modal using figmaPlugin API.
      window.figmaPlus.showUI(_this.pluginName, function (modalElement) {
        var htmlNodes = createHtmlNodes(_this.UI);
        modalElement.parentNode.replaceChild(htmlNodes, modalElement); // Hookup onInteract to handle all UI events.
        // You can also use a separate handler for each UI element..
        // it's just plain ol javascript.

        _this.attachEvents();
      }, 460, 600, 0.5, 0.5, false, false);
    });

    defineProperty(this, "onInteract", function (event) {
      console.log(event.target.id, event);

      if (event.target.id === "button-primary") {
        window.figmaPlus.hideUI(_this.pluginName);
      }
    });

    this.pluginName = "Data Generator Plugin"; // SETUP PLUGIN

    var shortcut = {
      mac: {
        command: true,
        shift: true,
        key: "G"
      },
      windows: {
        alt: true,
        shift: true,
        key: "G"
      }
    };
    var options = [this.pluginName, this.showUI, null, shortcut];

    (_window$figmaPlus = window.figmaPlus).createPluginsMenuItem.apply(_window$figmaPlus, options);

    window.figmaPlus.createKeyboardShortcut(shortcut, this.showUI); // The UI follows a strict structure to utlize the CSS shipped with this boilerplate
    // But you can freely play with the css in figma-plugin-ui.scss

    this.UI = vhtml("div", {
      class: "figma-plugin-ui"
    }, vhtml("div", {
      class: "scrollable"
    }, vhtml("h2", null, "Section 1"), vhtml("div", {
      class: "field"
    }, vhtml("label", {
      for: "input1"
    }, "Label"), vhtml("input", {
      id: "input1",
      type: "text"
    }), vhtml("p", null, "Help text for input, explain what's the behavior of this input field.")), vhtml("h2", null, "Section 2"), vhtml("div", {
      class: "field-row"
    }, vhtml("label", {
      for: "input2"
    }, "Label"), vhtml("input", {
      id: "input2",
      type: "text"
    })), vhtml("div", {
      class: "field-row"
    }, vhtml("label", {
      for: "input3"
    }, "Label"), vhtml("input", {
      id: "input3",
      type: "text"
    })), vhtml("div", {
      class: "field-row"
    }, vhtml("label", {
      for: "input4"
    }, "Label"), vhtml("input", {
      id: "input4",
      type: "text"
    })), vhtml("h2", null, "Section 3"), vhtml("div", {
      class: "field"
    }, vhtml("label", {
      for: "select1"
    }, "Select"), vhtml("select", {
      id: "select1"
    }, vhtml("option", null, "First"), vhtml("option", null, "Second"), vhtml("option", null, "Third"))), vhtml("div", {
      class: "field"
    }, vhtml("label", {
      for: "select2"
    }, "Select with wrapper"), vhtml("div", {
      class: "select"
    }, vhtml("select", {
      id: "select2"
    }, vhtml("option", null, "First TEST TEST"), vhtml("option", null, "Second"), vhtml("option", null, "Third")))), vhtml("h2", null, "Section 3"), vhtml("div", {
      class: "field-row"
    }, vhtml("button", {
      id: "button1"
    }, "Button 1"), vhtml("button", {
      id: "button2"
    }, "Button 2"), vhtml("button", {
      id: "button3"
    }, "Button 3"), vhtml("button", {
      id: "button4"
    }, "Button 4"))), vhtml("footer", null, vhtml("button", {
      id: "button-secondary"
    }, "Secondary"), vhtml("button", {
      id: "button-primary",
      class: "primary"
    }, "Primary")));
  };
  window.dataGeneratorPlugin = new DataGeneratorPlugin();

  return DataGeneratorPlugin;

}));
