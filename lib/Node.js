module.exports = class Node {
  constructor(data) {
    this.data = data;
    this.children = [];
    this.endOfWord = false;
  }
}