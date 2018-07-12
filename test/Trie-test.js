const { expect } = require('chai');
const Node = require('../lib/Node')
const Trie = require('../lib/Trie');

describe('TRIE', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should start with zero words', () => {
    expect(trie.wordCount).to.eq(0);
  });

});