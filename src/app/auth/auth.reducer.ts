import { Action, createReducer, on } from '@ngrx/store';
import * as auth from './auth.actions'
import { Usuario } from '../models/User';

export interface State {
    user: Usuario | null; 
}

export const initialState: State = {
   user:null,
}

const _authReducer = createReducer(initialState,

    on(auth.setUser, (state,{user}) =>  ({ ...state, user:{...user}})),
    on(auth.unSetUser, state =>  ({ ...state, user:null})),

);

export function authReducer(state: State | undefined, action: Action) {
    return _authReducer(state, action);
}