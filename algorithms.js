// inputs: a puzzle
// outputs: array of moves to solve puzzle, (possibly time, or # of nodes expanded etc)

class Puzzle {

    constructor(initial, algo, depth = 0) {
        this.initial = initial; // array of puzzle initial state
        this.algo = algo;       // integer specifying algorithm to use
        this.depth = depth;     // max depth if depth-limited is chosen
        this.goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    }

    // test function to display initial board
    print() {
        console.log(this.initial);
        // console.log(this.goal);
        }

    // The indexes of the possible squares that the blank can move to given its location
    actions(state) {
        let moves = [[1, 3], [0, 2, 4], [1, 5], [0, 4, 6], [1, 3, 5, 7], [2, 4, 8], [3, 7], [4, 6, 8], [7, 5]]; // all possible moves
        let blank = state.findIndex(x => x === 0);  // find the blank
        return moves[blank];                        // return possible moves
    }

    // result (what happens after an action)


    // isGoal (is puzzle solved?)
    isGoal(state) {
        return (JSON.stringify(state) == JSON.stringify(this.goal));
    }

}
/*
    def result(self, state, action):
        """Swap the blank with the square numbered `action`."""
        s = list(state)
        blank = state.index(0)
        s[action], s[blank] = s[blank], s[action]
        return tuple(s)

*/

class Node {
/* a node in a search tree */

    constructor() {
      this.state = null;
      this.parent = null;
      this.action = null;
      this.path_cost = null;
    }

}

let p1 = new Puzzle([1, 4, 2, 0, 7, 5, 3, 6, 8], 0);
let p2 = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 0], 0);
// p2.print();
// console.log(p1.initial);
// console.log (p2.actions(p2.initial));
console.log (p1.isGoal(p1.initial));
console.log (p2.isGoal(p2.initial));
// console.log (p2.goal);
