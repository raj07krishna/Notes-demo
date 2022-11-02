import { ICard, ICurrentCard } from '../components/card/card.model';
import { IToast } from '../components/toast/toast.model';


export interface INotesState {
  allCards?: ICard[],
  toastInfo?: IToast,
  currentCardData?:ICurrentCard
  lastChangeCardData?:ICurrentCard
}
export const initialState: INotesState = {
  allCards: [
    {
      data: 'kdsfjhksjdfh',
      'background-color': '#6666d3',
      date: '2022-11-01T14:47:04.204Z',
      colorAsId: 'blue',
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
    {
      data: 'kdsfjhksjdfh',
      'background-color': '#6666d3',
      date: '2022-11-01T14:47:04.204Z',
      colorAsId: 'blue',
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
  ],
  toastInfo: {} as IToast
}
