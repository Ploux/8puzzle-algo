# 8puzzle-algo
Javascript algorithms for solving an 8-puzzle


## Python version

**Moves per Algorithm**

| **Algorithm**                   | **e1** | **e2** | **e3** | **e4** | **e5** |
|---------------------------------|--------|--------|--------|--------|--------|
| **Breadth First - Best First**  | 23     | 0      | 7      | 20     | 31     |
| **Breadth First**               | 23     | 0      | 7      | 20     | 31     |
| **Depth First**                 | re     | 0      | re     | re     | re     |
| **Depth Limited (10)**          | -1     | 0      | 7      | -1     | -1     |
| **Depth Limited (20)**          | -1     | 0      | 17     | 20     | -1     |
| **Depth Limited (25)**          | 23     | 0      | 21     | 24     | -1     |
| **Depth Limited (31)**          | 31     | 0      | 31     | 30     | 31*    |
| **Iterative Deepening**         | 23     | 0      | 7      | 20     | ?*     |
| **A-star (misplaced tiles)**    | 41     | 0      | 7      | 106    | 103    |
| **A-star (Manhattan distance)** | 31     | 0      | 7      | 106    | 103    |

e1 = EightPuzzle((1, 4, 2, 0, 7, 5, 3, 6, 8))\
e2 = EightPuzzle((1, 2, 3, 4, 5, 6, 7, 8, 0)) // already at goal\
e3 = EightPuzzle((4, 0, 2, 5, 1, 3, 7, 8, 6)) // easy one\
e4 = EightPuzzle((7, 2, 4, 5, 0, 6, 8, 3, 1))\
e5 = EightPuzzle((8, 6, 7, 2, 5, 4, 3, 0, 1)) // max optimal solution is 31 moves

re: recursion depth reached\
-1: hit limit before finding solution\
\*: take a long-ass time
