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

class Queue {
/* FIFO queue. Used to store the frontier in breadth-first search */
    constructor() {
        this.frontier = [];
    }
    isEmpty() {                         // returns true only if no nodes in frontier
        return this.length() === 0;
    }
    pop() {                             // removes top node from frontier and returns it
        return this.frontier.shift();
    }
    top() {                             // returns (but does not remove) top node of frontier
        return this.frontier[0];
    }
    add(node) {                         // inserts node at end of frontier
        this.frontier.push(node);
    }
}



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