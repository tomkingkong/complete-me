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
    //start the autofill with the provided letters
    let inputs = [...word];
    let autoFill = [word];

    //set currNode to last letter of autoFill
    let currNode = this.root;
    for (let i = 0; i < inputs.length; i++) {
      currNode = currNode[inputs[i]];
    }

    //return if letters return undefined (dont match)
    if (!currNode) {
      return null;
    }

    //traverse the tree until we reach a endOfWord === true;
    while (currNode) {
      if (!currNode.endOfWord) {

        if (currNode.data !== inputs[inputs.length - 1]) {
          return console.log('different node!')
        } else {
          return Object.keys(currNode).forEach(letter => {
            if (letter !== 'endOfWord' && letter !== 'data') {
              console.log(currNode[letter])
            }
          });
          console.log('same node!')
        }
        //add letter to autoFill word
        //autoFill[0] += letter

        //move currNode to next node
      } else {
        //if it is the end of the word
        return autoFill;

        //or if more words exist..
        //start adding a new word to autoFill[1]
      }
    }
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

