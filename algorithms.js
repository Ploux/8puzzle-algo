// inputs: a puzzle

class Puzzle {
/* properties: array of puzzle initial state, integer specifying algorithm to use, max depth if depth limited is chosen
 goal (1, 2, 3, 4, 5, 6, 7, 8, 0)
methods: actions (indexes of squares blank can move to), result (what happens after an action), isGoal (puzzle is solved)


*/

    constructor(initial, algo, depth = 0) {
        this.initial = initial;
        this.algo = algo;
        this.depth = depth;
        this.goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    }
}

class Node {
/* a node in a search tree */

    constructor() {
      this.state = null;
      this.parent = null;
      this.action = null;
      this.path_cost = null;
    }

}

// outputs: array of moves to solve puzzle, (possibly time, or # of nodes expanded etc)