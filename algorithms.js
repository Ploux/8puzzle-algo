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
        if (this.parent == null) return 0;
        else return (1 + len(this.parent));
    }
    lessThan(other) {
        return (this.pathCost < other.pathCost);
    }
    print() {                                               // print node for testing
            console.log(this.state.slice(0,3));
            console.log(this.state.slice(3,6));
            console.log(this.state.slice(6));
            console.log();
    }
}

function* expand(puzzle, node) {
// expand a node, generating the child nodes
    // console.log("expanding");                   // test

    let s = [...node.state];

    console.log("moves");                           // test
    console.log(puzzle.actions(s));
    for (let action in puzzle.actions(s)) {
        s1 = puzzle.result(s, puzzle.actions(s)[action]);
        console.log(s1);                            // test
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
    // console.log(puzzle.actions(puzzle.initial));     // test
    if (puzzle.isGoal(puzzle.initial)) {    // it's already solved, bro
        return node;
    }

    frontier = new Queue;                   // a new frontier
    frontier.add(node);                     // put the initial puzzle in the frontier queue
    let j = 14;                              // test
    let reached = [JSON.stringify(puzzle.initial)];         // array containing states already reached
    while (j > 0) {
    //while (!frontier.isEmpty()) {
        console.log("Reached");                 // test
        console.log(reached);                   // test
        console.log("Frontier");                // test
        frontier.print();                       // test
        console.log("popping node");        // test
        node = frontier.pop();
        // node.print();                       // test
        //console.log("printed")              // test

        if (puzzle.isGoal(node.state)) {
            return node;
        }
        // else console.log("not the goal");   // test
        //for (let child in expand(puzzle, node)) {
        const newNode = expand(puzzle, node);
        for (let action in puzzle.actions(node.state)) {
            console.log(action);             // test
            let child = newNode.next().value;
            // console.log(JSON.stringify(child.state));                 // test
            // let s = child.state;
            if (reached.indexOf(JSON.stringify(child.state)) == -1) { // || (child.pathCost < reached[child.state].pathCost)) {
                reached.push(JSON.stringify(child.state));
                frontier.add(child);
                console.log("adding");      // test
            }
            else (console.log("been here")); // test

         // console.log(frontier); //test
        }
        j--;                                // test
    }
    return "failure";
}


                   //0  1  2  3  4  5  6  7  8
let p0 = new Puzzle([1, 2, 3, 4, 5, 6, 7, 0, 8], 0);
let p1 = new Puzzle([1, 4, 2, 0, 7, 5, 3, 6, 8], 0);
let p2 = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 0], 0);

// 4 [1, 2, 3, 4, 0, 6, 7, 5, 8]
// 6 [1, 2, 3, 4, 5, 6, 0, 7, 8]
// 8 [1, 2, 3, 4, 5, 6, 7, 8, 0]
/*
console.log(p0.actions(p0.initial));
console.log(JSON.stringify(p0.result(p0.initial, 4)));
console.log(JSON.stringify(p0.result(p0.initial, 6)));
console.log(JSON.stringify(p0.result(p0.initial, 8)));
*/
breadthFirstSearch(p0);

