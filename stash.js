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

class PriorityQueue {
    // adds the nodes with the lowest score first
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


    len() {                                                 // how many moves it took to get here
        if (this.parent == null) return 1;
        else return (1 + this.parent.len());
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
        const newNode = expand(puzzle, node, depth);
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