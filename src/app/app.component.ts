import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-rating-editor';
  movies: Object[];

  onMovies(movies: Object[]) {
    this.movies = movies;
  }

}
