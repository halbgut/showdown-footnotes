module.exports = converter => [
  {
    type: 'lang',
    regex: /\[\^([\d\w]+)\]/,
    replace: match => `<a href="#footnote-${match[1]}"><sup>[${match[1]}]</sup></a>`
  },
  {
    type: 'lang',
    regex: /\^[\^([\d\w]+)\]: (.+)$/,
    filter: match => `<small class="footnote" id="footnote-${match[1]}"><sup>[${match[1]}]</sup>: ${match[2]}</small>`
  }
]

