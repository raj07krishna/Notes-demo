import { on } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import { InitialState } from '@ngrx/store/src/models';
import { ICard, ICurrentCard } from '../components/card/card.model';
import { IToast } from '../components/toast/toast.model';
import {
  addNote,
  deleteNote,
  showToast,
  addDeletedNode,
  updateCurrentNote,
  updateNote,
  deleteAddedNote,
  undoUpdatedNote,
  updateLastChangeNote,
} from './notes.actions';
import { initialState, INotesState } from './notes.state';

const _notesReducer = createReducer(
  initialState,
  on(addNote, (state: INotesState, action: { note: ICard }) => {
    let newNote = [{ ...action.note }];
    return {
      ...state,
      allCards: [...state.allCards, ...newNote],
    };
  }),
  on(deleteNote, (state: INotesState, action: { index: number }) => {
    let allCards = [...state.allCards];
    allCards.splice(action.index, 1);
    return {
      ...state,
      allCards,
    };
  }),
  on(updateCurrentNote, (state: INotesState, action: { currentNote: ICurrentCard }) => {
    return {
      ...state,
      currentCardData: { ...action.currentNote },
    };
  }),
  on(updateLastChangeNote, (state: INotesState, action: { lastChangeNote: ICurrentCard }) => {
    return {
      ...state,
      lastChangeCardData: { ...action.lastChangeNote },
    };
  }),
  on(updateNote, (state: INotesState, action: { index: number }) => {
    let allCards = [...state.allCards];
    allCards[state.currentCardData.index] = state.currentCardData.currentCard;
    return {
      ...state,
      allCards,
    };
  }),
  on(showToast, (state: INotesState, action: { toastData: IToast }) => {
    let toastInfo = { ...action.toastData };
    return {
      ...state,
      toastInfo: { ...toastInfo },
    };
  }),
  on(addDeletedNode,(state:INotesState) => {
    let allCards = [...state.allCards];
    allCards.splice(state.lastChangeCardData.index, 0, state.lastChangeCardData.currentCard)
    return {
      ...state,
      allCards,
    };
  }),
  on(undoUpdatedNote,(state:INotesState) => {
    let allCards = [...state.allCards];
    allCards[state.lastChangeCardData.index] = state.lastChangeCardData.currentCard;
    return {
      ...state,
      allCards,
    };
  }),
  on(deleteAddedNote,(state:INotesState) => {
    let allCards = [...state.allCards];
    allCards.splice(state.lastChangeCardData.index, 1)
    return {
      ...state,
      allCards,
    };
  })
);

export function notesReducer(state, action) {
  return _notesReducer(state, action);
}
