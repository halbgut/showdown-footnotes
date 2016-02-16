module.exports = converter => [
  {
    type: 'lang',
    filter: text => text.replace(
      /^\[\^([\d\w]+)\] (.+)$/m,
      (str, p1, p2) => `<small class="footnote" id="footnote-${p1}"><a href="#footnote-${p1}"><sup>[${p1}]</sup></a> ${p2}</small>`
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

