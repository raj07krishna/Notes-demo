import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { INotesState } from './notes.state';

const getNotesState = createFeatureSelector<INotesState>('notesReducer');

export const getNotes = createSelector(getNotesState, (state) => {
  return state.allCards;
});

export const getToastInfo = createSelector(getNotesState, (state) => {
  return state.toastInfo;
});

export const getCurrentNote = createSelector(getNotesState, (state) => {
  return state.currentCardData;
});
