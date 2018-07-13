const Node = require('../lib/Node')
require(locus);


module.exports = class Trie {
  constructor() {
    this.wordCount = 0;
  }

  insert(word) {
    //break word down to array 
    let array = word.split('');
    console.log(array)

    //loop through array, and
    //compare first index to root children
    while (array.length > 0) {
      console.log(array.shift());
      
    }

    //if does not exist, create child for root named firstLetter
    //if exists, compare root's child's children to secondLetter
    //repeat until all letters are removed from array
    this.wordCount++;
    let node = new Node(word);
    if (!this[word]) {
      this[word] = node;
    }
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

