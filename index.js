'use strict'

const converter = new (require('showdown').Converter)()

module.exports = () => [
  {
    type: 'lang',
    filter: text => text.replace(
      /^\[\^([\d\w]+)\]:( (.+)|\s*(\n+(\s{2,4}|\t).+)+)$/mg,
      (str, name, rawContent, singleLineContent, multilineContent, padding) => {
        let content
        if (multilineContent) {
          content = converter.makeHtml(removeAll(padding, rawContent))
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

function removeAll (substr, str) {
  const pos = str.indexOf(substr)
  if (pos === -1) return str
  else {
    return removeAll(
      substr,
      str.substring(0, pos) + str.substring(pos + substr.length)
    )
  }
}

