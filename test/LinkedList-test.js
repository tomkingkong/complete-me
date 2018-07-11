const { expect } = require('chai')
const Node = require('../lib/Node')
const LinkedList = require('../lib/LinkedList')

describe('LINKED LIST', () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  it('should start with zero elements', () => {
    expect(list.length).to.eq(0);
  });

  it('should set its default head to null', () => {
    expect(list.head).to.eq(null);
  });

  describe('UNSHIFT', () => {
    it('should add items to front of list / head', () => {
      list.unshift('duck');
      expect(list.length).to.equal(1)
      expect(list.head.data).to.equal('duck')

      list.unshift('goose');
      expect(list.length).to.equal(2);
      expect(list.head.data).to.equal('goose');
      expect(list.head.next.data).to.equal('duck');

    })
  })

  describe('SHIFT', () => {
    it('should return null if nothing in the list', () => {
      let result = list.shift();

      expect(result).to.equal(null);
    })

    it('should return the first item in the list', () => {
      list.unshift('duck');

      expect(list.length).to.equal(1);
      expect(list.head.data).to.equal('duck');

      let result = list.shift();

      expect(list.length).to.equal(0);
      expect(result.data).to.equal('duck');
    })

    it('should remove items from the front of list / head', () => {

      list.unshift('duck');
      list.unshift('goose');
      expect(list.head.data).to.equal('goose');
      expect(list.head.next.data).to.equal('duck');
      // console.log(JSON.stringify(list, null, 4));

      // remove goose from list
      let result = list.shift();
      expect(result.data).to.equal('goose')

      // duck should now be back at the start of the list
      expect(list.head.data).to.equal('duck')

      // remove duck from list
      result = list.shift();

      expect(result.data).to.equal('duck')

      // no more items in our list
      expect(list.head).to.equal(null)
    })
  })

  describe('PUSH', () => {
    it('should push a single element to a list', () => {
      list.push('duck');
      expect(list.head.data).to.eq('duck');
    });

    it('should increment the length of the list', () => {
      list.push('duck');
      expect(list.length).to.eq(1);
    });

    it('should assign the head to the first element pushed', () => {
      expect(list.head).to.eq(null);

      list.push('duck');
      expect(list.head.data).to.eq('duck');

      list.push('goose');
      expect(list.head.data).to.eq('duck');
    });

    it('should attach the second element to the first element', () => {
      list.push('duck');
      list.push('swan');
      expect(list.head.data).to.eq('duck');
      expect(list.head.next.data).to.eq('swan');
    });

    it('should attach nexts in sequential order', () => {
      list.push('duck');
      list.push('goose');
      list.push('swan');
      list.push('southern screamer');
      expect(list.head.data).to.eq('duck');
      expect(list.head.next.data).to.eq('goose');
      expect(list.head.next.next.data).to.eq('swan');
      expect(list.head.next.next.next.data).to.eq('southern screamer');
      // console.log(JSON.stringify(list, null, 4));
    });
  });

  describe('POP', () => {
    it('should return null if nothing in list', () => {
      expect(list.length).to.eq(0);
      expect(list.pop()).to.eq(null);
    });

    it('should not decrement the length if there are no nodes', () => {
      list.pop()
      expect(list.length).to.eq(0);
    });

    it('should change the length', () => {
      list.push('duck');

      expect(list.length).to.eq(1)

      let result = list.pop();

      expect(list.length).to.eq(0);
    });

    it('should set the list head to null when there is only one node', () => {
      list.push('duck');
      let result = list.pop();

      expect(list.head).to.eq(null);
    });

    it('should return the last element', () => {
      list.push('duck');
      const result = list.pop();

      expect(result.data).to.eq('duck');
    });

    it('should remove the last element from the list', () => {
        list.push("duck");
        list.push("goose");
        list.push("swan");

        const output = list.pop();
        expect(output.data).to.eq('swan');
        expect(list.length).to.eq(2);

        const output2 = list.pop();
        expect(output2.data).to.eq('goose');
        expect(output2.next).to.eq(null);
        expect(list.length).to.eq(1);

        const output3 = list.pop();
        expect(output3.data).to.eq('duck');
        expect(output3.next).to.eq(null);
        expect(list.length).to.eq(0);
      });
  });

  describe('FIND', () => {
    beforeEach(() => {
      list.push('oh');
      list.push('hello');
      list.push('world');
    });

    it('should return the node if it is found', () => {
      const result = list.find('hello');

      expect(result.data).to.eq('hello');
      expect(result.next.data).to.eq('world');
    });

    it('should return null if node is missing', () => {
      const result = list.find("nope");

      expect(result).to.eq(null);
    });
  });

  describe('DELETE', () => {
    it('deletes a solo node', () => {
      list.push('hello');
      list.delete('hello');
      expect(list.length).to.eq(0);
      expect(list.head).to.eq(null);
    });

    it('does not perform a delete when a node does not match', () => {
      list.push('hello');
      list.delete('goodbye');
      expect(list.length).to.eq(1);
      expect(list.head.data).to.eq('hello');
    });

    context('with more elements', () => {
      beforeEach(() => {
        list.push('hello');
        list.push('darkness');
        list.push('my');
        list.push('old');
        list.push('friend');
      });

      it('changes the list length', () => {
        expect(list.head.next.data).to.eq('darkness');
        expect(list.length).to.eq(5);

        list.delete('friend');
        expect(list.length).to.eq(4);
        list.delete('my');
        expect(list.length).to.eq(3);
        list.delete('happy');
        expect(list.length).to.eq(3);
      });

      it('resets the next property on the node before the deleted node', () => {
        expect(list.head.next.data).to.eq('darkness');

        list.delete('darkness');

        expect(list.head.next.data).to.eq('my');

        list.delete('my')

        expect(list.head.next.data).to.eq('old')
      });

      it('resets the list.head if deleting the first node', () => {
        expect(list.head.data).to.eq('hello');
        list.delete('hello');
        expect(list.head.data).to.eq('darkness');
      });

    })
  });

  describe('TO ARRAY', () => {
    it('converts to an array', () => {
      expect(list.toArray()).to.deep.equal([]);
    });

    context('when there are several elements', () => {
      beforeEach(() => {
        list.push('The');
        list.push('rain');
        list.push('in');
        list.push('Spain');
      });

      it('can convert to an array', () => {
        expect(list.toArray()).to.deep.equal(['The', 'rain', 'in', 'Spain']);
      });
    });
  });

  describe.skip('INCLUDES', () => {
    beforeEach(() => {
      list.push('The');
      list.push('rain');
      list.push('in');
      list.push('Spain');
    });

    it('should return true if node is in list', () => {
      expect(list.include("rain")).to.eq(true);
    });

    it('should return false if node is not in list', () => {
      expect(list.include("nope")).to.eq(false);
    });
  });

  describe.skip('INDEX', () => {
    beforeEach(() => {
      list.push('oh');
      list.push('hello');
      list.push('world');
    });

    it('should return expected indexes', () => {
      expect(list.index('oh')).to.eq(0);
      expect(list.index('world')).to.eq(2);
      expect(list.index('nope')).to.eq(null);
    });
  });

  describe('INSERT', () => {
    beforeEach(() => {
      list.push('dark');
      list.push('stormy');
    });

    it('should insert nodes', () => {
      expect(list.length).to.eq(2);
      list.insert(1, 'and');
      list.insert(3, 'night');
      expect(list.length).to.eq(4);
      expect(list.toArray()).to.deep.equal(['dark', 'and', 'stormy', 'night']);
    });
  });

  describe.skip('INSERT AFTER', () => {
    beforeEach(() => {
      list.push('dark');
      list.push('stormy');
    });

    it('should insert nodes after other nodes', () => {
      expect(list.length).to.eq(2);
      list.insertAfter('dark', 'and');
      list.insertAfter('stormy', 'night');
      expect(list.length).to.eq(4);
      expect(list.toArray()).to.deep.equal(['dark', 'and', 'stormy', 'night']);
    });
  });

  describe.skip('DISTANCE', () => {
    beforeEach(() => {
      list.push("hello")
      list.push("pizza")
      list.push("world")
      list.push("today")
      list.push("tomorrow")
    });

    it('should calculate distance between nodes', () => {
      expect(list.distance("hello", "today")).to.eq(3);
      expect(list.distance("pizza", "today")).to.eq(2);
      expect(list.distance("hello", "world")).to.eq(2);
      expect(list.distance("hello", "tomorrow")).to.eq(4);
      expect(list.distance("world", "today")).to.eq(1);
    });
  });
});
