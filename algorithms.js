function* geeksforGeeks() {

  /*expression paused here and return
  value is undefined as nothing is declared*/
    yield;

    //wait for next() to finish
    gfg(yield "Welcome to GFG");
}

function gfg(x) {
    console.log("Hello World ", x)
}

var generator = geeksforGeeks();

//return undefined
console.log(generator.next());

//return Welcome to GFG
console.log(generator.next());