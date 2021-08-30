import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData, ratingRange } from 'src/app/appCostants';
import { EditRatingDialog } from '../editRatingDialog/editRatingDialog.component';

const px400 = "400px";
const cancelEdit = "cancelEdit";

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html'
})

export class MovieGridComponent implements OnInit, OnChanges {
  @Input()
  movies = [];

  showEditSubmit = false;
  showRatingSelect = false;
  ratingRange = ratingRange;
  selected: string;
  isEmpty: boolean;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.movies = [];
    this.isEmpty = false;
  }

  ngOnChanges() {
    if (this.movies.length === 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }

  onEditRating(movie: DialogData) {
    const dialogRef = this.dialog.open(EditRatingDialog, {
      width: px400,
      data: {
        id: movie.id,
        name: movie.name,
        year: movie.year,
        genre: movie.genre,
        rating: movie.rating
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {

      this.movies = result === cancelEdit ? this.movies : result;
    });
  }
};