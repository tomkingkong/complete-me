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

  // it('should default next to null', () => {
  //   expect(node.next).to.equal(null);
  // })

  // it('should take data and assign it to data prop', () => {
  //   expect(node.data).to.equal('pizza');
  // })
})
