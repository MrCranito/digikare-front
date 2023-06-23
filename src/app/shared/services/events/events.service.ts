import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "@env/environment";
import { Event } from "../../models/event/event.model";

@Injectable({
    providedIn: 'root'
})

export class EventsService {
    constructor(private http: HttpClient) {}

    createEvent(event: Event, userId: string | null): Observable<Event> {
        const eventWithUser = {
            ...event,
            user: {
                id: userId
            }
        }
        return this.http.post<Event>(
            `${environment.API_URL}/events`, eventWithUser);
    }

    getHistoryEventsFromUser(id: number): Observable<Event[]> {
        return this.http.get<Event[]>(
            `${environment.API_URL}/events/${id}`);
    }
}