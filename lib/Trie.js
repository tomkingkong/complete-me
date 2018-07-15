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
    let letters = [...word.toLowerCase()];
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

  getSuggestions(string, root) {
    let allSuggestions = [];

    searchForWords(string);

    return allSuggestions;

    function searchForWords(string) {
      let letters = [...string];
      let currNode = root;
      
      for (let i = 0; i < letters.length; i++) {
        if (!currNode) {
          return [];
        }
        currNode = currNode.children[letters[i]];
      }

      Object.keys(currNode.children).forEach(currLetter => {
        let newSearch = string + currLetter;

        if (currNode.children[currLetter].endOfWord) {
          allSuggestions.push(newSearch);
        } 
        searchForWords(newSearch);
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

