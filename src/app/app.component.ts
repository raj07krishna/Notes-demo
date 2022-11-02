import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ICard } from './components/card/card.model';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { ToastComponent } from './components/toast/toast.component';
import { IToast } from './components/toast/toast.model';
import {
  addNote,
  showToast,
  updateLastChangeNote,
} from './state/notes.actions';
import { getCurrentNote, getNotes } from './state/notes.selectors';
import { INotesState } from './state/notes.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, AfterViewInit {
  durationInSeconds = 3;
  currentCardData: ICard;
  filteredCards: ICard[] = [];
  backupCards: ICard[] = [];
  showColorBUttons = false;
  className = '';
  filterValue = 'all';
  currentCardIndex: number = 0;
  subscriptions: Subscription[] = [];
  @ViewChild('drawer') public sidenav: MatSidenav;
  @ViewChild('cardWrapper') public cardWrapper: ElementRef;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private store: Store<{ notesReducer: INotesState }>
  ) {}

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.store.select(getNotes).subscribe((data) => {
        console.log(data);
        this.filteredCards = [...data];
        this.backupCards = [...data];
        this.filterCard(this.filterValue);
      })
    );
    this.subscriptions.push(
      this.store.select(getCurrentNote).subscribe((data: ICard) => {
        if (data) {
          this.currentCardData = { ...data };
          let index = this.filteredCards.findIndex(
            (element) => element.id === data.id
          );

          this.currentCardIndex = index;
        }
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
        id: this.filteredCards.length
      };
      this.store.dispatch(addNote({ note: card }));
      this.store.dispatch(
        updateLastChangeNote({
          lastChangeNote: {
            card,
            index: this.filteredCards.length - 1
          },
        })
      );
      this.openSnackBar();
      let toastInfo: IToast = {
        message: 'Note Added',
        showUndo: true,
        action: 'delete',
      };
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
    this.showColorBUttons = false;
  }

  openSnackBar() {
    this._snackBar.openFromComponent(ToastComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  openDialog(selectedCard: ICard): void {
    let index = this.filteredCards.findIndex(
      (element) => element.id === selectedCard.id
    );
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: {
        card: selectedCard,
        index,
      },
    });

    this.currentCardIndex = index;
    this.store.dispatch(
      updateLastChangeNote({
        lastChangeNote: {
          card: selectedCard,
          index,
        },
      })
    );
  }

  filterCard(value: string) {
    this.filterValue = value;
    this.filteredCards = [...this.backupCards];
    if (value === 'all') {
      this.filteredCards = this.filteredCards.slice();
      this.className = '';
    } else {
      this.filteredCards = this.filteredCards.filter(
        (card) => card.colorAsId === value
      );
      this.className = value;
    }
    if (this.sidenav.opened) {
      this.sidenav.close();
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }
}
