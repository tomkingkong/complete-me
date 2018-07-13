const { expect } = require('chai');
const Node = require('../lib/Node')
const Trie = require('../lib/Trie');
require(locus);

describe('TRIE', () => {
  let prefixTrie;

  beforeEach(() => {
    prefixTrie = new Trie();
  });

  it('should start with zero words', () => {
    expect(prefixTrie.wordCount).to.eq(0);
  });

  describe('INSERT', () => {
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
  
    it('should store first letter in word as child of root', () => {
      prefixTrie.insert('world');

      expect(prefixTrie.w.data).to.eq('w');
    });

    it.skip('should store next letters as children of the previous child', () => {
      prefixTrie.insert('world');

      expect(prefixTrie.w.data).to.eq('w');
      expect(prefixTrie.w.o.data).to.eq('o');
      expect(prefixTrie.w.o.r.data).to.eq('r');
      expect(prefixTrie.w.o.r.l.data).to.eq('l');
      expect(prefixTrie.w.o.r.l.d.data).to.eq('d');

      expect(prefixTrie.wordCount).to.eq(1);
    });

    it.skip('shouldn\'t make a new child if one exists', () => {
      prefixTrie.insert('whoa');


      prefixTrie.insert('world');

      expect(prefixTrie.w.o.r.l.d.data).to.eq('d');
      expect(prefixTrie.w.h.o.a.data).to.eq('a');
    });

    describe.skip('SUGGEST', () => {
      it('should suggest a word based on fragments of words', () => {
        prefixTrie.suggest('hel');
        
        //suggests 'hello'
      });
    });

    describe.skip('POPULATE', () => {
      it('should insert a dictionaries worth of words at once', () => {
        prefixTrie.populate(...words);
        //expect to see a ton of words..
      });
    });

    describe.skip('REMOVE WORD', () => {
      it('should remove a word from being suggested', () => {
        prefixTrie.removeWord(word);

        //word doesnt show up on suggestion
      });
    });
  })
});