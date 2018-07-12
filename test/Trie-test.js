const { expect } = require('chai');
const Node = require('../lib/Node')
const Trie = require('../lib/Trie');

describe('TRIE', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should start with zero elements', () => {
    expect(trie.length).to.eq(0);
  });

});