import { createReducer, on } from "@ngrx/store";
import { Event } from "../../models/event/event.model";
import { EventsAction, EventsActionSuccess } from "../actions/events.action";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export const eventsFeatureKey = 'events';

export interface EventsState extends EntityState<Event> {
    isLoading: boolean
}

export const adapter: EntityAdapter<Event> = createEntityAdapter<Event>()

export const eventsInitialState: EventsState = adapter.getInitialState({
    isLoading: false
})


export const eventsReducer = createReducer(
    eventsInitialState,
    on(EventsAction.createEvent, (state) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(EventsActionSuccess.createEventSuccess, (state, action) => adapter.addOne(action.event, {...state, isLoading: false})),
    on(EventsActionSuccess.getHistoryEventsFromUserSuccess, (state, action) => adapter.addMany(action.events, {...state, isLoading: false})),
)