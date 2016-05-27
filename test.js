import test from 'ava'
import showdown from 'showdown'
import footnotes from './index'

const converter = new showdown.Converter({ extensions: [footnotes] })

; [ [ /************************ START TEST ***************************/
'Simple, single line footnote',
`

[^1test]: The explanation.
`,
'<p><small class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a>: The explanation.</small></p>'
  ]

, [ /************************ START TEST ***************************/
'Reference to footnote',
'Some word or something that needs explaining[^test].',
'<p>Some word or something that needs explaining<a href="#footnote-test"><sup>[test]</sup></a>.</p>'
  ]

, [ /************************ START TEST ***************************/
'note with inner format',
`
[^1test]: The _explanation_.
`,
'<p><small class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a>: The <em>explanation</em>.</small></p>'
  ]

, [ /************************ START TEST ***************************/
'note with multi-line notes',
`
[^1test]:
  some more
  _lines_

`,
`<div class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a>:<p>some more
<em>lines</em></p></div>`
  ]

, [ /************************ START TEST ***************************/
'note with multi-line notes and multiple paragraphs',
`
[^1test]:

  some more
  _lines_

yolo
`,
`<div class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a>:<p>some more
<em>lines</em></p></div>

<p>yolo</p>`
  ]

, [ /************************ START TEST ***************************/
'multi-line footnote with empty line in between',
`
[^1test]:

  some more

  _lines_

yolo
`,
`<div class="footnote" id="footnote-1test"><a href="#footnote-1test"><sup>[1test]</sup></a>:<p>some more</p>

<p><em>lines</em></p></div>

<p>yolo</p>`
  ]

, [ /************************ START TEST ***************************/
'multi-line footnotes with four spaces',
`[^1]: 
    This is a footnote that
    is split in two lines.`,
'<div class="footnote" id="footnote-1"><a href="#footnote-1"><sup>[1]</sup></a>:<p>This is a footnote that\nis split in two lines.</p></div>'
  ]

, [ /************************ START TEST ***************************/
'multi-line footnotes with code snippet',
`
[^code]:
        Coooode`,
`<div class="footnote" id="footnote-code"><a href="#footnote-code"><sup>[code]</sup></a>:<pre><code>Coooode
</code></pre></div>`
  ]

, [ /************************ START TEST ***************************/
'multi-line footnotes with embedded code snippet',
`[^code]:
    yoo

        Coooode`,
`<div class="footnote" id="footnote-code"><a href="#footnote-code"><sup>[code]</sup></a>:<p>yoo</p>

<pre><code>Coooode
</code></pre></div>`
  ]
, [ /************************ START TEST ***************************/
'Single line comments in multiple lines',
`[^singleline]: single
line
comment
`,
`<p><small class="footnote" id="footnote-singleline"><a href="#footnote-singleline"><sup>[singleline]</sup></a>: single
line
comment</small></p>`
  ]
]
  .forEach(([ comment, input, output ]) => {
    test(comment, t => {
      t.same(converter.makeHtml(input), output)
    })
  })

