import Trie from "./lib/Trie";

var prefixTrie = new Trie();

// NEEDED:
//1. insert
//2. suggest
//3. require

//insert all of the letters into the trie
//find a way to stop at the correct count! anna (4) vs ann (3)
prefixTrie.insert("hello");

prefixTrie.count();
=> 1

prefixTrie.insert('world');

prefixTrie.count();
=> 2




prefixTrie.suggest('he');
=> ['hello']

prefixTrie.insert("hellen");

prefixTrie.suggest("he");
=> ["hello", "hellen"]

prefixTrie.suggest('w');
=> ["world"]