let swaps = 0
let P = [2,1,6,0,3,4,7,5,8];
console.log(P);
let zero = P.findIndex(elem => elem == 0);
if (zero != 8){
    console.log("Moving 0 to end");
    [P[8], P[zero]] = [P[zero], P[8]];
    swaps ++;
    console.log(P);
    console.log(swaps);
}
for (let i = 1; i <= 7; i++) {
    console.log("Looking for " + i);
    zero = P.findIndex(elem => elem == 0);
    // console.log(zero);
    let num = P.findIndex(elem => elem == i);
    console.log("Found in position " + num);
    if (num != i-1) {
        console.log("Swapping " + i + " and blank");
        [P[num], P[zero]] = [P[zero], P[num]];
        console.log(P);
        swaps++;
        console.log(swaps);
        //console.log(P[zero]);
        // num = P.findIndex(elem => elem == i - 1);
        zero = P.findIndex(elem => elem == 0);
        // console.log("Blank is now in the " + zero + " position");
        console.log("Swapping blank with the misplaced number");
        [P[i-1], P[zero]] = [P[zero], P[i-1]];
        console.log(P);
        swaps++;
        console.log(swaps);
        console.log("Putting " + i + " where it belongs");
        zero = P.findIndex(elem => elem == 0);
        [P[8], P[zero]] = [P[zero], P[8]];

        console.log(P);
        swaps++;
        console.log(swaps);


    }

}



console.log("Total swaps " + swaps);


/*
    zero = P.findIndex(elem => elem == 0);
    console.log(zero);
    console.log(num);
    if (zero != num && zero != 8) {
        swaps++;
        }
    }

[2,1,6,0,3,4,7,5,8];
2, 1, 3, 4, 5, 6, 7, 8, 0

2, 1, 6, 8, 3, 4, 7, 5, 0

2, 0, 6, 8, 3, 4, 7, 5, 1


*/