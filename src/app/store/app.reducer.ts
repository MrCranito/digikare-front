import { Action, ActionReducerMap, MetaReducer, combineReducers } from "@ngrx/store";
import { EventsState, eventsFeatureKey, eventsReducer, eventsInitialState } from "../shared/store/reducers/events.reducer";
import { UsersState, usersFeatureKey, usersReducer, usersInitialState } from "../shared/store/reducers/users.reducer";

export interface AppState {
   [usersFeatureKey]: UsersState,
    [eventsFeatureKey]: EventsState
}

export const initialState: AppState = {
    [usersFeatureKey]: usersInitialState,
    [eventsFeatureKey]: eventsInitialState
}

export function reducers(state: AppState | undefined, action: Action) {
    combineReducers({
        [usersFeatureKey]: usersReducer,
        [eventsFeatureKey]: eventsReducer
    })(state, action)
}
