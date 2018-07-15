const Node = require('../lib/Node')
require('locus')

module.exports = class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = new Node();
  }

  count() {
    return this.wordCount;
  }

  insert(word) {
    let letters = [...word];
    let currNode = this.root;

    while (letters.length) {
      let letter = letters[0];
      let node = new Node();

      if (!currNode.children[letter]) {
        currNode.children[letter] = node;
        currNode = currNode.children[letter];
      } else {
        currNode = currNode.children[letter];
      }
      letters.shift();
    }

    if (!currNode.endOfWord) {
      currNode.endOfWord = true;
      this.wordCount++;
    }
    return;
  }

  getSuggestions(word, root) {
    
    let allSuggestions = [];

    suggest(word);

    return allSuggestions;

    function suggest(word) {
      let inputs = [...word];
      let currNode = root;
      
      //set currNode to last letter of inputs
      for (let i = 0; i < inputs.length; i++) {
        if (!currNode) {
          return [];
        }
        currNode = currNode.children[inputs[i]];
      }

      let childKeys = Object.keys(currNode.children);
      
      //base case - currNode is out of children
      if (childKeys < 1) {
        return word;
      }

      childKeys.forEach(key => {
        let newWord = [...word, key].join('');

        if (currNode.children[key].endOfWord) {
          //add word everytime we reach the endOfWord
          allSuggestions.push(newWord);
        } 
        //keep searching
        suggest(newWord);
      });
    }
  }

  populate(words) {
    words.forEach(word => this.insert(word));
  }

  removeWord(word) {
    let inputs = [...word];
    let currNode = this.root;
    
    //set currNode to last letter of inputs
    for (let i = 0; i < inputs.length; i++) {
      if (!currNode) {
        return null;
      }
      currNode = currNode.children[inputs[i]];
    }
    if (currNode.endOfWord) {
      currNode.endOfWord = false;
      this.wordCount--;
    }
    return;
  }
}

