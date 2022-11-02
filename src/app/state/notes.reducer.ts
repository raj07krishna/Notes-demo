import { on } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import { InitialState } from '@ngrx/store/src/models';
import { ICard, ILastChangeCard } from '../components/card/card.model';
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
    let id = state.allCards.length - 1;
    newNote[0].id = id;
    return {
      ...state,
      allCards: [...state.allCards, ...newNote],
    };
  }),
  on(deleteNote, (state: INotesState, action: { id: number }) => {
    let allCards = [...state.allCards];
    let index = allCards.findIndex((element) => element.id === action.id);
    allCards.splice(index, 1);
    console.log(index);
    return {
      ...state,
      allCards,
    };
  }),
  on(
    updateCurrentNote,
    (state: INotesState, action: { currentNote: ICard }) => {
      return {
        ...state,
        currentCardData: { ...action.currentNote },
      };
    }
  ),
  on(
    updateLastChangeNote,
    (state: any, action: { lastChangeNote: ILastChangeCard }) => {
      return {
        ...state,
        lastChangeCardData: { ...action.lastChangeNote },
      };
    }
  ),
  on(updateNote, (state: INotesState, action: { id: number }) => {
    let allCards = [...state.allCards];
    let index = allCards.findIndex((element) => element.id === action.id);
    allCards[index] = state.currentCardData;
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
  on(addDeletedNode, (state: INotesState) => {
    let allCards = [...state.allCards];
    allCards.splice(state.lastChangeCardData.index, 0, state.lastChangeCardData.card);
    return {
      ...state,
      allCards,
    };
  }),
  on(undoUpdatedNote, (state: INotesState) => {
    let allCards = [...state.allCards];
    let index = allCards.findIndex(
      (element) => element.id === state.lastChangeCardData.index
    );
    allCards[index] = state.lastChangeCardData.card;
    return {
      ...state,
      allCards,
    };
  }),
  on(deleteAddedNote, (state: INotesState) => {
    let allCards = [...state.allCards];
    allCards.splice(state.lastChangeCardData.index, 1);
    return {
      ...state,
      allCards,
    };
  })
);

export function notesReducer(state, action) {
  return _notesReducer(state, action);
}
