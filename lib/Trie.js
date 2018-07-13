const Node = require('../lib/Node')
require('locus')

module.exports = class Trie {
  constructor() {
    this.wordCount = 0;
  }

  count() {
    return this.wordCount;
  }

  insert(word) {
    //break word down to array 
    let letters = word.split('');

    //loop through array
    while (letters.length > 0) {
      //compare first index to root children
      let letter = letters.shift();

      //if does not exist, create child for root named 'letter'
      if (!this[letter]) {
        this[letter] = new Node(letter);
      } else {

      }
      //if exists, compare root's child's children to secondLetter
      
      //repeat until all letters are removed from array
      
    }
    //increase word count, if word doesn't exist
    this.wordCount++;
  }

  suggest(word) {

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

