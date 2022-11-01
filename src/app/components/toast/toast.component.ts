import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  message: string;
  showUndo: boolean;
  action: string
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
  public snackBarRef: MatSnackBarRef<ToastComponent>,
  ) {
    this.message = data.message;
    this.showUndo = data.showUndo;
    this.action = data.action ? data.action : 'undo'
  }

  ngOnInit(): void {}

  onDismiss() {
    this.snackBarRef.dismiss();
  }

  onUndo() {
    this.snackBarRef.dismiss();
  }
}
