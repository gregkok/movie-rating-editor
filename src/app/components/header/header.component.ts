import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpClientService } from 'src/app/Services/httpClient.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnDestroy {
    @Output()
    movies = new EventEmitter<any>();

    private destroy$: Subject<void> = new Subject<void>()

    moviesArray: Object[];
    isDisabled: boolean;
    error;

    constructor(private httpClientService: HttpClientService) { }

    ngOnDestroy() {
        this.destroy$.next();
    }

    showAllMovies() {
        this.isDisabled = true;
        this.httpClientService.getAllMovies().pipe(takeUntil(this.destroy$)).subscribe((response: Object[]) => {
            this.moviesArray = response;
            this.movies.emit(this.moviesArray);
            this.isDisabled = false;
        }, error => {
            console.log(error);
            this.error = error;
        });

    }
}
