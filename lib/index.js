const Trie = require('../lib/Trie');
const Node = require('../lib/Node.js');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

const textInput = document.querySelector('input');
const display = document.querySelector('ul');

const prefixTrie = new Trie();

prefixTrie.populate(dictionary);

textInput.addEventListener('keyup', function() {
  display.innerHTML = `<li>${prefixTrie.getSuggestions(textInput.value, prefixTrie.root)}</li>`
});