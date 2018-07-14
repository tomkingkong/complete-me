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
    let letters = [...word];
    let currNode = this.root;

    while (letters.length) {
      let letter = letters[0];
      let node = new Node(letter);

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

     function suggest(word) {
        //start the autofill with the provided letters
        let inputs = [...word];
        let autoFill;
        //start currNode at the root
        let currNode = root;
        //set currNode to last letter of inputs
        for (let i = 0; i < inputs.length; i++) {
          currNode = currNode.children[inputs[i]];
          //return if letters return undefined (dont match)
          if (!currNode) {
            return [];
          }
        }
    
        if (currNode.endOfWord) {
          return autoFill
        }
        
        let childKeys = Object.keys(currNode.children);
        childKeys.forEach(key => {
          let newWord = [...word, key].join('');
          if (currNode.children[key].endOfWord) {
    
            autoFill = newWord;
            return;
          } else {
            suggest(newWord);
          }
        })
        if (autoFill !== undefined) {
          allSuggestions.push(autoFill);
        }
      }
    
    
    suggest(word);
    // allSuggestions.push(...suggest(word));
      
    return allSuggestions;

  }

  suggest(word) {
    //start the autofill with the provided letters
    let inputs = [...word];
    
    //start currNode at the root
    let currNode = this.root;
    //set currNode to last letter of inputs
    for (let i = 0; i < inputs.length; i++) {
      currNode = currNode.children[inputs[i]];
      //return if letters return undefined (dont match)
      if (!currNode) {
        return [];
      }
    }

    if (currNode.endOfWord) {
      return autoFill
    }
    
    let childKeys = Object.keys(currNode.children);
    
    while (childKeys.length > 0) {
      childKeys.forEach(key => {
        let newWord = [...word, key].join('');
        if (currNode.children[key].endOfWord) {
  
         let autoFill = [newWord];
         console.log(autoFill)
         return autoFill;
        } else {
          this.suggest(newWord);
        }
      })
      break;
    }
    // console.log('end of function: ', autoFill)
    // return autoFill;
    // return
  }
  
  populate(...words) {
    //recursive insert
  }
}

