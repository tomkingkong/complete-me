const Node = require('../lib/Node')

module.exports = class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  push(data) {
    this.length++;

    if (!this.head) {
      this.head = new Node(data);
    } else {
      let currNode = this.head;

      while (currNode.next) {
        currNode = currNode.next;
      }

      currNode.next = new Node(data);
    }
  }

  pop() {
    if (!this.head) {
      return null;
    }

    if (this.length === 1) {
      let node = this.head;
      this.head = null;
      this.length--;
      return node;
    }

    let currNode = this.head;
    let prevNode = this.head;

    while(currNode.next) {
      prevNode = currNode;
      currNode = currNode.next;
    }

    prevNode.next = null;
    this.length--;

    return currNode;
  }

  find(data) {
    let foundNode = null;
    let currNode = this.head;

    while (currNode) {
      if (currNode.data === data) {
        foundNode = currNode;
        break;
      } 
      currNode = currNode.next;
    }
    return foundNode;
  }

  toArray() {
    let array = []
    let currNode = this.head;

    while (currNode) {
      array.push(currNode.data);
      currNode = currNode.next;
    }
    return array;
  }

  insert(index, data) {
    let currNode = this.head;
    let currPos = 0;
    let node = new Node(data);
    
    while (currPos < index - 1) {
      currNode = currNode.next;
      currPos++;
    }

    node.next = currNode.next;
    currNode.next = node;

    this.length++;
  }

  unshift(data) {
    let currNode = this.head;
    let node = new Node(data);

    node.next = currNode;

    this.head = node;

    this.length++;
  }

  shift() {
    if (!this.head) {
      return null;
    }

    let node = this.head;
    let secondNode = this.head.next;

    this.head = secondNode;

    this.length--;

    return node;
  }

  delete(data) {
    let currNode = this.head;
    let prevNode;

    while (currNode) {
      if (currNode.data === data) {
        if (currNode === this.head) {
          this.head = currNode.next;
        } else {
          prevNode.next = currNode.next;
        }
        this.length--;
        return;
      }
      prevNode = currNode;
      currNode = currNode.next;
    }
    return;
  }

  includes(data) {
    let currNode = this.head;
    while (currNode) {
      if (currNode.data === data) {
        return true;
      }
      currNode = currNode.next;      
    }
    return false;
  }

  index(data) {
    let currNode = this.head;
    let index = 0;
    while (currNode) {
      if (currNode.data === data) {
        return index;
      }
      index++;
      currNode = currNode.next;      
    }
    return null;
  }

  insertAfter(oldNode, data) {
    let currNode = this.head;
    let newNode = new Node(data);
    
    while (currNode) {
      if (currNode.data === oldNode) {
        newNode.next = currNode.next;
        currNode.next = newNode;
        this.length++;
        return;
      }
      currNode = currNode.next;
    }
    return;
  }

  distance(nodeA, nodeB) {
    let distance = 0;
    let currNode = this.head;

    while (currNode) {
      if (currNode.data === nodeA) {
        while (currNode.data !== nodeB) {
          distance++;
          currNode = currNode.next;
        }
        return distance;
      }
      currNode = currNode.next;
    }
    return;
  }

  setChildNode() {
    
  }
}
