import { switchMap, mergeMap, fromEvent, Observable } from 'rxjs';

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
            let data = JSON.parse(xhr.responseText);
            subscriber.next(data)
            subscriber.complete();
        });

        xhr.open('GET', url);
        xhr.send();
    })
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
