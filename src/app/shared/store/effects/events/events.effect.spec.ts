import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { EffectsModule } from '@ngrx/effects';
import { EventsEffect } from './events.effect';
import { Actions } from '@ngrx/effects';
import { EventsService } from '../../../services/events/events.service';
import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { Event } from '../../../models/event/event.model';
import { NotificationsService } from '../../../services/notifications/notifications.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { EventsAction, EventsActionError, EventsActionSuccess } from '../../actions/events.action';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientModule } from '@angular/common/http';
import { Action } from '@ngrx/store';

describe('EventsEffect', () => {
  let spectator: SpectatorService<EventsEffect>;
  let effects: EventsEffect;
  let actions$: Observable<Action>;
  let eventsService: EventsService;
  let notificationsService: NotificationsService;

  const createService = createServiceFactory({
    service: EventsEffect,
    imports: [HttpClientModule],
    providers: [
        EventsEffect,
        provideMockActions(() => actions$),
        {
            provide: NotificationsService,
            useValue: {
                showSuccess: () => {},
                showError: () => {}
            }
        }
    ],
  });

  beforeEach(() => {
    spectator = createService();
    effects = spectator.inject(EventsEffect);
    actions$ = spectator.inject(Actions);
    eventsService = spectator.inject(EventsService);
    notificationsService = spectator.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('createEvent$', () => {

    beforeEach(() => {
        actions$ = of(EventsAction.createEvent({event: {id: '1', consents: []}, userId: '123'}))
    })

    it('should dispatch EventsActionSuccess.createEventSuccess and show success notification on successful event creation', () => {
        const event: Event = {
            id: '1',
            consents: [],
        }
      const successNotificationSpy = spyOn(notificationsService, 'showSuccess');
      const createEventSpy = spyOn(eventsService, 'createEvent').and.returnValue(of(event));

      effects.createEvent$.subscribe((result) => {
        expect(result).toEqual(EventsActionSuccess.createEventSuccess({ event }));
        expect(successNotificationSpy).toHaveBeenCalledWith('Evenement créé avec succès !');
        expect(createEventSpy).toHaveBeenCalledWith(event, '123');
      });

    });

    it('should dispatch EventsActionError.createEventError and show error notification on event creation error', () => {
        
      const event: Event = {
        id: '1',
        consents: [],
      };
      const action = EventsAction.createEvent({ event, userId: '123' });
      const errorNotificationSpy = spyOn(notificationsService, 'showError');
      const createEventSpy = spyOn(eventsService, 'createEvent').and.returnValue(throwError(() => new Error()))


      effects.createEvent$.subscribe((result) => {
        expect(result.type).toEqual(EventsActionError.createEventError.type);
        expect(errorNotificationSpy).toHaveBeenCalledWith("Une erreur est survenue lors de la création de l'évènement");
        expect(createEventSpy).toHaveBeenCalledWith(event, action.userId);
      });

    });
  });

  describe('getHistoryEventsFromUser$', () => {

    beforeEach(() => {
        actions$ = of(EventsAction.getHistoryEventsFromUser({id: '123'}))
    })

    it('should dispatch EventsActionSuccess.getHistoryEventsFromUserSuccess on successful retrieval of history events', () => {
      const action = EventsAction.getHistoryEventsFromUser({ id: '123' });
      const events: Event[] = [{ id: '1', consents: [] }, { id: '2', consents: [] }];
      const getHistoryEventsFromUserSpy = spyOn(eventsService, 'getHistoryEventsFromUser').and.returnValue(of(events));

      effects.getHistoryEventsFromUser$.subscribe((result) => {
        expect(result).toEqual(EventsActionSuccess.getHistoryEventsFromUserSuccess({ events }));
        expect(getHistoryEventsFromUserSpy).toHaveBeenCalledWith(123);
      });
    });

    it('should dispatch EventsActionError.getHistoryEventsFromUserError on error during retrieval of history events', () => {
      const action = EventsAction.getHistoryEventsFromUser({ id: '123' });
      const getHistoryEventsFromUserSpy = spyOn(eventsService, 'getHistoryEventsFromUser').and.returnValue(throwError(() => new Error()));

      effects.getHistoryEventsFromUser$.subscribe((result) => {
        expect(result.type).toEqual(EventsActionError.getHistoryEventsFromUserError.type);
        expect(getHistoryEventsFromUserSpy).toHaveBeenCalledWith(123);
      });
    });
  });
});
