import test from 'ava'
import showdown from 'showdown'
import footnotes from './index'

const converter = new showdown.Converter({ extensions: [footnotes] })

const testString = [
`
Some word or something that needs explaining[^1].

[^1]: The explanation.
`,
`<p>Some word or something that needs explaining<a href="#footnote-1"><sup>[1]</sup></a>.</p>

<p><small class="footnote" id="footnote-1"><sup>[1]</sup>: The explanation.</small></p>`
]

test('main', t => {
  t.same(converter.makeHtml(testString[0]), testString[1])
})

