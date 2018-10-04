const squared = function(x) {
    arguments.length = 1;
    console.log(arguments[1]);
    for (const param of arguments) {
        console.log(param);
    }
}
let y = squared(3, 5, 10);
console.log(y);
