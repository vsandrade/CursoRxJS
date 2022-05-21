import { Observable, map, filter } from 'rxjs'

let numbers = [1,5,10];
let source = new Observable(subscriber => {

    let index = 0;
    let produceValue = () => {
        subscriber.next(numbers[index++]);

        if (index < numbers.length) {
            setTimeout(produceValue, 250);
        } else {
            subscriber.complete();
        }
    }

    produceValue();
}).pipe(
    map((n: number) => n * 2),
    filter((n: number) => n > 4)
)

source.subscribe({
    next: (value: Object) => console.log(value),
    error: (e: Error) => console.log(`error: ${e}`),
    complete: () => console.log('Completed'),
});