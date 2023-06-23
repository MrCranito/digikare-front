import { createActionGroup, props } from "@ngrx/store";
import { Event } from "../../models/event/event.model";

export const EventsAction = createActionGroup({
    source: 'Events',
    events: {
        'Create Event': props<{ event: Event, userId: string | null }>(),
        'Get History Events From User': props<{ id: string }>(),
    }
})

export const EventsActionSuccess = createActionGroup({
    source: 'Events Success',
    events: {
        'Create Event Success': props<{ event: Event }>(),
        'Get History Events From User Success': props<{ events: Event[] }>(),
    }
})

export const EventsActionError = createActionGroup({
    source: 'Events Error',
    events: {
        'Create Event Error': props<{ error: Error }>(),
        'Get History Events From User Error': props<{ error: Error }>(),
    }
})