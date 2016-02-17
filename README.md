# Showndown Footnotes – 1.0.0

![CI build status](https://travis-ci.org/Kriegslustig/showdown-footnotes.svg?branch=master)

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

[^1]: The explanation.
```

That would look compile to this.

```html
<p>Some word or something that needs explaining<a href="#footnote-1"><sup>[1]</sup></a>.</p>

<p><small class="footnote" id="footnote-1"><a href="#footnote-1"><sup>[1]</sup></a>: The explanation.</small></p>
```

Shownotes-footnotes also supports multi-line footnotes. You'll just need to indent the lines following the superscript.

```md
[^5]:
  This is a paragraph.

  _That_ is another paragraph which is still within the same footnote.
```

