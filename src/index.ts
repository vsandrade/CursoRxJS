import { fromEvent } from 'rxjs';
import { delay, map, filter } from 'rxjs/operators';

interface IMovie {
    title: string;
}

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = fromEvent(button, 'click');

function load(url: string) {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        let movies = JSON.parse(xhr.responseText);
        movies.forEach((movie: IMovie) => {
            let div = document.createElement("div");
            div.innerText = movie.title;
            output.appendChild(div);
        });
    })

    xhr.open('GET', url);
    xhr.send();
}

click.subscribe({
    next: () => load('../movies.json'),
    error: (e: Error) => console.log(`error: ${e}`),
    complete: () => console.log('Completed'),
});
