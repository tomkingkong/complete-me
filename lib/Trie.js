const Node = require('../lib/Node')

module.exports = class Trie {
  constructor() {
    this.wordCount = 0;
  }

  insert(word) {
    //break word down to array 
    let array = word.split('');
    console.log(array)
    //compare first index to root children
    //if does not exist, create child for root named firstLetter
    //if exists, compare root's child's children to secondLetter
    //repeat until all letters are removed from array
    this.wordCount++;
    let node = new Node(word);
    if (!this[word]) {
      this[word] = node;
    }
  }

  breakDown(word) {
    
    
  }

}