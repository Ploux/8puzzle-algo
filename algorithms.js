// inputs: a puzzle
// outputs: array of moves to solve puzzle, (possibly time, or # of nodes expanded etc)
// There are 9!/2 = 181,400 reachable states in an 8-puzzle

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
        }

    // The indexes of the possible squares that the blank can move to given its location
    actions(state) {
        const moves = [[1, 3], [0, 2, 4], [1, 5], [0, 4, 6], [1, 3, 5, 7], [2, 4, 8], [3, 7], [4, 6, 8], [7, 5]]; // all possible moves
        let blank = state.indexOf(0);   // find the blank
        return moves[blank];            // return possible moves
    }

    // result (swap the blank with the action square)
    result(state, action) {
        const s = [...state]
        let blank = s.indexOf(0);                                   // find the blank
        [s[action], s[blank]] = [s[blank], s[action]];  // swap
        return s;
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
        if (this.parent == null) return 1;
        else return (1 + this.parent.len());
    }
    print() {                                               // print node for testing
            console.log(this.state.slice(0,3));
            console.log(this.state.slice(3,6));
            console.log(this.state.slice(6));
    }
}

function* expand(puzzle, node) {
// expand a node, generating the child nodes
    // console.log("expanding");                   // test

    let s = [...node.state];

//    console.log("moves");                           // test
//    console.log(puzzle.actions(s));
    for (let action in puzzle.actions(s)) {
        s1 = puzzle.result(s, puzzle.actions(s)[action]);
//        console.log(s1);                            // test
        cost = node.pathCost + 1;
        node1 = new Node(s1, node, action, cost);
       // console.log(JSON.stringify(node1.state));            // test
        yield (node1);
    }
}


class Queue {
/* FIFO queue. Used to store the frontier in breadth-first search */
    constructor() {
        this.queue = [];
    }
    isEmpty() {                         // returns true only if no nodes in queue
        return (this.queue.length === 0);
    }
    pop() {                             // removes top node from queue and returns it
        return (this.queue.shift());
    }
    top() {                             // returns (but does not remove) top node of queue
        return (this.queue[0]);
    }
    add(node) {                         // inserts node at end of queue
        this.queue.push(node);
    }
    print() {                                               // print queue for testing
        for (let i = 0; i < this.queue.length; i++) {
            console.log(this.queue[i].state.slice(0,3));
            console.log(this.queue[i].state.slice(3,6));
            console.log(this.queue[i].state.slice(6));
            console.log();
        }
    }
}

function breadthFirstSearch(puzzle) {
/* search shallowest nodes in the search tree first */
    node = new Node(puzzle.initial);        // start with the initial puzzle
    console.log ("Initial puzzle: ");       // test
    node.print();                           // test
   console.log();                              // test
    if (puzzle.isGoal(puzzle.initial)) {    // it's already solved, bro
        console.log("Already solved");      // test
        return node;
    }
    frontier = new Queue;                   // a new frontier
    frontier.add(node);                     // put the initial puzzle in the frontier queue
//    console.log("Initial Frontier: ")               // test
//    frontier.print();
    let reached = [JSON.stringify(puzzle.initial)];         // array containing states already reached
//    console.log("reached: ");                       // test
//    console.log(reached);                       // test
    console.log();                              // test
    while (!frontier.isEmpty()) {
        node = frontier.pop();
//      console.log ("expanding: ");            // test
//      node.print();                           // test
//      console.log ((puzzle.actions(node.state).length) + " possibilities"); // test
//      console.log();                              // test
        const newNode = expand(puzzle, node);
        for (let action in puzzle.actions(node.state)) {
            let child = newNode.next().value;
//          child.print();

            if (puzzle.isGoal(child.state)) {
                console.log ("solved");         // test
                console.log(node.len());
                return node;
            }
            if (reached.indexOf(JSON.stringify(child.state)) == -1) {
//              console.log("not reached");     // test
                reached.push(JSON.stringify(child.state));
                frontier.add(child);
            }
            else {
//                console.log("reached");     // test
            }
        }
//        console.log();                              // test
        console.log("reached: " + reached.length);              // test
//        console.log(reached.length);                       // test
        //       console.log();                              // test
        //console.log("New Frontier: ")               // test
        //frontier.print();                           // test
    }
    return "failure";
}



                   //0  1  2  3  4  5  6  7  8
let p0 = new Puzzle([1, 2, 3, 4, 5, 6, 0, 7, 8], 0);
let p1 = new Puzzle([1, 4, 2, 0, 7, 5, 3, 6, 8], 0);
let p2 = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 0], 0);
let p3 = new Puzzle([4, 0, 2, 5, 1, 3, 7, 8, 6], 0);
let p4 = new Puzzle([7, 2, 4, 5, 0, 6, 8, 3, 1], 0);
let p5 = new Puzzle([8, 6, 7, 2, 5, 4, 3, 0, 1], 0);

breadthFirstSearch(p3);

