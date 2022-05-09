let swaps = 1
let P = [2,0,6,1,3,4,7,5,8];
let zero = P.findIndex(elem => elem == 0);
P[zero] = 9;
console.log(P);

for (let i = 0; i <= 8; i++) {
        if (P[i] != i + 1) {
            let nine = P.findIndex(elem => elem == 9);
            if (i != nine) {
                swaps++;
                console.log(swaps);
                [P[i], P[nine]] = [P[nine], P[i]];
                console.log(P);

            }
            let num = P.findIndex(elem => elem == i+1);
            if (i != num) {
                swaps++;
                console.log(swaps);
                [P[i], P[num]] = [P[num], P[i]];
                console.log(P);

            }
        }
}
