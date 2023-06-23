import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { EventsService } from './events.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Event } from '../../models/event/event.model';

describe('EventsService', () => {
  let spectator: SpectatorService<EventsService>;
  let service: EventsService;
  let httpClient: HttpClient;

  const createService = createServiceFactory({
    service: EventsService,
    imports: [HttpClientModule],
    providers: [HttpClient],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    httpClient = spectator.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call createEvent API', () => {
    const event: Event = {
      id: '1',
      consents: [
        { id: 'email_notifications', enabled: true },
        { id: 'sms_notifications', enabled: false },
      ],
    };
    const userId = '123';

    const expectedEventWithUser = {
      ...event,
      user: { id: userId },
    };

    spyOn(httpClient, 'post').and.returnValue(
      new Observable<Event>((subscriber) => {
        subscriber.next(expectedEventWithUser);
        subscriber.complete();
      })
    );

    const apiUrl = `${environment.API_URL}/events`;

    service.createEvent(event, userId).subscribe((result) => {
      expect(httpClient.post).toHaveBeenCalledWith(apiUrl, expectedEventWithUser);
      expect(result).toEqual(expectedEventWithUser);
    });
  });

  it('should call getHistoryEventsFromUser API', () => {
    const userId = 1;
    const apiUrl = `${environment.API_URL}/events/${userId}`;
    const mockEvents: Event[] = [
      {
        id: '1',
        consents: [
          { id: 'email_notifications', enabled: true },
          { id: 'sms_notifications', enabled: false },
        ],
      },
      {
        id: '2',
        consents: [
          { id: 'email_notifications', enabled: false },
          { id: 'sms_notifications', enabled: true },
        ],
      },
    ];

    spyOn(httpClient, 'get').and.returnValue(
      new Observable<Event[]>((subscriber) => {
        subscriber.next(mockEvents);
        subscriber.complete();
      })
    );

    service.getHistoryEventsFromUser(userId).subscribe((result) => {
      expect(httpClient.get).toHaveBeenCalledWith(apiUrl);
      expect(result).toEqual(mockEvents);
    });
  });
});