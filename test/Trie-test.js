const { expect } = require('chai');
const Node = require('../lib/Node')
const Trie = require('../lib/Trie');

describe('TRIE', () => {
  let prefixTrie;

  beforeEach(() => {
    prefixTrie = new Trie();
  });

  it('should start with zero words', () => {
    expect(prefixTrie.wordCount).to.eq(0);
  });

  it('should be able to add a word', () => {
    prefixTrie.insert('hello');

    expect(prefixTrie.wordCount).to.eq(1);
  });

  it('should keep track of words added', () => {
    prefixTrie.insert('hello');
    prefixTrie.insert('world');
    prefixTrie.insert('goodbye');

    expect(prefixTrie.wordCount).to.eq(3);   
    // console.log(JSON.stringify(prefixTrie, null, 4))
  });

  it('should store words by creating or adding to children nodes per letter', () => {

  });

});