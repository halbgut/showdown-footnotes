const converter = new (require('showdown').Converter)()

module.exports = () => [
  {
    type: 'lang',
    filter: text => text.replace(
      /^\[\^([\d\w]+)\] (.+(\n(\s{2,}|\t+).+)*)$/m,
      (str, p1, p2, p3, p4, p5, p6) => `<small class="footnote" id="footnote-${p1}"><a href="#footnote-${p1}"><sup>[${p1}]</sup></a> ${p2.replace(/^\s+/gm, '')}</small>`
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

