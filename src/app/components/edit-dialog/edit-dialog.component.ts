import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ICard } from '../card/card.model';
import { ToastComponent } from '../toast/toast.component';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
  noteData: FormControl = new FormControl('');
  cardData: ICard;
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICard,
    private _snackBar: MatSnackBar,
  ) {
    this.noteData.patchValue(data.data);
    this.cardData = data;
  }

  ngOnInit(): void {
    this.noteData.valueChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe(data => {
      this.cardData.data = data
    })
  }

  getvalue(val: string, color: string, colorAsId:string) {
    if (val) {
      let card: ICard = {
        data: val,
        'background-color': color,
        date: new Date(),
        colorAsId,
      };
      this.cardData = { ...card };
      this.openSnackBar({
        message: 'Note Updated',
        showUndo: true,
      });
    } else {
      this.openSnackBar({
        message: 'Please enter text',
        showUndo: false,
      });
    }
    this.dialogRef.close({
      data: this.cardData,
      action: ''
    })
  }
  openSnackBar(data) {
    this._snackBar.openFromComponent(ToastComponent, {
      duration: 3 * 1000,
      data: {
        message: data.message,
        showUndo: data.showUndo,
      },
    });
  }

  onDelete() {
    this.dialogRef.close({
      data: this.cardData,
      action: 'delete'
    });
  }
}
