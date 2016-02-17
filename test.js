import test from 'ava'
import showdown from 'showdown'
import footnotes from './index'

const converter = new showdown.Converter({ extensions: [footnotes] })

test('note', t => {
  const testString = [
    '\n\n[^1test] The explanation.\n',
    '<p><small class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a> The explanation.</small></p>'
  ]
  t.same(
    converter.makeHtml(testString[0]),
    testString[1]
  )
})

test('link', t => {
  const testString = [
    'Some word or something that needs explaining[^test].',
    '<p>Some word or something that needs explaining<a href="#footnote-test"><sup>[test]</sup></a>.</p>'
  ]
  t.same(
    converter.makeHtml(testString[0]),
    testString[1]
  )
})

test('note with inner format', t => {
  const testString = [
    '\n[^1test] The _explanation_.\n',
    '<p><small class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a> The <em>explanation</em>.</small></p>'
  ]
  t.same(
    converter.makeHtml(testString[0]),
    testString[1]
  )
})

test('note with multi-line notes', t => {
  const testString = [
    '\n[^1test]\n  some more\n  _lines_\n\n',
    '<p><small class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a><p>some more\n<em>lines</em></p></small></p>'
  ]
  t.same(
    converter.makeHtml(testString[0]),
    testString[1]
  )
})

test('note with multi-line notes and multiple paragraphs', t => {
  const testString = [
    '\n[^1test]\n\n  some more\n  _lines_\n\nyolo\n',
    '<p><small class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a><p>some more\n<em>lines</em></p></small></p>\n\n<p>yolo</p>'
  ]
  t.same(
    converter.makeHtml(testString[0]),
    testString[1]
  )
})

