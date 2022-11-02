import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { deleteAddedNote, addDeletedNode, undoUpdatedNote } from '../../state/notes.actions';
import { getToastInfo } from '../../state/notes.selectors';
import { IToast } from './toast.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  toastData: IToast;
  subscriptions: Subscription[] = []

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<ToastComponent>,
    private store: Store<{ notesReducer: { toastInfo: IToast } }>
  ) {}
  

  ngOnInit(): void {
    this.subscriptions.push(this.store.select(getToastInfo).subscribe((data) => {
      this.toastData = data;
    }));
  }

  onDismiss() {
    this.snackBarRef.dismiss();
  }

  onUndo() {
    if (this.toastData.action === 'delete') {
      this.store.dispatch(deleteAddedNote());
    } else if (this.toastData.action === 'add') {
      this.store.dispatch(addDeletedNode());
    } else if (this.toastData.action === 'update') {
      this.store.dispatch(undoUpdatedNote());
    }
    this.snackBarRef.dismiss();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe())
  }
}
