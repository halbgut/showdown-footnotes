'use strict'

const converter = new (require('showdown').Converter)()

module.exports = () => [
  {
    type: 'lang',
    filter: text => text.replace(
      /^\[\^([\d\w]+)\]( (.+)|(\n+(\s{2,}|\t).+)+)$/mg,
      (str, p1, p2, p3, p4) => {
        let content
        if(p4) {
          content = converter.makeHtml(p2.replace(/^\s+/gm, ''))
        } else {
          content = ' ' + p3
        }
        return `<small class="footnote" id="footnote-${p1}"><a href="#footnote-${p1}"><sup>[${p1}]</sup></a>${content}</small>`
      }
    ),
  },
  {
    type: 'lang',
    filter: text => text.replace(
      /\[\^([\d\w]+)\]/m,
      (str, p1) => `<a href="#footnote-${p1}"><sup>[${p1}]</sup></a>`
    )
  }
]

