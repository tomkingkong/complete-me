module.exports = class Node {
  constructor(data) {
    this.data = data;
    this.parentIs = null;
    this.endOfWord = false;
  }
}