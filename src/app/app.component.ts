import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardComponent } from './components/card/card.component';
import { ICard } from './components/card/card.model';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { ToastComponent } from './components/toast/toast.component';
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  cards: ICard[] = [
    {
      data: 'kdsfjhksjdfh',
      'background-color': '#6666d3',
      date: '2022-11-01T14:47:04.204Z',
      colorAsId: 'all',
    },
    {
      data: 'You may achieve that using a custom snackBar component. On your custom component template include your message and buttons for the actions',
      'background-color': '#ce5757',
      date: '2022-11-01T14:48:48.211Z',
      colorAsId: 'red',
    },
    {
      data: 'Formats a date value according to locale rules.',
      'background-color': '#43af43',
      date: '2022-11-01T14:48:59.494Z',
      colorAsId: 'green',
    },
    {
      data: 'Angular Material provides two sets of components designed to add collapsible side content (often navigation, though it can be any content) alongside some primary content. These are the sidenav and drawer components.',
      'background-color': '#a8c24d',
      date: '2022-11-01T14:49:13.231Z',
      colorAsId: 'yellow',
    },
    {
      data: "Notice how in the solution we're spending time on push() and pop() so we can save time on getMax(). That's because we chose to optimize for the time cost of calls to getMax().",
      'background-color': '#76e7c2',
      date: '2022-11-01T14:49:50.308Z',
      colorAsId: 'sky',
    },
    {
      data: ' creating model driven form, i am getting an error: E',
      'background-color': '#6d4196',
      date: '2022-11-01T14:50:08.809Z',
      colorAsId: 'purple',
    },
    {
      data: "9\n\n\nI currently have a snackbar element with a mat-progress-bar inside it. I'd like to close the snackbar element. My code currently looks like this.",
      'background-color': '#ce5757',
      date: '2022-11-01T14:50:20.827Z',
      colorAsId: 'red',
    },
    {
      data: " formControlName must be used with a parent formGroup directive. You'll want to add a formGroup directive and pass it an existing FormGroup instance (you can create one in your class).",
      'background-color': '#43af43',
      date: '2022-11-01T14:50:33.146Z',
      colorAsId: 'green',
    },
  ];
  durationInSeconds = 3;
  currentCardData: ICard;
  filteredCards: ICard[] = [];
  showColorBUttons = false
  @ViewChild('drawer') public sidenav: MatSidenav;
  @ViewChild('card') public card: CardComponent;


  constructor(
    private _snackBar: MatSnackBar,
    private snack: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.filterCard('all');
  }

  ngOnInit(): void {
    this.snack.dataFromSnackbar.subscribe((data) => {
      switch (data) {
        case 'undo':
          this.cards.pop();
          this.filteredCards.pop();
          break;
        case 'redo':
          this.cards.push(this.currentCardData);
          this.filteredCards.push(this.currentCardData);
          break;

        default:
          break;
      }
    });
  }

  getvalue(val: string, color: string, colorAsId: string) {
    if (val) {
      let card: ICard = {
        data: val,
        'background-color': color,
        date: new Date(),
        colorAsId,
      };
      this.cards.push(card);
      this.filteredCards.push(card);
      this.openSnackBar({
        message: 'Note Added',
        showUndo: true,
      });
    } else {
      this.openSnackBar({
        message: 'Please enter text',
        showUndo: false,
      });
    }
    console.log(this.cards);
  }

  openSnackBar(data) {
    this._snackBar.openFromComponent(ToastComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        message: data.message,
        showUndo: data.showUndo,
        action: data.action,
      },
    });
  }

  openDialog(index: number): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: this.cards[index],
    });

    dialogRef.afterClosed().subscribe((result) => {
      switch (result.action) {
        case 'delete':
          this.currentCardData = result.data;
          this.cards.splice(index, 1);
          this.filteredCards.splice(index, 1);
          this.openSnackBar({
            message: 'Note Deleted',
            showUndo: true,
            action: 'redo',
          });
          break;

        default:
          this.currentCardData = result.data;
          this.cards[index] = this.currentCardData;
          this.filteredCards[index] = this.currentCardData;
          break;
      }
    });
  }

  filterCard(value: string) {
    if(value === 'all') {
      this.filteredCards = this.cards.slice()
    } else {
      this.filteredCards = []
      this.filteredCards = this.cards.filter((card) => (card.colorAsId === value));
      this.sidenav.close();
    }
   
  }
}
