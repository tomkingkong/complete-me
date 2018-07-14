const Node = require('../lib/Node')
require('locus')

module.exports = class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = new Node(null);
  }

  count() {
    return this.wordCount;
  }

  insert(word) {
    let letters = word.split('');
    let currNode = this.root;

    while (letters.length) {
      let letter = letters[0];
      let node = new Node(letter);

      if (!currNode[letter]) {
        currNode[letter] = node;
        currNode = currNode[letter];
      } else {
        currNode = currNode[letter];
      }
      letters.shift();
    }

    currNode.endOfWord = true;
    this.wordCount++;
  }

  suggest(word) {
    //store completed words in temp array, first index is input
    //start at given letter and traverse letters
    //push letter onto array
    //until letter.endOfWord = true;
  }

  populate(...words) {
    //recursive insert
  }

}

//class node
//this.data = data
//this.left = null
//this.right = null

//class binary search tree
//this.root = null
//
/* 
add() {
  * check your node
  * compare if greater or less than
  * is there a child node in that place?
  * yes? compare to child node (less/greater?)
  * is there a child node in that place?
  * no?
  * create a child node in left or right side, if greater/less
}
*/

