!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self)["figma-plugin-boilterplate"]=n()}(this,function(){"use strict";var n=function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}};var t=function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)};var r=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")};var i=function(e){return n(e)||t(e)||r()};var o=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")};function a(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var e=function(e,n,t){return n&&a(e.prototype,n),t&&a(e,t),e};return function(){function n(){o(this,n),this.options=["Alert File Name",this.main.bind(this),null,{shift:!0,option:!0,key:"t"}];var e=window.figmaPlugin;e.createPluginsMenuItem.apply(e,i(this.options)),window.examplePlugin=this}return e(n,[{key:"main",value:function(){var e=window,n=e.App;(0,e.alert)(n.getCurrentFileName())}}]),n}()});
//# sourceMappingURL=figma-plugin-boilerplate.js.map