# Showndown Footnotes – 0.1.0

Simply footnotes for Showdown.

## Install

I'd advice using this extension with something like [browserify](https://www.npmjs.com/package/browserify).

```bash
npm i --save showdown-footnotes
```

```js
const converter = new showdown.Converter({ extensions: [footnotes] });
```

## Usage

```md
Some word or something that needs explaining[^1].

[^1] The explanation.
```

That would look compile to this.

```html
<p>Some word or something that needs explaining<a href="#footnote-1"><sup>[1]</sup></a>.</p>

<p><small class="footnote" id="footnote-1"><a href="#footnote-1"><sup>[1]</sup></a> The explanation.</small></p>
```

