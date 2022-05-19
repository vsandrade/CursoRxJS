import {Observable, Observer } from "rxjs";

/// MUITO IMPORTANTE ///
/// Um observer está para um subscrive da mesma forma 
/// que um subscriber está para um observable.

let numbers = [1,5,10];

/// Aqui você está criando um novo observable dizendo, por meio do subscriver, 
/// o que será executado no callback de um observer quando um subscribe do objeto deste
/// observable for chamado.
let source = new Observable(subscriber => {
    for (let n of numbers) {
        if (n === 5) {
            subscriber.error('Something went wrong!');
        }
        subscriber.next(n)
    }
    subscriber.complete()
})

/// Aqui você está implementando o comportamento da Interface Observer, que é um callback
/// do subscribe a partir do momento que é passado para esse mesmo subscribe como parâmetro.
/// Quando o subscribe é executado, ele executará o Observable que chamará por callback o Observer.
source.subscribe({
    next: (value: Object) => console.log(value),
    error: (e: Error) => console.log(`error: ${e}`),
    complete: () => console.log('Completed'),
});