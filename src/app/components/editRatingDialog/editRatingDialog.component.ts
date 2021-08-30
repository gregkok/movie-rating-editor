import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ratingRange } from 'src/app/appCostants';
import { HttpClientService } from 'src/app/Services/httpClient.service';

@Component({
    selector: 'edit-rating-dialog',
    templateUrl: 'editRatingDialog.component.html',
})
export class EditRatingDialog implements OnDestroy {
    private destroy$: Subject<void> = new Subject<void>()

    selected: string;
    ratingRange = ratingRange;

    constructor(
        public dialogRef: MatDialogRef<EditRatingDialog>,
        @Inject(MAT_DIALOG_DATA) public data,
        private httpClientService: HttpClientService) { }

        ngOnDestroy() {
            this.destroy$.next();
        }

    patchMovie() {
        this.httpClientService.patch(this.data.id, this.selected).pipe(takeUntil(this.destroy$)).subscribe(response => {
            this.httpClientService.get(this.data.id).pipe(takeUntil(this.destroy$)).subscribe(secondResposne => {
                this.dialogRef.close([secondResposne]);
            }, error => {
                console.log(error);
            })
        }, error => {
            console.log(error);
        })
    }

    onEditCancel() {
        this.dialogRef.close("cancelEdit");
    }

}



