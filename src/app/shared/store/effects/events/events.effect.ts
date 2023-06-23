import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EventsService } from "../../../services/events/events.service";
import { EventsAction, EventsActionError, EventsActionSuccess } from "../../actions/events.action";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Event } from "../../../models/event/event.model";
import { NotificationsService } from "../../../services/notifications/notifications.service";

@Injectable()
export class EventsEffect {
    constructor(private actions$: Actions, private notificationsService: NotificationsService, private eventsService: EventsService) {}

    createEvent$ = createEffect( () => 
        this.actions$.pipe(
            ofType(EventsAction.createEvent),
            exhaustMap((action) => {
                return this.eventsService.createEvent(action.event, action!.userId).pipe(
                    map((event: Event) => {
                        this.notificationsService.showSuccess('Evenement créé avec succès !')
                        return  EventsActionSuccess.createEventSuccess({ event });
                    }),
                    catchError((error: Error) => {
                        this.notificationsService.showError("Une erreur est survenue lors de la création de l'évènement")
                        return of(EventsActionError.createEventError({ error }));
                    })
                )
            })
        )
    )

    getHistoryEventsFromUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(EventsAction.getHistoryEventsFromUser),
            exhaustMap((action) => {
                return this.eventsService.getHistoryEventsFromUser(Number.parseInt(action.id, 10)).pipe(
                    map((events: Event[]) => {
                        return EventsActionSuccess.getHistoryEventsFromUserSuccess({ events });
                    }),
                    catchError((error: Error) => {
                        return of(EventsActionError.getHistoryEventsFromUserError({ error }));
                    })
                )
            })
        )
    )
}
