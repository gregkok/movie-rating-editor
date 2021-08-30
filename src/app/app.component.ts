import { Component, OnChanges } from '@angular/core';
import { errorMessage } from './appCostants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges {
  title = 'movie-rating-editor';
  movies: Object[];

  ngOnChanges(movies) {
    console.log("movies on app.ts", this.movies);
  }

  onMovies(movies: Object[]) {
    this.movies = movies;
  }

}
