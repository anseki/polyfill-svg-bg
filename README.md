# Polyfill SVG as BG for IE

***Use [polyfillSvgUri](https://github.com/anseki/polyfill-svg-uri) instead of this.***

**This project was altered to [polyfillSvgUri](https://github.com/anseki/polyfill-svg-uri).**

---

Polyfill for IE to set SVG to CSS `background-image`.

The plain SVG without Base64 encoding that is written in the CSS `background-image` is small size, readable and editable.

```css
div {
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><path d="M10,10L32,90L90,32z" fill="lightgreen"/></svg>') center no-repeat;
}
```

But IE ignores it.  
This polyfill solves that problem. It passes encoded SVG to IE.

## Usage

```html
<script src="polyfill-svg-bg.min.js"></script>
```
