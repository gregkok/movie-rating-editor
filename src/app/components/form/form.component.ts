import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ratingRange } from 'src/app/appCostants';
import { HttpClientService } from 'src/app/Services/httpClient.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnDestroy {
  @Output()
  movies = new EventEmitter<any>();
  @Output()
  error = new EventEmitter<any>();

  private destroy$: Subject<void> = new Subject<void>()

  selected: string;
  ratingRange = ratingRange;
  isDisabled: boolean;

  constructor(private httpClientService: HttpClientService) { }

  ngOnDestroy() {
    this.destroy$.next();
}

  onSubmitSearch(form: NgForm) {
    const formQuery: string = form.value.userSearchQuery;
    const selectedRating = this.selected;
    this.resetForm(form);
    this.isDisabled = true;
    this.httpClientService.getQuery(formQuery, selectedRating).pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.movies.emit(response);
      this.isDisabled = false;
    }, error => {
      this.isDisabled = false;
      console.log("error", error);
  })
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.selected = ""
  }
}