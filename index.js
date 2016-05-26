'use strict'

const converter = new (require('showdown').Converter)()

module.exports = () => [
  {
    type: 'lang',
    filter: text => text.replace(
      /^\[\^([\d\w]+)\]:( (.+)|\s*(\n+(\s{2,4}|\t).+)+)$/mg,
      (str, name, rawContent, singleLineContent, multilineContent, padding) => {
        if (multilineContent) {
          const content = converter.makeHtml(rawContent.replace(new RegExp(`^${padding}`, 'gm'), ''))
          return `<div class="footnote" id="footnote-${name}"><a href="#footnote-${name}"><sup>[${name}]</sup></a>:${content}</div>`
        } else {
          const content = ' ' + singleLineContent
          return `<small class="footnote" id="footnote-${name}"><a href="#footnote-${name}"><sup>[${name}]</sup></a>:${content}</small>`
        }
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

