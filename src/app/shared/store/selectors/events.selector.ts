import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromEvents from '../reducers/events.reducer';

export const selectEventsState = createFeatureSelector<fromEvents.EventsState>(
    fromEvents.eventsFeatureKey
)

export const selectEventIsLoading = createSelector(
    selectEventsState,
    (state: fromEvents.EventsState) => state?.isLoading
)