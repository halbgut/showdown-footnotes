import test from 'ava'
import showdown from 'showdown'
import footnotes from './index'

const converter = new showdown.Converter({ extensions: [footnotes] })

test('note', t => {
  t.same(
    converter.makeHtml('\n\n[^1test]: The explanation.\n'),
    '<p><small class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a>: The explanation.</small></p>'
  )
})

test('link', t => {
  t.same(
    converter.makeHtml('Some word or something that needs explaining[^test].'),
    '<p>Some word or something that needs explaining<a href="#footnote-test"><sup>[test]</sup></a>.</p>'
  )
})

test('note with inner format', t => {
  t.same(
    converter.makeHtml('\n[^1test]: The _explanation_.\n'),
    '<p><small class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a>: The <em>explanation</em>.</small></p>'
  )
})

test('note with multi-line notes', t => {
  t.same(
    converter.makeHtml('\n[^1test]:\n  some more\n  _lines_\n\n'),
    '<p><small class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a>:<p>some more\n<em>lines</em></p></small></p>'
  )
})

test('note with multi-line notes and multiple paragraphs', t => {
  t.same(
    converter.makeHtml('\n[^1test]:\n\n  some more\n  _lines_\n\nyolo\n'),
    '<p><small class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a>:<p>some more\n<em>lines</em></p></small></p>\n\n<p>yolo</p>'
  )
})

test('multi-line footnote with empty line in between', t => {
  const input =
`
[^1test]:

  some more

  _lines_

yolo
`
  const output =
`<p><small class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a>:<p>some more</p></p>

<p><p><em>lines</em></p></small></p>

<p>yolo</p>`
  t.same(converter.makeHtml(input), output)
})

test('multi-line footnotes with four spaces', t => {
  const input =
`[^1]: 
    This is a footnote that
    is split in two lines.`
  const output = '<p><small class="footnote" id="footnote-1"><a href="#footnote-1"><sup>[1]</sup></a>:<p>This is a footnote that\nis split in two lines.</p></small></p>'
  t.same(converter.makeHtml(input), output)
})

