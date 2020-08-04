'use strict'

const converter = new (require('showdown').Converter)()

module.exports = () => [
  {
    type: 'lang',
    filter: text => text.replace(
      /^\[\^([\d\w]+)\]:\s*((\n+(\s{2,4}|\t).+)+)$/mg,
      (str, name, rawContent, _, padding) => {
        const content = converter.makeHtml(rawContent.replace(new RegExp(`^${padding}`, 'gm'), ''))
        return `<div class="footnote" id="footnote-${name}"><a href="#footnote-${name}"><sup>[${name}]</sup></a>:${content}</div>`
      }
    )
  },
  {
    type: 'lang',
    filter: text => text.replace(
      /^\[\^([\d\w]+)\]:( |\n)((.+\n)*.+)$/mg,
      (str, name, _, content) =>
        `<small class="footnote" id="footnote-${name}"><a href="#footnote-${name}"><sup>[${name}]</sup></a>: ${content}</small>`
    )
  },
  {
    type: 'lang',
    filter: text => text.replace(
      /\[\^([\d\w]+)\]/mg,
      (str, name) => `<a href="#footnote-${name}"><sup>[${name}]</sup></a>`
    )
  }
]

