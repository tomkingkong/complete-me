const { expect } = require('chai')
const Node = require('../lib/Node')

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('pizza');
  })

  it('should exist', () => {
    expect(node).to.exist;
  })

  it('should know if it is the end of a word, and be false by default', () => {
    expect(node.endOfWord).to.eq(false)
  })

  it('should have an empty object of children by default', () => {
    expect(Object.keys(node.children).length).to.equal(0);
  })
})
