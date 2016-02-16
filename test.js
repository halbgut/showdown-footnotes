import test from 'ava'
import showdown from 'showdown'
import footnotes from './index'

const converter = new showdown.Converter({ extensions: [footnotes] })

test('link', t => {
  const testString = [
    '\n\n[^1test] The explanation.\n',
    '<p><small class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a> The explanation.</small></p>'
  ]
  t.same(
    converter.makeHtml(testString[0]),
    testString[1]
  )
})

test('note', t => {
  const testString = [
    'Some word or something that needs explaining[^test].',
    '<p>Some word or something that needs explaining<a href="#footnote-test"><sup>[test]</sup></a>.</p>'
  ]
  t.same(
    converter.makeHtml(testString[0]),
    testString[1]
  )
})

