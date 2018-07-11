module.exports = class Node {
  constructor(data, next = null) {
    this.next = next;
    this.data = data;
  }
}