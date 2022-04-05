import { SET_IS_VISIBLE, SET_IS_EDIT, SET_INPUT_MODEL } from './index';

export const SetIsVisibleAction = (payload) => ({ type: SET_IS_VISIBLE, payload })
export const SetIsEditAction = (payload) => ({ type: SET_IS_EDIT, payload })
export const SetInputModelAction = (payload) => ({ type: SET_INPUT_MODEL, payload })