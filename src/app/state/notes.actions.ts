import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';
import { ICard, ICurrentCard } from '../components/card/card.model';
import { IToast } from '../components/toast/toast.model';

export const ADD_NOTE_ACTION = 'add note'
export const DELETE_NOTE_ACTION = 'delete note'
export const UPDATE_NOTE_ACTION = 'update note'
export const UPDATE_CURRENT_CARD = 'update current card data'
export const UPDATE_LAST_CHANGE_CARD = 'update last change data'
export const SHOW_TOAST_ACTION = 'show toast'
export const ADD_DELETED_NOTE = 'add deleted note'
export const DELETE_ADDED_NOTE = 'delete added note'
export const UNDO_UPDATED_NOTE = 'indo updated note'

export const addNote = createAction(ADD_NOTE_ACTION, props<{note: ICard}>());
export const deleteNote = createAction(DELETE_NOTE_ACTION, props<{index:number}>());
export const updateNote = createAction(UPDATE_NOTE_ACTION, props<{index:number}>());
export const updateCurrentNote = createAction(UPDATE_CURRENT_CARD, props<{currentNote: ICurrentCard}>());
export const updateLastChangeNote = createAction(UPDATE_LAST_CHANGE_CARD, props<{lastChangeNote: ICurrentCard}>());
export const showToast = createAction(SHOW_TOAST_ACTION, props <{toastData: IToast}>())
export const addDeletedNode = createAction(ADD_DELETED_NOTE);
export const deleteAddedNote = createAction(DELETE_ADDED_NOTE);
export const undoUpdatedNote = createAction(UNDO_UPDATED_NOTE);

