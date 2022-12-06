import { ActionReducerMap } from '@ngrx/store'
import * as reducers from './reducers'

export interface AppState{
    tableros: reducers.TablerosState;
    tareas: reducers.TareasState;
}

export const AppReducers: ActionReducerMap<AppState> = {
    tableros: reducers.tableroReducer,
    tareas: reducers.tareaReducer
}
