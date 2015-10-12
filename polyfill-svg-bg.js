/*
 * polyfillSvgBg
 * https://github.com/anseki/polyfill-svg-bg
 *
 * Copyright (c) 2015 anseki
 * Licensed under the MIT license.
 */

;(function(global) {
'use strict';

function polyfillSvgBg() {

  var elements2array = Function.prototype.call.bind(Array.prototype.slice),
    // [^\1] isn't supported by JS
    reUri = new RegExp('\\burl\\((?:(\'|")(.*?)\\1|(.*?))\\)', 'g');

  function convertUri(s, qt, val1, val2) {
    var value = val1 || val2;
    value = value.replace(/^data:(.+?),(.*)$/, function(s, params, content) {
      // data URI scheme
      params = params.split(';');
      if (params.indexOf('image/svg+xml') > -1 && params.indexOf('base64') === -1) {
        // http://ecmanaut.blogspot.com/2006/07/encoding-decoding-utf8-in-javascript.html
        content = global.btoa(global.unescape(global.encodeURIComponent(
          content.replace(/\\(.)/g, '$1')))); // unescape
        params = params.filter(function(param) { return param !== 'utf8'; });
        params.push('charset=utf-8', 'base64');
      }
      return 'data:' + params.join(';') + ',' + content;
    });
    qt = qt || '';
    return 'url(' + qt + value + qt + ')';
  }

  elements2array(document.styleSheets).forEach(function(styleSheet) {
    try {
      elements2array(styleSheet.cssRules).forEach(function(cssRule) {
        var style = cssRule.style, value, i;
        for (i = style.length - 1; i >= 0; i--) {
          if ((value = style.getPropertyValue(style[i]))) {
            style.setProperty(style[i], (value + '').replace(reUri, convertUri));
          }
        }
      });
    } catch (e) {
      global.console.warn('Couldn\'t get cssRules.', e, styleSheet);
    }
  });
}

if (!!document.uniqueID) {
  if (document.readyState === 'complete') {
    polyfillSvgBg();
  } else {
    document.addEventListener('DOMContentLoaded', polyfillSvgBg, false);
  }
}

})(
/* jshint evil:true, newcap:false */
Function('return this')()
/* jshint evil:false, newcap:true */
);
