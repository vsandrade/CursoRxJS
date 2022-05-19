import { from } from "rxjs";

let numbers = [1,5,10];
let source = from(numbers);

class MyObserver {
    next(value: Object) {
        console.log(value)
    }
    error(e: Error) {
        console.log(`error: ${e}`)
    }
    complete() {
        console.log('Completed');
    }
}

source.subscribe(new MyObserver());