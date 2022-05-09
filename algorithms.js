// inputs: a puzzle
// outputs: array of moves to solve puzzle, (possibly time, or # of nodes expanded etc)
// There are 9!/2 = 181,400 reachable states in an 8-puzzle

class Puzzle {
/*an 8-puzzle problem */

    constructor(initial, algo, depth = 0) {
        this.initial = initial; // array of puzzle initial state
        this.initialStr = JSON.stringify(this.initial); // string of initial puzzle state
        this.algo = algo;       // integer specifying algorithm to use
        this.depth = depth;     // max depth if depth-limited is chosen
        this.goal = "[1,2,3,4,5,6,7,8,0]";
        // this.goal =  '[1,0,2,7,4,5,3,6,8]'; // testing
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
        const s = [...state]                            // very important line - otherwise we modify the state
        let blank = s.indexOf(0);                       // find the blank
        [s[action], s[blank]] = [s[blank], s[action]];  // swap
        return s;
    }

    // isGoal (is puzzle solved?)
    isGoal(stateStr) {
        return (stateStr == this.goal);
    }
}

class Node {
/* a node in a search tree */

    constructor(state, parent = null, action = null, pathCost = 0, score = 0) {
      this.state = state;           // board position in this state
      this.stateStr = (state == null) ? "null" : JSON.stringify(state);     // string of state
      this.parent = parent;         // mommy node in the tree that generated this node
      this.action = action;         // action that was applied to mommy to generate this node
      this.pathCost = pathCost;     // g(n) total cost of the path from initial state to this node
      this.score = score;           // h(n)
    }
    /* print node for testing */
    print() {
            console.log(this.state.slice(0,3));
            console.log(this.state.slice(3,6));
            console.log(this.state.slice(6));
    }
}

function heuristic(f, node) {
/* 0 = breadth-first
   1 = a* hamming distance
   2 = a* manhattan distance
   3 = depth-first
*/
    switch (f) {
    case 0: return node.pathCost;
            break;

    case 1: hammingDist = 0;
            let goal = [1,2,3,4,5,6,7,8,0];
            for (let i = 0; i <= 8; i++) {
                if (node.state[i] != goal[i]) hammingDist++;
            }
            //console.log(hammingDist);   // test
            return (node.pathCost + hammingDist);
            break;
/*
let p0 = new Puzzle([1, 2, 3, 4, 5, 6, 7, 0, 8], 0);
let p1 = new Puzzle([1, 4, 2, 0, 7, 5, 3, 6, 8], 0);
*/

    case 2: manhattanDist = 0;
            let goalX = [2, 0, 1, 2, 0, 1, 2, 0, 1];
            let goalY = [2, 0, 0, 0, 1, 1, 1, 2, 2];
            let tileX = [0, 1, 2, 0, 1, 2, 0, 1, 2];
            let tileY = [0, 0, 0, 1, 1, 1, 2, 2, 2];
            node.print();
            console.log();
            for (let i = 0; i <= 8; i++) {
                let tile = node.state[i];
                // let tilePos = tileX[i] + tileY[i];
                // let goalPos = goalX[tile] + goalY[tile];
                console.log("tile: " + tile);
                console.log("pos: " + tileX[i] + " " + tileY[i]);
                console.log("goal: " + goalX[tile] + " " + goalY[tile]);
                let md = Math.abs(tileX[i]- goalX[tile]) + Math.abs(tileY[i]- goalY[tile])
                console.log(md);
                manhattanDist += md;
            }
            console.log(node.stateStr);     // test
            console.log("Manhattan Distance: " + manhattanDist); // test
            /*
          //  if (node.parent.stateStr == "[4,1,2,5,0,3,7,8,6]") {  // test
                console.log();  // test
         //    }                // test
            */
            return (node.pathCost + manhattanDist);
            break;

    case 3: return -(node.pathCost);
            break;

    default: return 0;
    }
}

function* expand(puzzle, node, f = 0) {
/* expand a node, generating the child nodes */
    let s = [...node.state];
    for (let action in puzzle.actions(s)) {                 // 1-3 possible moves
        s1 = puzzle.result(s, puzzle.actions(s)[action]);   // the new state after we make that move
        cost = node.pathCost + 1;
        child = new Node(s1, node, action, cost);
        child.score = heuristic(f, child);
        yield (child);
    }
}

function pathStates(node) {
/* the sequence of states to get to this node */
    let paths = ["[1,2,3,4,5,6,7,8,0]"];      // make [] if you don't want the starting state in the array

    if (node.stateStr == "[1,2,3,4,5,6,7,8,0]" ) {
        console.log("Puzzle already solved");
    }
    else {
        while (node.parent != null) {
            paths.unshift(node.stateStr);
            node = node.parent;
        }
        paths.unshift(node.stateStr);
    }
    console.log ("Moves: " + (paths.length - 1));
    return paths;

}

let failure = new Node("failure", pathCost = Infinity);



class Queue {
    // a queue that can be a FIFO or priority
    constructor() {
        this.queue = [];
    }
    isEmpty() {                         // returns true only if no nodes in queue
        return (this.queue.length === 0);
    }
    pop() {                             // removes top node from queue and returns it
        return (this.queue.shift());
    }
    push(node) {                         // inserts node at end of queue
        this.queue.push(node);
    }
    add(node) {                                         // inserts node at proper location
        let inserted = false;
        //console.log("frontier length: " + this.queue.length);                 // test
        for (let i = 0; i < this.queue.length; i++) {
            if (node.score <= this.queue[i].score) {    // lower scores are better
                this.queue.splice(i, 0, node);          // insertion
          //      console.log("inserting");               // test
                inserted = true;
                break;
            }
        }
        if (!inserted) this.queue.push(node);                      // otherwise stick it in back
        //console.log("pushing");                     // test
        //console.log("frontier length: " + this.queue.length);                 // test
    }
    /* print queue scores for testing*/
    printScores() {
        for (let i = 0; i < this.queue.length; i++) {
            process.stdout.write(this.queue[i].score + " ");    // console.log without spaces
        }
        console.log();
    }
    /* print queue for testing */
    print() {
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
    if (puzzle.isGoal(puzzle.initialStr)) {    // it's already solved, bro
        // console.log(0);     // test
        return node;
    }
    frontier = new Queue;                   // a new frontier
    frontier.add(node);                     // put the initial puzzle in the frontier queue
    let reached = [puzzle.stateStr];         // array containing states already reached
    while (!frontier.isEmpty()) {
        node = frontier.pop();                              // take the node that's been in there the longest
        const newNode = expand(puzzle, node);               // create newNode to hold what comes out of generator
        for (let action in puzzle.actions(node.state)) {    // generate one node per possible move
            let child = newNode.next().value;               // generate!
            if (puzzle.isGoal(child.stateStr)) {               // finish as soon as we find a winner
                //console.log ("solved");         // test
                //console.log(node.pathCost);     // test
                return node;
            }
            if (reached.indexOf(child.stateStr) == -1) {   // if we haven't been here before
                reached.push(child.stateStr);              // add state to reached
                frontier.push(child);                                    // add child to frontier
            }
        }
        // console.log("reached: " + reached.length);              // test
    }
    return failure;
}

let reachedDFS = [];         // array containing states already reached

function depthFirstSearch(puzzle, node = null) {
    let first = false;
// depth first search using recursion
    if (node == null) {
        node = new Node(puzzle.initial);
        reachedDFS.push(node.stateStr);
    }
    // console.log(node.stateStr);             // test
    if (puzzle.isGoal(node.stateStr)) {     // solved, bro
        //console.log("solved");              // test
        //console.log(node.pathCost);     // test
        return node;
    }

    else {
        //process.stdout.write("expanding ");       // test
        //console.log(node.stateStr);               // test
        const newNode = expand(puzzle, node);
        for (let action in puzzle.actions(node.state)) {    // generate one node per possible move
            let child = newNode.next().value;               // generate!
            if (reachedDFS.indexOf(child.stateStr) == -1) {   // if we haven't been to the child before
                reachedDFS.push(child.stateStr);               // add state to reached
                result = depthFirstSearch(puzzle, child);
                if (result) return result;
            }
        }
    }
}

function bestFirstSearch(puzzle, f = 0) {
/* search shallowest nodes in the search tree first */
    node = new Node(puzzle.initial);        // start with the initial puzzle
    // console.log("Initial Puzzle");           // test
    // node.print();                           // test

    frontier = new Queue;           // a new frontier
    frontier.add(node);                     // put the initial puzzle in the frontier queue
    // console.log("Initial Frontier");        // test
    // frontier.print();                       // test
    // frontier.printScores();                 // test
    let reached = [puzzle.stateStr];         // array containing states already reached and their scores
    if (puzzle.isGoal(puzzle.initialStr)) {    // check that that the puzzle isn't already solved
        console.log("it's already solved, bro");     // test
        return node;
    }
    while (!frontier.isEmpty()) {
        //console.log("popping node");                // test
        node = frontier.pop();                              // take the node with the lowest score
        //node.print();                                   // test
        const newNode = expand(puzzle, node, f);               // create newNode to hold what comes out of generator
        for (let action in puzzle.actions(node.state)) {    // generate one node per possible move
            let child = newNode.next().value;               // generate!
            if (puzzle.isGoal(child.stateStr)) {               // finish as soon as we find a winner
               // console.log ("solved");         // test
                //console.log(node.pathCost);     // test
                return node;
            }
            if (reached.indexOf(child.stateStr) == -1) {   // if we haven't been here before
                reached.push(child.stateStr);              // add state to reached
                frontier.add(child);                         // add child to frontier
            }
            else {
                for (let i = 0; i < frontier.length; i++) {
                    if ((child.stateStr == frontier[i].stateStr) && (child.score < frontier[i].score)) {   // lower scores are better
                        console.log("cheaper path found");
                        frontier.add(child);
                        break;
                    }
                }
             }
        }
        // console.log("reached: " + reached.length);              // test
    }
    return failure;
}
function breadthBFS(puzzle) {
    return bestFirstSearch(puzzle, 0);
}

function aStarHamming(puzzle) {
    return bestFirstSearch(puzzle, 1);
}

function aStarManhattan(puzzle) {
    return bestFirstSearch(puzzle, 2);
}

function depthBFS(puzzle) {
    return bestFirstSearch(puzzle, 3);
}

                   //0  1  2  3  4  5  6  7  8
let p0 = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 0], 0);
let p1 = new Puzzle([1, 2, 3, 4, 5, 6, 7, 0, 8], 0);
let p2 = new Puzzle([1, 2, 3, 4, 5, 6, 0, 7, 8], 0);
let p3 = new Puzzle([1, 2, 3, 0, 5, 6, 4, 7, 8], 0);
let p4 = new Puzzle([0, 2, 3, 1, 5, 6, 4, 7, 8], 0);

/*
023
156
478

*/

let p7 = new Puzzle([4, 0, 2, 5, 1, 3, 7, 8, 6], 0);
let p20 = new Puzzle([7, 2, 4, 5, 0, 6, 8, 3, 1], 0);
let p23 = new Puzzle([1, 4, 2, 0, 7, 5, 3, 6, 8], 0);
let p31 = new Puzzle([8, 6, 7, 2, 5, 4, 3, 0, 1], 0);

/*
console.log(aStarManhattan(p7));


let paths = (pathStates(aStarHamming(p23)));
let paths = (pathStates(aStarManhattan(p23)));
let paths = (pathStates(depthBFS(p7)));
let paths = (pathStates(breadthBFS(p20)));
*/

let paths = (pathStates(breadthFirstSearch(p7)));
console.log(paths);
