import { mergeMap, fromEvent, Observable } from 'rxjs';
import { retry, retryWhen, scan, delay, takeWhile } from 'rxjs/operators';

interface IMovie {
    title: string;
}

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = fromEvent(button, 'click');

function load(url: string): Observable<any> {
    return new Observable(subscriber => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                subscriber.next(data);
                subscriber.complete();
            } else {
                subscriber.error(xhr.statusText);
            }
        });

        xhr.open('GET', url);
        xhr.send();
    }).pipe(
        retryWhen(retryStrategy({attempts: 4, timeDelay: 1000}))
    )
}

function retryStrategy({attempts = 4, timeDelay = 1000}) {
    return (errors: Observable<any>) => {
        return errors.pipe(
            scan((acc, value) => {
                console.log(acc, value);
                return acc + 1;
            }),
            takeWhile(acc => acc < attempts),
            delay(timeDelay)
        )
    }
}

function renderMovies(movies: IMovie[]) {
    movies.forEach((movie: IMovie) => {
        let div = document.createElement('div');
        div.innerText = movie.title;
        output.appendChild(div);
    });
}

click.pipe(
    mergeMap(e => load('../movies.json'))
    //switchMap(e => load('../movies.json'))
).subscribe({
     next: renderMovies,
     error: (e: Error) => console.log(`error: ${e}`),
     complete: () => console.log('Completed'),
});
