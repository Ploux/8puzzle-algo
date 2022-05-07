// inputs: a puzzle
// outputs: array of moves to solve puzzle, (possibly time, or # of nodes expanded etc)

class Puzzle {
/*an 8-puzzle problem */

    constructor(initial, algo, depth = 0) {
        this.initial = initial; // array of puzzle initial state
        this.algo = algo;       // integer specifying algorithm to use
        this.depth = depth;     // max depth if depth-limited is chosen
        this.goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    }

    // display board
    print() {
        console.log(this.initial.slice(0,3));
        console.log(this.initial.slice(3,6));
        console.log(this.initial.slice(6));
        console.log();
        }

    // The indexes of the possible squares that the blank can move to given its location
    actions(state) {
        const moves = [[1, 3], [0, 2, 4], [1, 5], [0, 4, 6], [1, 3, 5, 7], [2, 4, 8], [3, 7], [4, 6, 8], [7, 5]]; // all possible moves
        let blank = state.indexOf(0);   // find the blank
        return moves[blank];            // return possible moves
    }

    // result (swap the blank with the action square)
    result(state, action) {
        let blank = state.indexOf(0);                                   // find the blank
        [state[action], state[blank]] = [state[blank], state[action]];  // swap
        return state;
    }

    // isGoal (is puzzle solved?)
    isGoal(state) {
        return (JSON.stringify(state) == JSON.stringify(this.goal));
    }
}

class Node {
/* a node in a search tree */

    constructor(state, parent = null, action = null, pathCost = 0) {
      this.state = state;           // board position in this state
      this.parent = parent;         // mommy node in the tree that generated this node
      this.action = action;         // action that was applied to mommy to generate this node
      this.pathCost = pathCost;     // total cost of the path from initial state to this node
    }
    len() {
        if (this.parent == null) return 0;
        else return (1 + len(this.parent));
    }
    lessThan(other) {
        return (this.pathCost < other.pathCost);
    }

}

/*
class Queue {
  constructor() {
    this.collection = {};
    this.start = 0;
    this.end = 0;
  }
  print() {
    console.log(this.collection);
  }
  enqueue(val) {
    this.collection[this.end++] = val;
  }
  dequeue() {
    return this.collection[this.start++];
  }
  front() {
    return this.collection[this.start];
  }
  size() {
    return this.end - this.start;
  }
  isEmpty() {
    return this.size() === 0;
  }
}
function PriorityQueue () {
  this.collection = [];
  this.printCollection = function() {
    console.log(this.collection);
  };

  this.enqueue = function(item) {
    let index = this.collection.findIndex(elem => elem[1] > item[1]);
    if (index !== -1) {
      this.collection.splice(index, 0, item);
    } else {
      this.collection.push(item);
    }
  }

  this.dequeue = function() {
    return this.collection.shift()[0];
  }

  this.size = function() {
    return this.collection.length;
  }

  this.isEmpty = function() {
    return this.size() === 0;
  }

  this.front = function() {
    return this.collection[0][0];
  }
}
*/
let p1 = new Puzzle([1, 4, 2, 0, 7, 5, 3, 6, 8], 0);
let p2 = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 0], 0);
// p2.print();
// console.log(p1.initial);
// console.log (p2.actions(p2.initial));
// console.log (p1.isGoal(p1.initial));
// console.log (p2.isGoal(p2.initial));
// console.log (p2.goal);
// p2.print(p2.result(p2.initial, 0));
let n1 = new Node(p1.initial);
console.log(n1);