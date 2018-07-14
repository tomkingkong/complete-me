const { expect } = require('chai')
const { chai } = expect;
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

  it('should have an empty array of children by default', () => {
    expect(node.children.length).to.equal(0);
  })
})
