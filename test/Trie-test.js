const { expect } = require('chai');
const Node = require('../lib/Node')
const Trie = require('../lib/Trie');
require('locus');


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
      // console.log(JSON.stringify(prefixTrie, null, 4))
    });
  
    it('should keep count of words added', () => {
      prefixTrie.insert('hello');
      prefixTrie.insert('world');
      prefixTrie.insert('goodbye');
      
      expect(prefixTrie.wordCount).to.eq(3);   
      // console.log(JSON.stringify(prefixTrie, null, 4))
    });
  
    it('should store first letter in word as child of root', () => {
      prefixTrie.insert('world');

      // console.log(JSON.stringify(prefixTrie, null, 4))
      expect(prefixTrie.root.children.w.data).to.eq("w");
    });

    it('should store next letters as children of the previous child', () => {
      prefixTrie.insert('world');
      
      // console.log(JSON.stringify(prefixTrie, null, 4))

      expect(prefixTrie.root.children.w.data).to.eq('w');
      expect(prefixTrie.root.children.w.children.o.data).to.eq('o');
      expect(prefixTrie.root.children.w.children.o.children.r.data).to.eq('r');
      expect(prefixTrie.root.children.w.children.o.children.r.children.l.data).to.eq('l');
      expect(prefixTrie.root.children.w.children.o.children.r.children.l.children.d.data).to.eq('d');
      
      expect(prefixTrie.wordCount).to.eq(1);
    });
    
    it('shouldn\'t make a new child if one exists', () => {
      prefixTrie.insert('whoa');
      
      prefixTrie.insert('world');
      // console.log(JSON.stringify(prefixTrie, null, 4))
      
      expect(prefixTrie.root.children.w.children.o.children.r.data).to.eq('r');
      expect(prefixTrie.root.children.w.children.h.children.o.data).to.eq('o');
    });

    it('should\'t count duplicate words', () => {
      prefixTrie.insert('whoa');
      
      expect(prefixTrie.wordCount).to.eq(1);
      
      prefixTrie.insert('world');

      expect(prefixTrie.wordCount).to.eq(2);

      prefixTrie.insert('world');

      expect(prefixTrie.wordCount).to.eq(2);
    });
  })

  describe('COUNT', () => {
    it('should return the current word count', () => {
      let number = prefixTrie.count();

      expect(number).to.eq(0);
      
      prefixTrie.insert('world');

      number = prefixTrie.count();

      expect(number).to.eq(1);

    });
  })

  describe('SUGGEST', () => {
    it('should return empty array if input doesn\'t match', () => {
      prefixTrie.insert('hello');
      // console.log(JSON.stringify(prefixTrie, null, 4))

      let autoFill = prefixTrie.suggest('hx');

      expect(autoFill).to.deep.eq([]);
    });

    it('should find a word with a few letters as input', () => {
      prefixTrie.insert('hello');
      prefixTrie.insert('heap');
      prefixTrie.insert('help');
      prefixTrie.insert('heeding');

      let autoFill = prefixTrie.getSuggestions('he', prefixTrie.root);
      // console.log(autoFill)
      expect(autoFill).to.deep.eq(['hello', 'help', 'heap', 'heeding']);


    });

    it.skip('should suggest a word based on fragments of words', () => {
      prefixTrie.insert('hello');
      prefixTrie.insert('happy');
      prefixTrie.insert('world');

      let autoFill = prefixTrie.suggest('hel');
      
      expect(autoFill).to.deep.eq(['hello']);
    });
  });

  describe.skip('POPULATE', () => {
    it('should insert a dictionary\'s worth of words at once', () => {
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
});