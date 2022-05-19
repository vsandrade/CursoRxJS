import {Observable, Observer } from "rxjs";

let numbers = [1,5,10];
let source = new Observable(subscriber => {

    let index = 0;
    let produceValue = () => {
        subscriber.next(numbers[index++]);

        if (index < numbers.length) {
            setTimeout(produceValue, 2000);
        } else {
            subscriber.complete();
        }
    }

    produceValue();
});

source.subscribe({
    next: (value: Object) => console.log(value),
    error: (e: Error) => console.log(`error: ${e}`),
    complete: () => console.log('Completed'),
});