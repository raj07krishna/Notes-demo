import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICard } from '../card/card.model';
import { ToastComponent } from '../toast/toast.component';
import { debounceTime, distinctUntilChanged, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IToast } from '../toast/toast.model';
import {
  updateCurrentNote,
  updateNote,
  showToast,
  deleteNote,
} from '../../state/notes.actions';
import { getNotes } from '../../state/notes.selectors';
import { INotesState } from '../../state/notes.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
  noteData: FormControl = new FormControl('');
  cardData: ICard;
  index: number;
  subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {card:ICard, index: number},
    private _snackBar: MatSnackBar,
    private store: Store<{ notesReducer: INotesState }>
  ) {
    if (data) {
      this.index = data.index;
      this.cardData = data.card;
      this.noteData.patchValue(this.cardData.data, {
        emitEvent: false,
        onlySelf: true,
      });
    }
  }

  ngOnInit(): void {
    console.log(this.index);
    this.subscriptions.push(
      this.noteData.valueChanges
        .pipe(debounceTime(100), distinctUntilChanged())
        .subscribe((data) => {
          this.cardData.data = data;
        })
    );
  }

  getvalue(val: string, color: string, colorAsId: string) {
    if (val) {
      let card: ICard = {
        data: val,
        'background-color': color,
        date: new Date(),
        colorAsId,
        id: this.cardData.id
      };
      this.cardData = { ...card };
      this.store.dispatch(updateCurrentNote({ currentNote: card }));
      this.openSnackBar();
      let toastInfo: IToast = {
        message: 'Note Updated',
        showUndo: true,
        action: 'update',
      };
      this.store.dispatch(updateNote({ id: this.cardData.id }));
      this.store.dispatch(showToast({ toastData: toastInfo }));
    } else {
      this.openSnackBar();
      let toastInfo: IToast = {
        message: 'Please enter text',
        showUndo: false,
        action: 'dismiss',
      };
      this.store.dispatch(showToast({ toastData: toastInfo }));
    }
    this.dialogRef.close();
  }
  openSnackBar() {
    this._snackBar.openFromComponent(ToastComponent, {
      duration: 3 * 1000,
    });
  }

  onDelete() {
    this.store.dispatch(deleteNote({ id: this.cardData.id }));
    // this.cards.splice(index, 1);
    this.openSnackBar();
    let toastInfo: IToast = {
      message: 'Note Deleted',
      showUndo: true,
      action: 'add',
    };
    this.store.dispatch(showToast({ toastData: toastInfo }));
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }
}
