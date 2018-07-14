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

    if (!currNode.endOfWord) {
      currNode.endOfWord = true;
      this.wordCount++;
    }
    return;
  }

  suggest(word) {
    let autoFill = [...word];
    //start traversing at the last letter of the fragment provided
    //find the node!
    let currNode = this.root;

    //set currNode to last letter of autoFill
    for (let i = 0; i < autoFill.length; i++) {
      currNode = currNode[autoFill[i]];
    }
    //return if letters return undefined (dont match)
    if (!currNode) {
      return null
    }

    while (currNode) {
      if (!currNode.endOfWord) {
        
      } else {

      }
      break;
    }
    //store completed words in temp array, first index is input
    //start at given letter and traverse letters
    //push letter onto array
    //until letter.endOfWord = true;
    // console.log(lastLetter)
    return currNode;
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

