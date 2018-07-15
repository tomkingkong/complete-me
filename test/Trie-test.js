const { expect } = require('chai');
const fs = require('fs')
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
      let children = Object.keys(prefixTrie.root.children);
      expect(children).to.deep.eq(['w']);

    });

    it('should store next letters as children of the previous child', () => {
      prefixTrie.insert('will');
      
      // console.log(JSON.stringify(prefixTrie, null, 4))
      let childOfRoot = Object.keys(prefixTrie.root.children);

      expect(childOfRoot).to.deep.eq(['w']);

      expect(prefixTrie.wordCount).to.eq(1);
    });
    
    it('shouldn\'t make a new child if one exists', () => {
      prefixTrie.insert('whoa');
      prefixTrie.insert('world');
      prefixTrie.insert('what');

      // console.log(JSON.stringify(prefixTrie, null, 4))
      let numOfRootChildren = Object.keys(prefixTrie.root.children).length;
      let numOfWChildren = Object.keys(prefixTrie.root.children.w.children).length;

      expect(numOfRootChildren).to.eq(1);
      expect(numOfWChildren).to.eq(2);
   
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

      let autoFill = prefixTrie.getSuggestions('hx');

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

    it('should suggest a word based on fragments of words', () => {
      prefixTrie.insert('hello');
      prefixTrie.insert('happy');
      prefixTrie.insert('world');

      let autoFill = prefixTrie.getSuggestions('hel', prefixTrie.root);
      // console.log(autoFill)
      expect(autoFill).to.deep.eq(['hello']);

      autoFill = prefixTrie.getSuggestions('h', prefixTrie.root);
      // console.log(autoFill)
      expect(autoFill).to.deep.eq(['hello', 'happy']);
    });

    it('should suggest words nested in similar words', () => {
      prefixTrie.insert('anna');
      prefixTrie.insert('ann');

      let autoFill = prefixTrie.getSuggestions('an', prefixTrie.root);
      
      expect(autoFill).to.deep.eq(['ann', 'anna']);

      prefixTrie.insert('annabelle');

      autoFill = prefixTrie.getSuggestions('an', prefixTrie.root);

      expect(autoFill).to.deep.eq(['ann', 'anna', 'annabelle']);
      
    });
  });

  describe.skip('POPULATE', () => {
    it('should insert a dictionary\'s worth of words at once', () => {
      const text = "/usr/share/dict/words";
      const dictionary = fs.readFileSync(text).toString().trim().split('\n');

      prefixTrie.populate(dictionary);
      
      let prefixTrieLength = prefixTrie.count();

      expect(dictionary.length).to.eq(prefixTrieLength)
    });
  });

  describe('REMOVE WORD', () => {
    it('should remove a word from being suggested', () => {
      prefixTrie.insert('anna');
      prefixTrie.insert('ann');
      
      let autoFill = prefixTrie.getSuggestions('a', prefixTrie.root);

      expect(autoFill).to.deep.eq(['ann', 'anna']);

      prefixTrie.removeWord('ann');

      autoFill = prefixTrie.getSuggestions('a', prefixTrie.root);

      expect(autoFill).to.deep.eq(['anna']);
    });

    it('should decrement wordCount', () => {
      prefixTrie.insert('anna');
      prefixTrie.insert('ann');

      prefixTrie.removeWord('ann');

      let wordCount = prefixTrie.count();

      expect(wordCount).to.eq(1);
    })
  });
});