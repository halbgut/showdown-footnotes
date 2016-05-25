'use strict'

const converter = new (require('showdown').Converter)()

module.exports = () => [
  {
    type: 'lang',
    filter: text => text.replace(
      /^\[\^([\d\w]+)\]:( (.+)|(\n+(\s{2,}|\t).+)+)$/mg,
      (str, name, rawContent, singleLineContent, multilineContent) => {
        let content
        if (multilineContent) {
          content = converter.makeHtml(rawContent.replace(/^\s+/gm, ''))
        } else {
          content = ' ' + singleLineContent
        }
        return `<small class="footnote" id="footnote-${name}"><a href="#footnote-${name}"><sup>[${name}]</sup></a>:${content}</small>`
      }
    )
  },
  {
    type: 'lang',
    filter: text => text.replace(
      /\[\^([\d\w]+)\]/m,
      (str, name) => `<a href="#footnote-${name}"><sup>[${name}]</sup></a>`
    )
  }
]

