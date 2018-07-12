const Node = require('../lib/Node')

module.exports = class Trie {
  constructor() {
    this.wordCount = 0;
  }

  insert(word) {
    this.wordCount++;
    if (!this[word]) {
      this[word] = word;
    }
  }

}